import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { addPageNumbersToPdf, downloadFile } from '../lib/pdfUtils';
import { File, X, Hash, Loader2 } from 'lucide-react';

export function PageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'top-right'>('bottom-center');
  const [color, setColor] = useState('#475569');
  const [fontSize, setFontSize] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleAddPageNumbers = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const resultBytes = await addPageNumbersToPdf(file, position, color, fontSize);
      downloadFile(resultBytes, `numbered_${file.name}`);
    } catch (err) {
      console.error(err);
      alert('Failed to add page numbers.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Add Page Numbers</h1>
        <p className="text-slate-600 text-lg">Insert page numbers into your PDF with highly custom positions, styles, and dimensions.</p>
      </div>

      {!file ? (
        <FileUploader onFilesSelected={handleFilesSelected} multiple={false} />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6">Page Numbering Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Position</label>
                <select 
                  value={position} 
                  onChange={(e: any) => setPosition(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium focus:outline-none"
                >
                  <option value="bottom-center">Bottom Center (Recommended)</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="top-right">Top Right</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Font Color</label>
                  <input 
                    type="color" 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-11 rounded-lg border border-slate-200 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Font Size (px)</label>
                  <input 
                    type="number" 
                    min="6" 
                    max="24"
                    value={fontSize} 
                    onChange={(e) => setFontSize(parseInt(e.target.value) || 10)}
                    className="w-full px-3 h-11 rounded-lg border border-slate-200 font-bold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Selected PDF</h2>
              
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 mb-6">
                <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center shrink-0">
                  <File className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate text-sm">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button 
                  onClick={() => setFile(null)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Simulated Layout Preview */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 relative h-40 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="h-2 w-12 bg-slate-200 rounded" />
                  {position === 'top-right' && (
                    <span style={{ color: color, fontSize: `${fontSize}px` }} className="font-bold">Page 1 of 12</span>
                  )}
                </div>

                <div className="space-y-1 opacity-10">
                  <div className="h-2 w-full bg-slate-900 rounded" />
                  <div className="h-2 w-5/6 bg-slate-900 rounded" />
                  <div className="h-2 w-4/6 bg-slate-900 rounded" />
                </div>

                <div className="flex justify-between items-center">
                  <div className="h-2 w-8" />
                  {position === 'bottom-center' && (
                    <span style={{ color: color, fontSize: `${fontSize}px` }} className="font-bold mx-auto">Page 1 of 12</span>
                  )}
                  {position === 'bottom-right' && (
                    <span style={{ color: color, fontSize: `${fontSize}px` }} className="font-bold ml-auto">Page 1 of 12</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleAddPageNumbers}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-slate-700 hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Numbering...
                  </>
                ) : (
                  <>
                    <Hash className="w-5 h-5" /> Number PDF Pages
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
