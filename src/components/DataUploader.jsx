import React, { useState } from 'react';
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';

export default function DataUploader({ isOpen, onClose, onDataImported }) {
  const [pasteText, setPasteText] = useState('');
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          const parsedReceipts = results.data.map((row, idx) => ({
            id: `custom_${idx}`,
            timestamp: row.Date || row.ts || new Date().toISOString(),
            date: row.Date || "2024-01-01",
            time: row.Time || "12:00",
            category: row.Category || row.category || "General",
            subcategory: row.Subcategory || "",
            item: row.Note || row.track_name || row.item || "Digital Event",
            mode: row.Mode || row.platform || "Cash",
            amount: parseFloat(row.Amount || row.amt || 0),
            currency: row.Currency || "INR",
            type: row['Income/Expense'] || "Expense",
            location: row.location || "Local",
            mood: "Reflective",
            icon: "Receipt",
            note: row.Note || "",
            tags: ["ImportedData"],
            connectedIds: [],
            chronotype: "Flexible",
            insights: "User imported custom transaction moment"
          }));

          onDataImported(parsedReceipts);
          setStatus(`Successfully loaded ${parsedReceipts.length} entries!`);
          setTimeout(() => {
            onClose();
          }, 1200);
        }
      }
    });
  };

  const handlePasteSubmit = () => {
    if (!pasteText.trim()) return;

    try {
      if (pasteText.trim().startsWith('[') || pasteText.trim().startsWith('{')) {
        const json = JSON.parse(pasteText);
        const arr = Array.isArray(json) ? json : [json];
        const parsed = arr.map((item, idx) => ({
          id: `custom_json_${idx}`,
          timestamp: item.timestamp || item.ts || new Date().toISOString(),
          date: item.date || "2024-01-01",
          time: item.time || "12:00",
          category: item.category || "Purchases",
          item: item.item || item.note || item.track_name || "Custom Receipt Moment",
          amount: parseFloat(item.amount || item.amt || 0),
          mode: item.mode || "Digital Pay",
          currency: "INR",
          type: "Expense",
          location: item.location || "City",
          mood: item.mood || "Curious",
          icon: "Sparkles",
          note: item.note || "",
          tags: ["UserJSON"],
          connectedIds: [],
          chronotype: "Custom",
          insights: "Custom JSON dataset moment"
        }));
        onDataImported(parsed);
        setStatus(`Successfully parsed ${parsed.length} JSON entries!`);
        setTimeout(() => onClose(), 1200);
      } else {
        Papa.parse(pasteText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              const parsed = results.data.map((row, idx) => ({
                id: `custom_csv_${idx}`,
                timestamp: row.Date || new Date().toISOString(),
                date: row.Date || "2024-01-01",
                time: "12:00",
                category: row.Category || "Imported",
                item: row.Note || row.item || "Event Log",
                amount: parseFloat(row.Amount || 0),
                mode: row.Mode || "Cash",
                currency: "INR",
                type: row['Income/Expense'] || "Expense",
                location: "Local",
                mood: "Reflective",
                icon: "Receipt",
                note: row.Note || "",
                tags: ["PastedCSV"],
                connectedIds: [],
                chronotype: "Custom",
                insights: "Pasted dataset record"
              }));
              onDataImported(parsed);
              setStatus(`Successfully parsed ${parsed.length} CSV entries!`);
              setTimeout(() => onClose(), 1200);
            }
          }
        });
      }
    } catch (err) {
      setStatus("Could not parse dataset text. Please verify formatting.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-5">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Import Custom Dataset</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload File Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block">
            Option 1: Upload CSV / JSON File
          </label>
          <input
            type="file"
            accept=".csv, .json"
            onChange={handleFileUpload}
            className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-950 dark:file:text-indigo-300 hover:file:bg-indigo-100 cursor-pointer"
          />
        </div>

        {/* Or Paste Raw Text */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block">
            Option 2: Paste Raw CSV / JSON Data Below
          </label>
          <textarea
            rows={5}
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="Paste your CSV rows or JSON array here..."
            className="w-full p-3 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handlePasteSubmit}
            className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition-colors shadow"
          >
            Parse & Load Dataset
          </button>
        </div>

        {status && (
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-medium text-center border border-indigo-200 dark:border-indigo-800">
            {status}
          </div>
        )}

      </div>
    </div>
  );
}
