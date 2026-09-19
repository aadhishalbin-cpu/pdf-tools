import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Star, 
  History, 
  X, 
  DownloadCloud, 
  ExternalLink,
  Lock,
  Combine,
  Minimize2,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { tools, iconMap } from '../data/toolsRegistry';


interface HistoryItem {
  id: string;
  filename: string;
  size: number;
  type: string;
  timestamp: string;
}

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load favorites & download history from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('pdf_master_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error(e);
      }
    }

    const savedHistory = localStorage.getItem('pdf_master_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleFavorite = (toolId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let updated: string[];
    if (favorites.includes(toolId)) {
      updated = favorites.filter(id => id !== toolId);
    } else {
      updated = [...favorites, toolId];
    }
    setFavorites(updated);
    localStorage.setItem('pdf_master_favorites', JSON.stringify(updated));
  };

  const clearHistory = () => {
    localStorage.removeItem('pdf_master_history');
    setHistory([]);
  };

  const removeHistoryItem = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('pdf_master_history', JSON.stringify(updated));
  };

  // Filter tools based on search query & category tab selection
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteTools = tools.filter(t => favorites.includes(t.id));

  // Human friendly file size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col items-center dark:bg-slate-950">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-blue-50 to-slate-50 dark:from-slate-900/40 dark:to-slate-950 py-20 px-4 transition-colors">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Every tool you need to work with PDFs in one place
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks. 100% free and easy to use.
          </motion.p>
          
          {/* Quick Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative max-w-xl mx-auto"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
             <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 110+ high-performance PDF tools..."
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-md focus:outline-none focus:border-blue-500 font-medium text-base transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Starred/Favorites Tray */}
      {favoriteTools.length > 0 && !searchQuery && activeCategory === 'all' && (
        <section className="w-full max-w-7xl mx-auto px-4 pt-12">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Your Favorite Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteTools.map((tool) => {
              const IconComp = iconMap[tool.iconName] || FileText;
              return (
                <Link 
                  key={`fav-${tool.id}`}
                  to={tool.link}
                  className="block group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/60 transition-all duration-300 relative"
                >
                  <button
                    onClick={(e) => toggleFavorite(tool.id, e)}
                    className="absolute top-4 right-4 text-amber-500 hover:text-slate-400 p-1"
                    title="Remove from favorites"
                  >
                    <Star className="w-5 h-5 fill-amber-400" />
                  </button>
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${tool.bg} mb-4`}>
                    <IconComp className={`w-5 h-5 ${tool.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">{tool.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{tool.description}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Tools Container with Category Filter */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100">All PDF Utilities</h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
            {[
              { id: 'all', label: 'All Tools' },
              { id: 'page-control', label: 'Page Actions' },
              { id: 'convert', label: 'Convert' },
              { id: 'security', label: 'Security' },
              { id: 'optimization', label: 'Optimizers' },
              { id: 'visual', label: 'Visuals' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === tab.id 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool, index) => {
                const isFav = favorites.includes(tool.id);
                const IconComp = iconMap[tool.iconName] || FileText;
                return (
                  <motion.div
                    key={tool.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to={tool.link}
                      className="block group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/60 transition-all duration-300 h-full relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/0 to-slate-50/50 dark:to-slate-900/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500 ease-out" />
                      
                      <button
                        onClick={(e) => toggleFavorite(tool.id, e)}
                        className="absolute top-4 right-4 text-slate-300 dark:text-slate-700 hover:text-amber-500 dark:hover:text-amber-500 p-1 z-10 transition-colors"
                        title={isFav ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Star className={`w-5 h-5 ${isFav ? 'fill-amber-400 text-amber-500' : ''}`} />
                      </button>

                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${tool.bg} mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                        <IconComp className={`w-7 h-7 ${tool.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tool.name}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{tool.description}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-lg mx-auto">
            <Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">No Matching Utilities</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We couldn't find any tool matching "{searchQuery}". Try selecting a different category or refining your query.
            </p>
          </div>
        )}
      </section>

      {/* Download Logs / Activity History */}
      {history.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <History className="w-5 h-5 text-blue-500" /> Recent Exports ({history.length})
              </h2>
              <button 
                onClick={clearHistory}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Clear History
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-2">
              {history.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-xl flex items-center gap-3 justify-between shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{item.filename}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {formatSize(item.size)} &bull; {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => removeHistoryItem(item.id, e)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                    title="Remove entry"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ad Banner - Lower */}
      <div className="w-full max-w-5xl mx-auto mb-12 h-24 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm overflow-hidden relative">
        <span className="absolute z-10 bg-white dark:bg-slate-950 px-2 py-1 rounded text-xs top-2 right-2 shadow-sm border border-slate-200 dark:border-slate-800">Ad</span>
        Advertisement Banner Space (728x90)
      </div>

      {/* Features Section */}
      <section className="w-full bg-slate-900 text-white py-24 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why choose Aetheris?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We provide the most robust suite of tools without compromising your privacy or draining your wallet.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Private</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Many of our tools process files entirely in your browser. Your sensitive documents never leave your device.
              </p>
            </div>
            <div>
              <div className="bg-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Combine className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">All-in-One Solution</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                From simple merges to complex OCR extractions, we have a tool for almost any PDF task you can imagine.
              </p>
            </div>
            <div>
              <div className="bg-amber-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Minimize2 className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast & Efficient</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Optimized algorithms ensure that your files are processed at lightning speed without losing quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

