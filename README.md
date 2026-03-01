<p align="center">
  <h1 align="center">🧠 NeuroFinance.AI</h1>
  <p align="center">
    <strong>Behavioural Impulse Detection Engine</strong>
    <br />
    <i>Hackathon Submission: Problem Statement 2 (Detecting Financial Impulse Behaviour)</i>
    <i>Anirudh R - 22MIA1094</i>
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-Learn" />
</p>



##  The Problem
Young adults often fall into traps of impulsive spending driven by emotional states, cognitive fatigue, and the "illusion of liquidity" (e.g., payday splurging). Traditional banking apps only show *what* was spent. **NeuroFinance.AI** analyzes *how and why* money is being spent in real-time to intervene before the transaction completes.

##  Key Features
* **Live Transaction Simulator:** A sleek, glassmorphism UI to input transaction data.
* **Real-time ML Inference:** A Random Forest model calculates a deterministic "Impulse Risk Score" (0-100) using `predict_proba`.
* **Behavioural Profiling:** Dynamically categorizes users (e.g., *The Midnight Spender*, *The Payday Splurger*) based on engineered context features.
* **Friction & Nudge Interventions:** Triggers high-visibility visual alerts recommending a "10-minute cooling-off period" for high-risk transactions.

---

##  Dataset & Behavioural Simulation Logic
**Dataset Type:** Synthetic Data (Generated via Python/Pandas)

**Why Synthetic?** Real-world, granular behavioural banking datasets (with precise timestamps, categories, and user demographics) are heavily protected by privacy laws. To solve this problem practically, we generated a robust dataset of over 26,000+ records governed by established behavioural economic theories:

1. **Ego Depletion (Late-Night):** Transactions between 11 PM and 4 AM on "Wants" (Gaming, Digital, Food Delivery) are heavily weighted toward being impulsive.
2. **The Payday Illusion:** Spikes in discretionary spending within the first 3 days of the month model temporary lapses in budget discipline.
3. **Serial Swiping (Velocity):** Multiple transactions within a short 2-hour window act as a strong trigger for emotional spending.
4. **Stochastic Noise:** A 10-15% random noise factor was introduced to prevent the ML model from memorizing hardcoded rules, forcing it to learn complex, non-linear relationships.

---

##  Tech Stack & Architecture
### Frontend (`/frontend`)
* **Framework:** React + Vite
* **Styling:** Tailwind CSS (Dark Mode, Glassmorphism)
* **Icons:** Lucide-React
* **Deployment:** Localhost

### Backend (`/backend`)
* **Framework:** Python FastAPI
* **Machine Learning:** Scikit-Learn (Random Forest), Pandas, Joblib
* **Deployment:** Render (Web Service)

---

##  Running Locally

### 1. Start the API (Backend)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
