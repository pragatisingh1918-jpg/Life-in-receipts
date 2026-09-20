import React, { useState, useRef } from 'react';
import { 
  Film, 
  Utensils, 
  Wallet, 
  Music, 
  PiggyBank, 
  HeartPulse, 
  Car, 
  IceCream, 
  Glasses, 
  Sparkles, 
  Gift, 
  UtensilsCrossed, 
  Headphones, 
  Trophy, 
  Sparkle, 
  BookOpen, 
  Compass, 
  Train,
  Clock,
  MapPin,
  Tag,
  ChevronDown,
  ChevronUp,
  Network,
  Zap
} from 'lucide-react';

const ICON_MAP = {
  Film, Utensils, Wallet, Music, PiggyBank, HeartPulse, Car, IceCream,
  Glasses, Sparkles, Gift, UtensilsCrossed, Headphones, Trophy, Sparkle,
  BookOpen, Compass, Train
};

export default function ReceiptCard({ receipt, onSelectNode, isSelected }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({});

  const IconComponent = ICON_MAP[receipt.icon] || Tag;

  // 3D Tilt Mouse Interaction
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = -((y / rect.height) - 0.5) * 14;
    const rotateY = ((x / rect.width) - 0.5) * 14;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Music': return 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400';
      case 'Movies & Entertainment': return 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400';
      case 'Places': return 'border-cyan-500 bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400';
      case 'Health': return 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400';
      case 'Events': return 'border-pink-500 bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400';
      case 'Income': return 'border-emerald-600 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300';
      default: return 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className={`receipt-paper receipt-zigzag-bottom rounded-t-xl p-5 border border-slate-300 dark:border-slate-700 transition-all duration-300 cursor-pointer ${
        isSelected ? 'ring-2 ring-indigo-500 shadow-2xl scale-[1.02]' : 'shadow-lg hover:shadow-2xl'
      }`}
    >
      {/* 3D Holographic Header Strip */}
      <div className="flex items-center justify-between border-b border-dashed border-slate-400 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <span className={`text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded-full border shadow-sm ${getCategoryColor(receipt.category)}`}>
            {receipt.category}
          </span>
          {receipt.chronotype === 'Night Owl' && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-900 text-amber-300 flex items-center">
              <Zap className="w-2.5 h-2.5 mr-0.5" /> 2 AM Vibe
            </span>
          )}
        </div>
        <span className="text-[10px] text-slate-500 font-mono flex items-center">
          <Clock className="w-3 h-3 mr-1 text-slate-400" />
          {receipt.time}
        </span>
      </div>

      {/* Item Title */}
      <div className="text-center mb-3">
        <h3 className="font-mono text-base font-bold text-slate-900 tracking-tight uppercase">
          {receipt.item}
        </h3>
        <p className="text-xs text-slate-500 font-mono flex items-center justify-center mt-1">
          <MapPin className="w-3 h-3 mr-1 text-slate-400" />
          {receipt.location} • {receipt.date}
        </p>
      </div>

      {/* Itemized Thermal Lines */}
      <div className="font-mono text-xs text-slate-700 space-y-1.5 mb-3 border-b border-dashed border-slate-300 pb-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-500">PAYMENT MODE</span>
          <span className="font-semibold">{receipt.mode}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">EMOTIONAL VIBE</span>
          <span className="italic text-indigo-600 font-medium">#{receipt.mood}</span>
        </div>
        
        {/* Total Amount Row */}
        <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-slate-200">
          <span>TOTAL {receipt.type.toUpperCase()}</span>
          <span className={receipt.type === 'Income' ? 'text-emerald-600 font-extrabold' : 'text-slate-900'}>
            {receipt.amount > 0 ? `₹${receipt.amount.toLocaleString('en-IN')}` : 'FREE STREAM'}
          </span>
        </div>
      </div>

      {/* Note Snippet */}
      {receipt.note && (
        <div className="bg-amber-50/90 dark:bg-slate-800/90 p-2.5 rounded text-xs text-slate-700 dark:text-slate-300 font-sans italic border-l-2 border-amber-400 mb-3 shadow-inner">
          "{receipt.note}"
        </div>
      )}

      {/* Insights Badge */}
      <div className="text-[11px] font-sans font-medium text-slate-600 bg-slate-100 p-2 rounded flex items-center mb-3">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1.5 shrink-0" />
        <span>{receipt.insights}</span>
      </div>

      {/* Animated 3D Laser Barcode Scanner */}
      <div className="pt-2 flex flex-col items-center">
        <div className="relative w-full overflow-hidden rounded bg-slate-900 h-8 flex justify-between items-center px-3 text-[9px] font-mono text-amber-400 tracking-widest select-none shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent animate-pulse" />
          <span>||| | |||| | ||||| | ||</span>
          <span>{receipt.id.toUpperCase()}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between w-full pt-2">
          {receipt.connectedIds && receipt.connectedIds.length > 0 && (
            <button
              onClick={() => onSelectNode && onSelectNode(receipt.id)}
              className="flex items-center space-x-1 text-xs font-sans font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Network className="w-3.5 h-3.5" />
              <span>{receipt.connectedIds.length} Linked Moments</span>
            </button>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-1 text-xs font-sans text-slate-500 hover:text-slate-800 ml-auto"
          >
            <span>{expanded ? 'Less' : 'Details'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expanded Tags */}
        {expanded && (
          <div className="w-full pt-3 mt-2 border-t border-slate-200 text-xs font-sans space-y-2">
            <div className="flex flex-wrap gap-1">
              {receipt.tags?.map((t, idx) => (
                <span key={idx} className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px]">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
