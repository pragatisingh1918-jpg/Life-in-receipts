import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Disc, 
  Volume2, 
  Clock, 
  Sparkles, 
  Flame, 
  Moon, 
  Zap,
  Music,
  ExternalLink,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { SPOTIFY_VAULT } from '../data/receiptsData';

export default function SpotifyVault() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackProgress, setPlaybackProgress] = useState(35);

  const currentTrack = SPOTIFY_VAULT[currentTrackIndex];

  // Simulated audio playback ticker
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev < SPOTIFY_VAULT.length - 1 ? prev + 1 : 0));
    setPlaybackProgress(0);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : SPOTIFY_VAULT.length - 1));
    setPlaybackProgress(0);
  };

  return (
    <div className="space-y-6">
      
      {/* 3D Vinyl & Spotify Player Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 border border-emerald-500/30 shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3D Spinning Vinyl Record Visualizer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group cursor-pointer">
              {/* Outer Glowing Ring */}
              <div className={`w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-slate-950 p-2 border-4 border-slate-800 shadow-2xl transition-all duration-700 ${
                isPlaying ? 'animate-spin-slow ring-4 ring-emerald-500/50 shadow-emerald-500/20' : ''
              }`}>
                {/* Vinyl Grooves & Album Artwork */}
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-black via-slate-900 to-slate-800 p-10 flex items-center justify-center relative overflow-hidden border border-slate-700">
                  <img
                    src={currentTrack.coverUrl}
                    alt={currentTrack.track}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-amber-400/80 shadow-lg"
                  />
                  {/* Center Hole */}
                  <div className="absolute w-5 h-5 bg-slate-950 rounded-full border border-amber-400" />
                </div>
              </div>

              {/* 2 AM Midnight Stamp */}
              {currentTrack.is2AM && (
                <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-indigo-600 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-lg flex items-center space-x-1 border border-amber-400/40">
                  <Moon className="w-3.5 h-3.5" />
                  <span>2 AM Midnight Stream</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Track Details & Controls */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40 uppercase tracking-widest flex items-center">
                  <Disc className="w-3.5 h-3.5 mr-1 animate-spin" /> Spotify Vault History
                </span>
                <span className="text-xs font-mono text-slate-400">{currentTrack.time}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-1">
                {currentTrack.track}
              </h2>
              <p className="text-lg font-semibold text-emerald-400">
                {currentTrack.artist} • <span className="text-slate-300 text-sm">{currentTrack.album}</span>
              </p>
            </div>

            {/* Audio Progress Bar & Waveform */}
            <div className="space-y-2">
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden cursor-pointer relative">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>

              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>0:45</span>
                <span className="text-emerald-400 font-semibold">{currentTrack.mood}</span>
                <span>{currentTrack.durationFormatted}</span>
              </div>
            </div>

            {/* Simulated Live Audio Equalizer Waveform */}
            <div className="flex items-end space-x-1 h-8 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
              {[40, 75, 30, 90, 60, 85, 45, 95, 70, 50, 80, 65, 90, 40, 70, 85, 55, 95, 60, 30].map((h, i) => (
                <div 
                  key={i}
                  className={`flex-1 rounded-t transition-all duration-300 ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`}
                  style={{ height: isPlaying ? `${Math.max(20, (h * (playbackProgress + i * 5)) % 100)}%` : '20%' }}
                />
              ))}
            </div>

            {/* Playback Controls */}
            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={handlePrevTrack}
                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-transform transform active:scale-95 shadow-lg shadow-emerald-500/30"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
              </button>

              <button
                onClick={handleNextTrack}
                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <div className="ml-auto text-xs font-mono text-slate-400 flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Streamed via {currentTrack.platform}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Spotify Track History Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <Music className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Spotify Listening Stream History ({SPOTIFY_VAULT.length} Tracks)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Dataset UTC Timestamps</span>
        </div>

        <div className="space-y-2">
          {SPOTIFY_VAULT.map((track, idx) => {
            const isSelected = idx === currentTrackIndex;

            return (
              <div
                key={track.id}
                onClick={() => {
                  setCurrentTrackIndex(idx);
                  setIsPlaying(true);
                }}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/50 shadow-md ring-1 ring-emerald-500'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-300 dark:border-slate-700">
                    <img src={track.coverUrl} alt={track.track} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                      <span>{track.track}</span>
                      {track.is2AM && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-900 text-amber-300">
                          2 AM Stream
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {track.artist} • <span className="italic">{track.album}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono text-slate-500">
                  <span className="hidden sm:inline">{track.time}</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{track.durationFormatted}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
