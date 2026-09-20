import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ReceiptCard from './components/ReceiptCard';
import StoryPlayer from './components/StoryPlayer';
import ConnectionGraph from './components/ConnectionGraph';
import InsightsDashboard from './components/InsightsDashboard';
import DataUploader from './components/DataUploader';
import SpotifyVault from './components/SpotifyVault';
import { LIFE_RECEIPTS } from './data/receiptsData';
import { 
  Sparkles, 
  Search
} from 'lucide-react';

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

  // Categories for filter pills
  const categories = ['All', 'Music', 'Movies & Entertainment', 'Purchases', 'Health', 'Events', 'Places', 'Income', 'Investments'];

  // Filtered & Searched Receipts
  const filteredReceipts = receiptsList.filter(receipt => {
    const matchesCategory = selectedCategory === 'All' || receipt.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      receipt.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.note?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.mood?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDataImported = (newItems) => {
    setReceiptsList([...newItems, ...receiptsList]);
    setActiveTab('receipts');
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
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
                  Transforming raw digital logs (2 AM songs, movie tickets, coffee purchases, hospital runs, festival idols) into an interactive 3D narrative.
                </p>
              </div>
              <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none hidden md:block text-9xl">
                🧾
              </div>
            </div>

            {/* Filter Pills & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              
              {/* Category Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat}
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

              {/* Mobile Search Input */}
              <div className="relative w-full sm:hidden">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search receipts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="text-xs font-mono text-slate-500 shrink-0">
                Showing {filteredReceipts.length} Receipts
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
