import React from 'react';
import { Scale, ShieldAlert, BadgeCheck, FileCheck } from 'lucide-react';

export function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 dark:text-slate-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Please review our terms of use. Simple, fair, and transparent.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
        
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Completely Free & Open License</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">No secret pricing models or subscriptions. Use without restrictions.</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">1. Service Definition</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Aetheris grants users an unrestricted, free license to use our web-based tools (Merge, Split, Compress, Rotate, Protect, Sign, OCR etc.) directly in their client environment. We do not require active accounts, API subscriptions, or user registration.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">2. Acceptable Use Policy</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
            Since your processes are executed locally, you have total control. However, you agree to:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-600 dark:text-slate-400 space-y-2">
            <li>Not use the applet's engine to process malicious software or host phishing pages.</li>
            <li>Not reverse-engineer the client scripts to launch spam services or heavy automated scraping setups on third-party resources.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">3. Disclaimer of Warranties</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Aetheris is provided "as is" and "as available", without warranties of any kind. Since all processing runs on your device, we are not responsible for any failures, file data corruptions, device memory overflows, or performance issues on your specific system configuration.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">4. Term Modifications</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            We reserve the right to revise these terms as needed. Any updates will be displayed directly on this web address.
          </p>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 text-center text-slate-400 text-xs">
          Thank you for choosing secure local processing.
        </div>
      </div>
    </div>
  );
}
