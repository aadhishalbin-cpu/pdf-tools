import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center dark:text-slate-100">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-red-200 dark:border-red-900/30">
        <FileQuestion className="w-10 h-10" />
      </div>

      <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
        Page Not Found
      </h1>
      
      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        The PDF tool or reference sheet you are looking for does not exist or has been relocated.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow"
        >
          <Home className="w-4 h-4" /> Back to Dashboard
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    </div>
  );
}
