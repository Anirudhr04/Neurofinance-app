import React, { useState, useRef, useEffect } from 'react';
import { Activity, AlertTriangle, ShieldCheck, Clock, Wallet, Zap, BrainCircuit, ArrowDown } from 'lucide-react';

export default function App() {
    const [formData, setFormData] = useState({
        age: '',
        monthly_income: '',
        timestamp: '',
        merchant_category: '',
        amount: ''
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // This reference helps us auto-scroll to the results
    const resultsRef = useRef(null);

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

    // Auto-scroll when results are generated
    useEffect(() => {
        if (result && resultsRef.current) {
            setTimeout(() => {
                resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [result]);

    const handleAnalyse = async () => {
        if (!formData.age || !formData.monthly_income || !formData.timestamp || !formData.merchant_category || !formData.amount) {
            alert("Please fill in all fields before analysing.");
            return;
        }

        setLoading(true);
        setResult(null); // Clear previous results

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
        }, 1200); // Slightly longer delay to build suspense
    };

    const getScoreColor = (score) => {
        if (score < 40) return 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] border-emerald-500';
        if (score < 70) return 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] border-amber-500';
        return 'text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] border-rose-500';
    };

    return (
        <div className="relative min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30 flex flex-col">

            {/* --- AMAZING BACKGROUND ELEMENTS --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* Glowing Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen"></div>
                <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
            </div>

            {/* --- HEADER --- */}
            <header className="relative z-50 w-full px-6 py-4 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
                        <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-xl shadow-lg shadow-purple-500/20">
                            <BrainCircuit className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-slate-300 tracking-tight">
                            NeuroFinance
                        </span>
                    </div>
                    {/* Optional Header Element / Status */}
                    <div className="hidden md:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        System Online
                    </div>
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 flex-grow w-full max-w-6xl mx-auto p-6 md:p-12 flex flex-col">

                {/* 1. HERO SECTION (Intro) */}
                <div className="text-center mb-16 pt-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                        <BrainCircuit size={16} /> Problem Statement 2
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 tracking-tight mb-6 drop-shadow-sm">
                        NeuroFinance
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
                        Traditional banking apps tell you <strong>what</strong> you spent. We analyze the psychology behind <strong>why</strong>. Enter a simulated transaction below to detect emotional spending triggers in real-time.
                    </p>
                </div>

                {/* 2. THE INPUT FORM */}
                <div className="max-w-2xl mx-auto w-full bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] mb-24 transition-all hover:border-white/20">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Zap size={20} className="text-blue-400" /> Transaction Context Simulator
                    </h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Age</label>
                                <input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-slate-900" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Monthly Inc (₹)</label>
                                <input type="number" value={formData.monthly_income} onChange={(e) => setFormData({ ...formData, monthly_income: e.target.value })} className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-slate-900" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Target Date & Time</label>
                            <input type="datetime-local" value={formData.timestamp} onChange={(e) => setFormData({ ...formData, timestamp: e.target.value })} className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-slate-900" style={{ colorScheme: 'dark' }} />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Merchant Category</label>
                            <select value={formData.merchant_category} onChange={(e) => setFormData({ ...formData, merchant_category: e.target.value })} className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none hover:bg-slate-900 cursor-pointer">
                                <option value="" disabled>Select a category...</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Amount (₹)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">₹</span>
                                <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full bg-slate-950/80 border border-emerald-500/30 rounded-xl pl-10 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-3xl font-bold text-emerald-400 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" />
                            </div>
                        </div>

                        <button onClick={handleAnalyse} disabled={loading} className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all flex justify-center items-center gap-2 transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed border border-white/10">
                            {loading ? (
                                <><Activity className="animate-spin" /> Running Neural Inference...</>
                            ) : (
                                <><ArrowDown size={18} className="animate-bounce" /> Analyze Behaviour</>
                            )}
                        </button>
                    </div>
                </div>

                {/* 3. THE RESULTS REVEAL (Only shows when 'result' exists) */}
                {result && (
                    <div ref={resultsRef} className="w-full pt-4 pb-10 animate-fade-in-up">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Analysis Complete</h2>
                            <p className="text-slate-400">Here is the behavioural breakdown of this transaction.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Score Card */}
                            <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all hover:border-white/20">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>
                                <h3 className="text-sm font-medium text-slate-400 tracking-widest uppercase mb-8">Impulse Risk Score</h3>

                                <div className="relative flex items-center justify-center w-56 h-56">
                                    <div className={`absolute inset-0 rounded-full border-[12px] border-slate-800 ${getScoreColor(result.risk_score).split(' ')[2]} opacity-20`}></div>
                                    <span className={`text-8xl font-black ${getScoreColor(result.risk_score)} transition-all duration-700`}>
                                        {result.risk_score}
                                    </span>
                                </div>
                            </div>

                            {/* Features Card */}
                            <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col justify-center transition-all hover:border-white/20">
                                <h3 className="text-sm font-medium text-slate-400 tracking-widest uppercase mb-8">Behavioural Triggers Detected</h3>
                                <div className="space-y-6 text-lg">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <span className="flex items-center gap-3 text-slate-300"><Clock size={22} className="text-purple-400" /> Ego Depletion (Late Night)</span>
                                        <span className="font-bold text-white bg-slate-950 border border-white/10 shadow-inner px-4 py-1.5 rounded-lg">{result.features.is_late_night}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <span className="flex items-center gap-3 text-slate-300"><Activity size={22} className="text-blue-400" /> Velocity (Last 2 Hrs)</span>
                                        <span className="font-bold text-white bg-slate-950 border border-white/10 shadow-inner px-4 py-1.5 rounded-lg">{result.features.transactions_last_2hrs}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center gap-3 text-slate-300"><Wallet size={22} className="text-emerald-400" /> Days Since Payday</span>
                                        <span className="font-bold text-white bg-slate-950 border border-white/10 shadow-inner px-4 py-1.5 rounded-lg">{result.features.days_since_payday}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Nudge & Profile */}
                        <div className="space-y-8">
                            {/* Nudge Banner */}
                            {result.risk_score > 70 ? (
                                <div className="bg-rose-500/10 border border-rose-500/40 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-[0_0_40px_rgba(244,63,94,0.15)] backdrop-blur-md relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-rose-500"></div>
                                    <div className="bg-rose-500/20 p-4 rounded-2xl border border-rose-500/30">
                                        <AlertTriangle className="text-rose-400 animate-pulse" size={40} />
                                    </div>
                                    <div>
                                        <h4 className="text-rose-400 font-bold text-2xl mb-2 tracking-tight">High Risk Intervention Triggered</h4>
                                        <p className="text-rose-200/80 text-lg leading-relaxed max-w-3xl">Behavioural patterns indicate an emotional or impulsive spending state. A 10-minute cooling-off period is highly recommended before processing this transaction.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-[0_0_40px_rgba(52,211,153,0.1)] backdrop-blur-md relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-500"></div>
                                    <div className="bg-emerald-500/20 p-4 rounded-2xl border border-emerald-500/30">
                                        <ShieldCheck className="text-emerald-400" size={40} />
                                    </div>
                                    <div>
                                        <h4 className="text-emerald-400 font-bold text-2xl mb-2 tracking-tight">Transaction Cleared</h4>
                                        <p className="text-emerald-200/80 text-lg leading-relaxed max-w-3xl">Spending behaviour aligns with normal user patterns. No anomalous velocity or timing triggers detected.</p>
                                    </div>
                                </div>
                            )}

                            {/* Profile Card */}
                            <div className="bg-gradient-to-br from-purple-900/60 to-slate-900 border border-purple-500/30 rounded-3xl p-10 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                                <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none">
                                    <BrainCircuit size={300} />
                                </div>
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-purple-300 tracking-widest uppercase mb-3 flex items-center gap-2">
                                            <Zap size={16} /> Predicted Persona
                                        </h3>
                                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-md">{result.profile}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* --- FOOTER --- */}
            <footer className="relative z-50 w-full py-8 mt-auto border-t border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-2 text-slate-500 text-sm font-medium">
                    <p className="flex items-center gap-2">
                        Made with <span className="text-rose-500 animate-pulse">❤</span> by
                    </p>
                    <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-semibold tracking-wide shadow-inner">
                        Anirudh R (22MIA1094)
                    </div>
                </div>
            </footer>

            {/* Global Keyframes for Animations */}
            <style jsx>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}