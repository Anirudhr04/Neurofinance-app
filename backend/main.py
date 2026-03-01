from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
from datetime import datetime, time
import joblib
import os
import pandas as pd

app = FastAPI(title="Financial Impulse Behaviour Detector API")

# Setup CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load mock model if available, else gracefully fallback
MODEL_PATH = "impulse_model.pkl"

class TransactionRequest(BaseModel):
    age: int
    income: float
    timestamp: datetime
    merchant_category: str
    amount: float

@app.post("/predict")
async def predict_impulse_risk(request: TransactionRequest):
    # 1. Feature Engineering
    
    # is_late_night: 11 PM to 4 AM
    tx_time = request.timestamp.time()
    if tx_time >= time(23, 0) or tx_time <= time(4, 0):
        is_late_night = 1
    else:
        is_late_night = 0
        
    # transactions_last_2hrs: Mocking this for the Hackathon MVP
    # In a real app we would query the database for this user's recent transactions
    # Let's use a random integer between 0 and 5, influenced slightly by the amount to make it somewhat interesting
    transactions_last_2hrs = random.randint(0, 3) if request.amount < 50 else random.randint(0, 5)
    
    # days_since_payday: Assuming payday is the 1st of the month
    # Get days since the 1st of the current month
    days_since_payday = request.timestamp.day - 1
    
    engineered_features = {
        "is_late_night": is_late_night,
        "transactions_last_2hrs": transactions_last_2hrs,
        "days_since_payday": days_since_payday
    }
    
    # 2. Model Prediction
    risk_score = None
    try:
        # Load both the model AND the feature list we saved from Colab
        if os.path.exists(MODEL_PATH) and os.path.exists("model_features.pkl"):
            model = joblib.load(MODEL_PATH)
            expected_features = joblib.load("model_features.pkl")
            
            # 1. Build the base dictionary with our engineered features
            input_data = {
                'age': request.age,
                'monthly_income': request.income, 
                'amount': request.amount,
                'is_late_night': is_late_night,
                'transactions_last_2hrs': transactions_last_2hrs,
                'days_since_payday': days_since_payday
            }
            
            # Convert to a Pandas DataFrame
            input_df = pd.DataFrame([input_data])
            
            # 2. Handle the "Merchant Category" (One-Hot Encoding)
            # First, set all category columns to False/0
            for feature in expected_features:
                if feature.startswith('merchant_category_'):
                    input_df[feature] = False
                    
            # Then, set the specific category they selected to True/1
            selected_category_col = f"merchant_category_{request.merchant_category}"
            if selected_category_col in expected_features:
                input_df[selected_category_col] = True
                
            # 3. Ensure columns are in the EXACT SAME ORDER as training data
            input_df = input_df[expected_features]
            
            # 4. GET THE PROBABILITY & RISK SCORE
            # predict_proba returns something like [[0.15, 0.85]]
            # We want the second number [0][1], which is the probability of class 1 (Impulsive)
            probability = model.predict_proba(input_df)[0][1]
            
            # Convert decimal (0.85) to a clean Risk Score (85)
            risk_score = int(probability * 100)
            
        else:
            raise FileNotFoundError(f"Missing .pkl files!")
            
    except Exception as e:
        print(f"Model Error: {e}") # This prints the error in your terminal so you can debug!
        # Fallback if model loading or prediction fails (Mock Score)
        base_score = 20
        if is_late_night: base_score += 30
        if transactions_last_2hrs > 2: base_score += 20
        if request.amount > (request.income * 0.05): base_score += 25
        risk_score = max(0, min(98, base_score))

    # Determine Persona mostly based on engineered features
    persona = "The Cautious Consumer"
    if risk_score > 70:
        if is_late_night:
            persona = "The Midnight Spender"
        elif days_since_payday < 3:
            persona = "The Payday Splurger"
        elif transactions_last_2hrs > 2:
            persona = "The Serial Swiper"
        else:
            persona = "The High-Roller"
    elif risk_score > 40:
        persona = "The Occasional Indulger"

    return {
        "risk_score": round(risk_score, 1),
        "features": engineered_features,
        "persona": persona,
        "metadata": {
            "model_loaded": os.path.exists(MODEL_PATH)
        }
    }

@app.get("/")
def read_root():
    return {"message": "Financial Impulse Behaviour Detector API is running"}
