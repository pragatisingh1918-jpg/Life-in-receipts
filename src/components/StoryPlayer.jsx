import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Sparkles, 
  BookOpen, 
  Quote, 
  CheckCircle2, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORY_CHAPTERS, LIFE_RECEIPTS } from '../data/receiptsData';

export default function StoryPlayer({ onSelectReceipt }) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const chapter = STORY_CHAPTERS[currentChapterIndex];

  // Auto-play story ticker effect
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev < chapter.narrative.length - 1) {
            return prev + 1;
          } else {
            // Chapter complete! Trigger celebration
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 }
            });
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, chapter]);

  const handleNextChapter = () => {
    if (currentChapterIndex < STORY_CHAPTERS.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      setActiveStep(0);
      setIsPlaying(false);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      setActiveStep(0);
      setIsPlaying(false);
    }
  };

  // Get matching receipts for current chapter
  const chapterReceipts = LIFE_RECEIPTS.filter(r => chapter.receiptIds.includes(r.id));

  return (
    <div className="space-y-6">
      
      {/* Chapter Selection Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {STORY_CHAPTERS.map((chap, idx) => (
          <button
            key={chap.chapterId}
            onClick={() => {
              setCurrentChapterIndex(idx);
              setActiveStep(0);
              setIsPlaying(false);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-2 ${
              idx === currentChapterIndex
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Chapter {chap.chapterId}</span>
          </button>
        ))}
      </div>

      {/* Main Chapter Story Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        
        {/* Cover Image Header */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden">
          <img 
            src={chapter.coverImage} 
            alt={chapter.title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          
          {/* Chapter Badge Overlay */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 uppercase tracking-wider shadow">
              {chapter.personaBadge}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-slate-200 backdrop-blur">
              {chapter.subtitle}
            </span>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
              {chapter.title}
            </h2>
            <p className="text-sm text-slate-300 font-medium">
              {chapter.theme}
            </p>
          </div>
        </div>

        {/* Story Body & Audio Ticker Controls */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Summary & Quote */}
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {chapter.summary}
            </p>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 flex items-start space-x-3">
              <Quote className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm italic text-indigo-900 dark:text-indigo-200 font-serif">
                "{chapter.quote}"
              </p>
            </div>
          </div>

          {/* Story Narrative Steps (Interactive Timeline Player) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Interactive Story Timeline</span>
              </h3>
              
              {/* Play / Pause / Skip Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isPlaying 
                      ? 'bg-amber-500 text-slate-950 shadow-md' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause Story' : 'Auto Play Narrative'}</span>
                </button>
              </div>
            </div>

            {/* Narrative Timeline Bullets */}
            <div className="space-y-2">
              {chapter.narrative.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start space-x-3 ${
                    idx === activeStep
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md transform scale-[1.01]'
                      : idx < activeStep
                      ? 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 opacity-70'
                      : 'bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    idx === activeStep ? 'bg-white text-indigo-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="flex-1">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handlePrevChapter}
              disabled={currentChapterIndex === 0}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <SkipBack className="w-4 h-4" />
              <span>Previous Chapter</span>
            </button>

            <span className="text-xs text-slate-500 font-mono">
              Chapter {currentChapterIndex + 1} of {STORY_CHAPTERS.length}
            </span>

            <button
              onClick={handleNextChapter}
              disabled={currentChapterIndex === STORY_CHAPTERS.length - 1}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white disabled:opacity-40 hover:bg-indigo-500 shadow transition-colors"
            >
              <span>Next Chapter</span>
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
