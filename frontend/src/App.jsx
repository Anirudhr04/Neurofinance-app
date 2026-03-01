import React, { useState } from 'react';
import { Activity, AlertTriangle, ShieldCheck, Clock, Wallet, Zap } from 'lucide-react';

export default function App() {
    const [formData, setFormData] = useState({
        age: 24,
        monthly_income: 60000,
        timestamp: '2026-03-01T02:30',
        merchant_category: 'Gaming/Digital (e.g., Steam, Netflix)',
        amount: 2500
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const categories = [
        'Groceries (e.g., Blinkit, Zepto)',
        'Utilities (e.g., Electricity, Wifi)',
        'Transit (e.g., Uber, Metro)',
        'Healthcare (e.g., Apollo, PharmEasy)',
        'Food Delivery (e.g., Zomato, Swiggy)',
        'Gaming/Digital (e.g., Steam, Netflix)',
        'Fashion (e.g., Myntra, Zara)',
        'Nightlife/Dining'
    ];

    const handleAnalyse = async () => {
        setLoading(true);
        // Simulate API call delay for cool UI effect
        setTimeout(() => {
            // MOCK LOGIC (Replace this fetch with your actual FastAPI endpoint)
            const hour = new Date(formData.timestamp).getHours();
            const isLateNight = hour >= 23 || hour <= 4;
            const isWant = formData.merchant_category.includes('Gaming') || formData.merchant_category.includes('Food') || formData.merchant_category.includes('Nightlife') || formData.merchant_category.includes('Fashion');

            let score = 15;
            if (isLateNight && isWant) score += 60;
            if (formData.amount > formData.monthly_income * 0.05) score += 20;

            score = Math.min(score, 98); // Cap at 98

            let profile = "Balanced Planner";
            if (score > 70 && isLateNight) profile = "The Midnight Spender";
            else if (score > 70) profile = "The High-Roller";
            else if (score > 40) profile = "The Occasional Indulger";

            setResult({
                risk_score: score,
                profile: profile,
                features: {
                    is_late_night: isLateNight ? "Yes" : "No",
                    transactions_last_2hrs: Math.floor(Math.random() * 3), // Backend handles this
                    days_since_payday: 2
                }
            });
            setLoading(false);
        }, 800);
    };

    const getScoreColor = (score) => {
        if (score < 40) return 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]';
        if (score < 70) return 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]';
        return 'text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]';
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans selection:bg-purple-500/30">

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight">
                        NeuroFinance.AI
                    </h1>
                    <p className="text-slate-400 mt-2">Behavioural Impulse Detection Engine</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm flex items-center gap-2">
                    <Activity size={16} className="animate-pulse" /> Live Analysis Active
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Input Form */}
                <div className="lg:col-span-5 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Zap size={20} className="text-blue-400" /> Transaction Simulator
                    </h2>

                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Age</label>
                                <input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Monthly Inc (₹)</label>
                                <input type="number" value={formData.monthly_income} onChange={(e) => setFormData({ ...formData, monthly_income: e.target.value })} className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Target Date & Time</label>
                            <input type="datetime-local" value={formData.timestamp} onChange={(e) => setFormData({ ...formData, timestamp: e.target.value })} className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Merchant Category</label>
                            <select value={formData.merchant_category} onChange={(e) => setFormData({ ...formData, merchant_category: e.target.value })} className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none">
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Amount (₹)</label>
                            <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-xl font-bold" />
                        </div>

                        <button onClick={handleAnalyse} disabled={loading} className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all flex justify-center items-center gap-2">
                            {loading ? <Activity className="animate-spin" /> : "Initiate Neural Analysis"}
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: Results */}
                <div className="lg:col-span-7 flex flex-col gap-6">

                    {/* Top Row: Score & Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">

                        {/* Score Card */}
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                            <h3 className="text-sm font-medium text-slate-400 tracking-widest uppercase mb-6">Impulse Risk Score</h3>

                            <div className="relative flex items-center justify-center w-48 h-48">
                                {/* Decorative background ring */}
                                <div className="absolute inset-0 rounded-full border-[10px] border-slate-800"></div>

                                <span className={`text-7xl font-black ${result ? getScoreColor(result.risk_score) : 'text-slate-700'} transition-all duration-700`}>
                                    {result ? result.risk_score : '--'}
                                </span>
                            </div>
                        </div>

                        {/* Features Card */}
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h3 className="text-sm font-medium text-slate-400 tracking-widest uppercase mb-6">Engineered Features</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <span className="flex items-center gap-3 text-slate-300"><Clock size={18} className="text-purple-400" /> Ego Depletion (Late Night)</span>
                                    <span className="font-bold text-white">{result ? result.features.is_late_night : '-'}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <span className="flex items-center gap-3 text-slate-300"><Activity size={18} className="text-blue-400" /> Velocity (Last 2 Hrs)</span>
                                    <span className="font-bold text-white">{result ? result.features.transactions_last_2hrs : '-'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-3 text-slate-300"><Wallet size={18} className="text-emerald-400" /> Days Since Payday</span>
                                    <span className="font-bold text-white">{result ? result.features.days_since_payday : '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Nudge & Profile */}
                    {result && (
                        <div className="animate-fade-in-up space-y-6">
                            {/* Nudge Banner */}
                            {result.risk_score > 70 ? (
                                <div className="bg-rose-500/10 border border-rose-500/50 rounded-2xl p-6 flex items-start gap-4">
                                    <AlertTriangle className="text-rose-500 shrink-0 mt-1" size={28} />
                                    <div>
                                        <h4 className="text-rose-400 font-bold text-lg mb-1">High Risk Intervention Triggered</h4>
                                        <p className="text-rose-200/80">Behavioural patterns indicate an emotional or impulsive spending state. A 10-minute cooling-off period is highly recommended before processing this transaction.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-2xl p-6 flex items-start gap-4">
                                    <ShieldCheck className="text-emerald-500 shrink-0 mt-1" size={28} />
                                    <div>
                                        <h4 className="text-emerald-400 font-bold text-lg mb-1">Transaction Cleared</h4>
                                        <p className="text-emerald-200/80">Spending behaviour aligns with normal user patterns. No anomalous velocity or timing triggers detected.</p>
                                    </div>
                                </div>
                            )}

                            {/* Profile Card */}
                            <div className="bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden">
                                <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                                    <Zap size={200} />
                                </div>
                                <h3 className="text-sm font-medium text-purple-300 tracking-widest uppercase mb-2">Behavioural Profile</h3>
                                <h2 className="text-4xl font-bold text-white tracking-tight">{result.profile}</h2>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}