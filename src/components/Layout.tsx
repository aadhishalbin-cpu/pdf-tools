import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FileText, Menu, X, Shield, Settings, Heart, Sun, Moon } from 'lucide-react';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('pdf_master_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pdf_master_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100 font-sans">Aetheris</span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/tools" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors">All Tools</Link>
              <Link to="/tools/compress" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors">Compress</Link>
              <Link to="/tools/pdf-to-word" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors">PDF to Word</Link>
              <Link to="/compiler" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors">Code Compiler</Link>
              
              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
              </button>

              <Link to="/tools/merge" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-sm hover:shadow hover:-translate-y-0.5">
                Merge PDF
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full z-50">
            <Link 
              to="/tools" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              All Tools
            </Link>
            <Link 
              to="/tools/compress" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Compress PDF
            </Link>
            <Link 
              to="/tools/pdf-to-word" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              PDF to Word
            </Link>
            <Link 
              to="/compiler" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Code Compiler
            </Link>
            <Link 
              to="/tools/merge" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-white bg-blue-600 text-center"
            >
              Merge PDF Now
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-slate-800 dark:text-slate-100 font-sans">Aetheris</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Your high-fidelity, private, and secure online productivity suite. Files are processed locally in your sandbox browser.
              </p>
              {/* Ad Placeholder - Footer */}
              <div className="w-full h-24 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800/60 flex items-center justify-center text-slate-400 dark:text-slate-600 text-xs">
                Advertisement Space
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Popular Tools</h3>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                <li><Link to="/tools/merge" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Split PDF</Link></li>
                <li><Link to="/tools/compress" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Compress PDF</Link></li>
                <li><Link to="/tools/pdf-to-word" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">PDF to Word</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Company</h3>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Support</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Security</h3>
              <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 mb-4">
                <Shield className="w-5 h-5 text-green-500 shrink-0" />
                <p>256-bit SSL Encryption for secure file transfers.</p>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Settings className="w-5 h-5 text-blue-500 shrink-0" />
                <p>Files are processed locally and never stored on our servers.</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Aetheris. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mt-4 md:mt-0">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for PDF users.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
