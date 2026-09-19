import React from 'react';
import { ShieldAlert, Server, EyeOff, Lock, Heart } from 'lucide-react';

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 dark:text-slate-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Last Updated: July 2026. Security-by-design: we do not upload your documents.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
        
        {/* Core highlight */}
        <div className="p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl flex flex-col sm:flex-row gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <EyeOff className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900 dark:text-blue-300 text-base mb-1">Local Browser Processing Model</h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
              We operate exclusively within your client browser instance. When you select a document, it is parsed, encrypted, signed, or converted on your local system thread. We never transmit your document content or layout vectors to external APIs or remote databases.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">1. Information We Do NOT Collect</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Because our core components run locally in the client context, we do not inspect, log, store, or cache:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-600 dark:text-slate-400 space-y-2">
            <li>Any document buffers, pages, text characters, metadata headers, or layout details.</li>
            <li>Input signature vectors (drawn signatures are captured as temporary canvas structures and immediately garbage-collected upon file output).</li>
            <li>Security passwords configured for PDF protection.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">2. Cookies and Local Storage</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            We use browser standard `localStorage` to save user preferences, such as your customized theme selection (Light vs. Dark mode) and your local history list of file downloads. These records are 100% private to your browser cache and are never synced to secondary servers.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">3. CDN Resources & Assets</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Several optional layouts (such as local OCR scanning or dynamic PDF image rendering) utilize secure CDNs (like cdnjs or unpkg) to dynamically fetch specialized parsing dependencies on-demand. These files do not transmit custom parameters or payload content.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">4. Security Warranties</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            By avoiding central cloud database stores for files, we eliminate the risk of remote corporate hacking or document leaks. Your data safety relies entirely on the security of your own local hardware unit.
          </p>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 text-center text-slate-400 text-xs font-mono">
          Aetheris Secure Web Sandbox Compliance
        </div>
      </div>
    </div>
  );
}
