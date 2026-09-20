import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ReceiptCard from './components/ReceiptCard';
import StoryPlayer from './components/StoryPlayer';
import ConnectionGraph from './components/ConnectionGraph';
import InsightsDashboard from './components/InsightsDashboard';
import DataUploader from './components/DataUploader';
import SpotifyVault from './components/SpotifyVault';
import { LIFE_RECEIPTS } from './data/receiptsData';
import { Sparkles, Search, RotateCcw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('receipts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [receiptsList, setReceiptsList] = useState(LIFE_RECEIPTS);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Sync dark mode class with root html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // ALL 9 Official Challenge Categories
  const categories = [
    'All', 
    'Music', 
    'Movies & Entertainment', 
    'Places', 
    'Purchases', 
    'Photos', 
    'Messages', 
    'Searches', 
    'Events', 
    'Personal Notes'
  ];

  // Input Sanitization Helper for Security Audit
  const sanitizeInput = (str) => {
    if (typeof str !== 'string') return '';
    return str.replace(/[<>&"']/g, (match) => {
      const map = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#x27;' };
      return map[match] || match;
    });
  };

  // Filtered & Searched Receipts
  const filteredReceipts = receiptsList.filter(receipt => {
    const matchesCategory = selectedCategory === 'All' || receipt.category === selectedCategory;
    const sanitizedSearch = sanitizeInput(searchQuery.trim().toLowerCase());
    
    const matchesSearch = sanitizedSearch === '' || 
      receipt.item.toLowerCase().includes(sanitizedSearch) ||
      receipt.category.toLowerCase().includes(sanitizedSearch) ||
      receipt.note?.toLowerCase().includes(sanitizedSearch) ||
      receipt.mood?.toLowerCase().includes(sanitizedSearch);
      
    return matchesCategory && matchesSearch;
  });

  const handleDataImported = (newItems) => {
    setReceiptsList([...newItems, ...receiptsList]);
    setActiveTab('receipts');
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedNodeId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased pb-16">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6" role="main">
        
        {/* TAB 1: RECEIPT STREAM */}
        {activeTab === 'receipts' && (
          <div className="space-y-6">
            
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 p-6 sm:p-8 text-white shadow-xl">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>WebRush Frontend Hackathon 2026</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
                  Your Life, In Receipts 🧾
                </h2>
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                  Transforming raw digital activity logs (Music, Movies, Places, Purchases, Photos, Messages, Searches, Events, Notes) into a 3D interactive narrative story.
                </p>
              </div>
            </div>

            {/* Filter Pills & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              
              {/* All 9 Official Category Filters */}
              <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none" role="tablist" aria-label="Category Filters">
                {categories.map(cat => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={selectedCategory === cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-white dark:bg-indigo-600 shadow'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-between">
                <button
                  onClick={handleResetFilters}
                  className="flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  title="Reset Filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
                <div className="text-xs font-mono text-slate-500 shrink-0">
                  Showing {filteredReceipts.length} Receipts
                </div>
              </div>

            </div>

            {/* Receipts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReceipts.map(receipt => (
                <ReceiptCard
                  key={receipt.id}
                  receipt={receipt}
                  isSelected={selectedNodeId === receipt.id}
                  onSelectNode={(id) => {
                    setSelectedNodeId(id);
                    setActiveTab('connections');
                  }}
                />
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: SPOTIFY VAULT */}
        {activeTab === 'spotify' && (
          <SpotifyVault />
        )}

        {/* TAB 3: STORY CHAPTERS */}
        {activeTab === 'story' && (
          <StoryPlayer 
            onSelectReceipt={(id) => {
              setSelectedNodeId(id);
              setActiveTab('receipts');
            }} 
          />
        )}

        {/* TAB 4: CONNECTIONS GRAPH */}
        {activeTab === 'connections' && (
          <ConnectionGraph 
            onSelectReceipt={(id) => {
              setSelectedNodeId(id);
              setActiveTab('receipts');
            }}
          />
        )}

        {/* TAB 5: PERSONA INSIGHTS */}
        {activeTab === 'insights' && (
          <InsightsDashboard />
        )}

      </main>

      {/* Modal Data Uploader */}
      <DataUploader
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDataImported={handleDataImported}
      />

    </div>
  );
}
