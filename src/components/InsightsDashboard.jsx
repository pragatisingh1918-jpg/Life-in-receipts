import React from 'react';
import { 
  BarChart3, 
  Moon, 
  Sun, 
  PieChart as PieChartIcon, 
  Flame, 
  Award, 
  Sparkles,
  Zap,
  TrendingUp,
  Pizza,
  Music,
  Headphones,
  Film,
  Utensils
} from 'lucide-react';
import { ANALYTICS_DATA } from '../data/receiptsData';

const OBSESSION_ICONS = {
  Pizza,
  Music,
  Headphones,
  Film,
  Utensils
};

export default function InsightsDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-purple-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl font-bold tracking-tight">Persona & Pattern Insights</h2>
            </div>
            <p className="text-xs sm:text-sm text-purple-200">
              High-level algorithmic analysis of your chronotype, emotional spending triggers, and top life obsessions.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-xs font-mono">
            Overall Archetype: <span className="font-bold text-amber-300">Night-Owl Creative Explorer</span>
          </div>
        </div>
      </div>

      {/* Grid of Key Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Chronotype Ratio */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                <Moon className="w-4 h-4 text-indigo-500" />
                <span>Chronotype Distribution</span>
              </span>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">42% Night Owl</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
              Activity spikes heavily around <span className="font-bold text-indigo-600">10:00 PM – 2:30 AM</span> (Spotify streams, movie runs, late dinner orders).
            </p>

            {/* Progress Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center"><Moon className="w-3 h-3 text-purple-500 mr-1" /> Night Owl (10 PM - 3 AM)</span>
                  <span>42%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center"><Sun className="w-3 h-3 text-amber-500 mr-1" /> Early Bird (6 AM - 12 PM)</span>
                  <span>28%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center"><Zap className="w-3 h-3 text-cyan-500 mr-1" /> Afternoon (12 PM - 6 PM)</span>
                  <span>30%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 italic">
            "Late night periods correlate with creative music listening and movie outings."
          </div>
        </div>

        {/* Card 2: Top Life Obsessions */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Top Digital Obsessions</span>
            </span>
            <span className="text-xs font-semibold text-rose-500">Peak Trends</span>
          </div>

          <div className="space-y-3">
            {ANALYTICS_DATA.topObsessions.map((obs, idx) => {
              const IconComp = OBSESSION_ICONS[obs.icon] || Flame;
              return (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{obs.title}</h4>
                      <span className="text-[10px] text-slate-400">{obs.count} Recorded Events</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    #{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 3: Financial & Emotional Value Allocation */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                <PieChartIcon className="w-4 h-4 text-emerald-500" />
                <span>Category Value Breakdown</span>
              </span>
            </div>

            <div className="space-y-2.5">
              {ANALYTICS_DATA.categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">{cat.name}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      ₹{cat.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${Math.min(100, (cat.amount / 22500) * 100)}%`,
                        backgroundColor: cat.color
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs font-semibold text-emerald-600 flex items-center justify-between">
            <span>High Savings Ratio (PPF + Investments)</span>
            <Award className="w-4 h-4" />
          </div>
        </div>

      </div>
    </div>
  );
}
