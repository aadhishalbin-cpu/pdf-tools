import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Load sent messages on component mount
  useEffect(() => {
    const raw = localStorage.getItem('pdf_master_contact_messages');
    if (raw) {
      try {
        setMessages(JSON.parse(raw));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const newMsg: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || 'General Query',
      message,
      timestamp: new Date().toISOString(),
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('pdf_master_contact_messages', JSON.stringify(updated));

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('pdf_master_contact_messages', JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 dark:text-slate-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
          Contact PDF Support
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Have a question about browser capabilities or file limits? Send us a direct query below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Contact Form */}
        <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" /> Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-blue-500 font-medium text-sm"
                  placeholder="Enter name..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-blue-500 font-medium text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Subject (Optional)</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-blue-500 font-medium text-sm"
                placeholder="How can we help you?"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-blue-500 font-medium text-sm leading-relaxed"
                placeholder="Write your details here..."
              />
            </div>

            {submitted && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40 rounded-xl flex items-center gap-2.5 text-sm font-semibold">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Message submitted locally! View your log ticket on the side.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow hover:shadow-md"
            >
              <Send className="w-4 h-4" /> Send Ticket
            </button>
          </form>
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Mail className="w-4 h-4 text-blue-500" /> Technical Support
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              We process everything locally inside the client runtime. In case of issues, email us directly:
            </p>
            <p className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              support@pdfmaster.dev
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              Your Submissions ({messages.length})
            </h3>
            
            {messages.length === 0 ? (
              <p className="text-xs text-slate-500 leading-relaxed">No messages sent in this browser session.</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {messages.map((m) => (
                  <div key={m.id} className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-3 rounded-xl text-xs flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[120px]">{m.name}</span>
                      <button 
                        onClick={() => handleDeleteMessage(m.id)}
                        className="text-slate-400 hover:text-red-500 p-0.5"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 mb-1.5">{new Date(m.timestamp).toLocaleDateString()}</span>
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
