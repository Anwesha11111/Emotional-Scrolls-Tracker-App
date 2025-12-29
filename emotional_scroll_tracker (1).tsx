import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Leaf, Flame, AlertCircle, Wind } from 'lucide-react';

const EmotionalScrollTracker = () => {
  const [emotionData, setEmotionData] = useState([]);
  const [weeklyTrend, setWeeklyTrend] = useState([]);
  const [currentDay, setCurrentDay] = useState('Today');
  const [particles, setParticles] = useState([]);

  // Emotion color schemes
  const emotionColors = {
    calm: '#32CD32',
    hyped: '#FF6B35',
    anxious: '#FF4757',
    numb: '#747D8C'
  };

  const emotionIcons = {
    calm: <Leaf className="w-5 h-5" />,
    hyped: <Flame className="w-5 h-5" />,
    anxious: <AlertCircle className="w-5 h-5" />,
    numb: <Wind className="w-5 h-5" />
  };

  // Generate demo data
  useEffect(() => {
    const demoEmotions = [
      { name: 'Hyped', value: 42, impact: -15, color: emotionColors.hyped },
      { name: 'Numb', value: 28, impact: -30, color: emotionColors.numb },
      { name: 'Calm', value: 18, impact: 22, color: emotionColors.calm },
      { name: 'Anxious', value: 12, impact: -20, color: emotionColors.anxious }
    ];

    const demoWeekly = [
      { day: 'Mon', calm: 15, hyped: 45, anxious: 20, numb: 20, focus: 65 },
      { day: 'Tue', calm: 20, hyped: 40, anxious: 15, numb: 25, focus: 70 },
      { day: 'Wed', calm: 12, hyped: 48, anxious: 18, numb: 22, focus: 60 },
      { day: 'Thu', calm: 25, hyped: 35, anxious: 10, numb: 30, focus: 75 },
      { day: 'Fri', calm: 18, hyped: 42, anxious: 12, numb: 28, focus: 68 },
      { day: 'Sat', calm: 30, hyped: 30, anxious: 8, numb: 32, focus: 80 },
      { day: 'Sun', calm: 35, hyped: 25, anxious: 10, numb: 30, focus: 85 }
    ];

    setEmotionData(demoEmotions);
    setWeeklyTrend(demoWeekly);

    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const getSuggestion = (emotion) => {
    const suggestions = {
      'Hyped': 'Balance with calm content 🌿',
      'Numb': 'Take a 5min walk outside 🚶',
      'Calm': 'More of this! Keep it up 💚',
      'Anxious': 'Try breathing exercises 🧘'
    };
    return suggestions[emotion] || 'Stay mindful';
  };

  const getImpactColor = (impact) => {
    if (impact > 0) return 'text-green-500';
    if (impact < -20) return 'text-red-500';
    return 'text-orange-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-8 relative overflow-hidden">
      {/* Animated Background Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-10"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: emotionColors.calm,
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-12 h-12 text-emerald-400" />
            <h1 className="text-5xl font-bold text-white">Emotional Scroll Tracker</h1>
          </div>
          <p className="text-emerald-300 text-lg">Your daily emotional diet from social media</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart - Today's Emotional Diet */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              Today's Emotional Diet
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '2px solid #10b981',
                    borderRadius: '12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    padding: '12px'
                  }}
                  itemStyle={{
                    color: '#ffffff',
                    fontWeight: 'bold'
                  }}
                  labelStyle={{
                    color: '#6ee7b7',
                    fontWeight: 'bold'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Impact Metrics */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
              Focus Impact
            </h2>
            <div className="space-y-4">
              {emotionData.map((emotion) => (
                <div key={emotion.name} className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div style={{ color: emotion.color }}>
                        {emotionIcons[emotion.name.toLowerCase()]}
                      </div>
                      <span className="text-white font-semibold">{emotion.name}</span>
                      <span className="text-emerald-300">{emotion.value}%</span>
                    </div>
                    <span className={`font-bold ${getImpactColor(emotion.impact)}`}>
                      {emotion.impact > 0 ? '+' : ''}{emotion.impact}% focus
                    </span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${emotion.value}%`,
                        backgroundColor: emotion.color
                      }}
                    />
                  </div>
                  <p className="text-sm text-emerald-200 mt-2">💡 {getSuggestion(emotion.name)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Trends */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
            Weekly Emotional Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="calm" stroke={emotionColors.calm} strokeWidth={2} />
              <Line type="monotone" dataKey="hyped" stroke={emotionColors.hyped} strokeWidth={2} />
              <Line type="monotone" dataKey="anxious" stroke={emotionColors.anxious} strokeWidth={2} />
              <Line type="monotone" dataKey="numb" stroke={emotionColors.numb} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Focus Correlation */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
            Focus Level Correlation
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="focus" 
                stroke="#a78bfa" 
                strokeWidth={3}
                dot={{ fill: '#a78bfa', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-emerald-900/30 rounded-lg border border-emerald-500/30">
            <p className="text-emerald-200 text-center">
              💡 <strong>Insight:</strong> Your focus improves by 22% on days with more calm content
            </p>
          </div>
        </div>

        {/* Extension Status */}
        <div className="mt-8 text-center p-6 bg-slate-800/30 rounded-xl border border-emerald-500/20">
          <p className="text-emerald-300 text-sm">
            🔌 Extension Status: <span className="text-white font-semibold">Demo Mode</span>
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Install the browser extension to start tracking your actual emotional diet
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmotionalScrollTracker;