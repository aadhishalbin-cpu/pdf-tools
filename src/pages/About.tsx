import React from 'react';
import { Shield, Cpu, Lock, CheckCircle, Heart, Award } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 dark:text-slate-100">
      {/* Hero Header */}
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full mb-4 border border-blue-100 dark:border-blue-900/40"
        >
          <Award className="w-3.5 h-3.5" /> Empowering Private Document Workflows
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
          About Aetheris
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Aetheris is a next-generation browser-based suite that breaks the mold of online document processors. We believe your sensitive contracts, tax records, and personal papers should remain exactly where they belong: in your custody.
        </p>
      </div>

      {/* Grid of Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">100% Client-Side Engine</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Unlike other utilities that upload files to cloudy servers, our cryptographic and processing layers run natively inside your browser. By utilizing highly optimized WebAssembly threads and WebGL rendering APIs, we merge, sign, compress, and rotate large documents with unmatched efficiency.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Military-Grade Encryption</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            All protection routines (password locking, unlocked decryptions) employ native Web Crypto AES-GCM 256-bit parameters with dynamic PBKDF2 salt derivation. Your password never travels through space; everything starts and finishes on your local thread.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Our Core Commitment</h2>
          <div className="space-y-4">
            {[
              "No account registration is required to use the tools — no limits, no catches.",
              "We never collect or upload your document buffers. Your privacy is structurally guaranteed.",
              "Clean, professional UI with no intrusive popup ads, redirects, or visual noise.",
              "Accessible from any modern browser on desktop, tablet, and mobile with complete responsiveness."
            ].map((text, idx) => (
              <div key={idx} className="flex gap-3 items-start text-sm md:text-base">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team / Mission */}
      <div className="text-center">
        <p className="text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-widest mb-2">Developed with Care</p>
        <p className="flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold text-sm">
          Crafted with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> for the secure open web.
        </p>
      </div>
    </div>
  );
}
