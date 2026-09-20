import React, { useState } from 'react';
import { Network, Sparkles, ArrowRight, RefreshCw, Eye } from 'lucide-react';
import { LIFE_RECEIPTS } from '../data/receiptsData';

export default function ConnectionGraph({ onSelectReceipt }) {
  const [selectedNodeId, setSelectedNodeId] = useState("rec_101");

  const selectedNode = LIFE_RECEIPTS.find(r => r.id === selectedNodeId) || LIFE_RECEIPTS[0];
  
  // Find connected nodes
  const connectedNodes = LIFE_RECEIPTS.filter(r => 
    selectedNode.connectedIds?.includes(r.id) || r.connectedIds?.includes(selectedNode.id)
  );

  return (
    <div className="space-y-6">
      
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Network className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold tracking-tight">The Moment Connections Web</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Discover how disconnected digital events (2 AM Spotify songs ➔ Domino's Pizza ➔ INOX Cinema ➔ Savings Transfers) form a butterfly effect in your personal story.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs text-amber-300 font-mono border border-amber-400/30">
            Click any node below to trace its story thread
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Node Web View (Interactive SVG Matrix / Node Network) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md flex flex-col justify-between min-h-[420px]">
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Interactive Digital Life Constellation
            </span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              {connectedNodes.length} Directly Linked Moments
            </span>
          </div>

          {/* Node Constellation Visualizer */}
          <div className="relative flex-1 bg-slate-50 dark:bg-slate-900/60 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-xl">
              {LIFE_RECEIPTS.map((receipt) => {
                const isCurrent = receipt.id === selectedNodeId;
                const isConnected = selectedNode.connectedIds?.includes(receipt.id) || receipt.connectedIds?.includes(selectedNodeId);

                return (
                  <button
                    key={receipt.id}
                    onClick={() => setSelectedNodeId(receipt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-300 transform hover:scale-105 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg ring-2 ring-indigo-400'
                        : isConnected
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-400 shadow-md ring-1 ring-amber-400'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {receipt.category.split(' ')[0]}
                      </span>
                      <span className="text-[10px] font-mono opacity-80">{receipt.time}</span>
                    </div>

                    <p className="text-xs font-semibold truncate mt-1">
                      {receipt.item}
                    </p>
                    
                    {isConnected && (
                      <span className="inline-flex items-center text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-1">
                        <Sparkles className="w-3 h-3 mr-0.5" /> Connected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600 mr-1.5" /> Selected</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 mr-1.5" /> Connected</span>
            </div>
            <span>Click any card to inspect full cause-and-effect thread</span>
          </div>
        </div>

        {/* Selected Node Narrative Details Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Pattern Analysis & Story Thread
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                {selectedNode.id.toUpperCase()}
              </span>
            </div>

            {/* Selected Node Main Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedNode.item}
              </h3>
              
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded">
                  <span className="text-slate-400 block text-[10px]">TIMESTAMP</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedNode.timestamp}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded">
                  <span className="text-slate-400 block text-[10px]">LOCATION</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">{selectedNode.location}</span>
                </div>
              </div>

              {/* Note / Personal Memory */}
              {selectedNode.note && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs italic border border-amber-200 dark:border-amber-800">
                  "{selectedNode.note}"
                </div>
              )}

              {/* Connected Story Chain */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                  DISCOVERED CONNECTIONS ({connectedNodes.length})
                </h4>
                
                <div className="space-y-2">
                  {connectedNodes.map((conn) => (
                    <div 
                      key={conn.id}
                      onClick={() => setSelectedNodeId(conn.id)}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 cursor-pointer border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs transition-colors"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">{conn.item}</span>
                        <span className="text-[10px] text-slate-500 block">{conn.category} • {conn.time}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-indigo-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 text-xs font-medium border border-indigo-200 dark:border-indigo-800/50 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>{selectedNode.insights}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
