import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { compressPdf, downloadFile } from '../lib/pdfUtils';
import { File, X, Minimize2, Percent, Loader2, Zap } from 'lucide-react';

export function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ originalSize: number; newSize: number; savings: number; bytes: Uint8Array } | null>(null);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setResult(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const res = await compressPdf(file, level);
      setResult({
        originalSize: res.originalSize,
        newSize: res.newSize,
        savings: res.savings,
        bytes: res.data
      });
    } catch (error) {
      console.error('Failed to compress PDF:', error);
      alert('An error occurred while compressing. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    downloadFile(result.bytes, `compressed_${file.name}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Compress PDF</h1>
        <p className="text-slate-600 text-lg">Reduce file size while keeping the best possible visual quality.</p>
      </div>

      {!file ? (
        <FileUploader onFilesSelected={handleFilesSelected} multiple={false} />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">File to Compress</h2>
          
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 mb-8">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
              <Minimize2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate">{file.name}</p>
              <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={() => { setFile(null); setResult(null); }}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!result ? (
            <>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-slate-800 mb-4">Select Compression Level</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setLevel('low')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      level === 'low' 
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold mb-1">Low Compression</div>
                    <div className="text-xs text-slate-500">High image quality, larger file size.</div>
                  </button>

                  <button
                    onClick={() => setLevel('medium')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      level === 'medium' 
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold mb-1">Medium Compression</div>
                    <div className="text-xs text-slate-500">Good balance between size and quality. Recommended.</div>
                  </button>

                  <button
                    onClick={() => setLevel('high')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      level === 'high' 
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold mb-1">Extreme Compression</div>
                    <div className="text-xs text-slate-500">Maximum compression, lower image quality.</div>
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:bg-slate-300"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Compressing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" /> Compress PDF
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Percent className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-2">Compression Complete!</h3>
              <p className="text-emerald-700 mb-6">
                Your file has been compressed by <span className="font-bold">{result.savings}%</span>.
              </p>

              <div className="flex justify-center gap-8 max-w-md mx-auto bg-white p-4 rounded-xl border border-emerald-100 shadow-sm mb-6 text-sm">
                <div>
                  <div className="text-slate-500">Original Size</div>
                  <div className="font-bold text-slate-700">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</div>
                </div>
                <div className="border-r border-slate-200" />
                <div>
                  <div className="text-slate-500">Compressed Size</div>
                  <div className="font-bold text-emerald-700">{(result.newSize / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => { setFile(null); setResult(null); }}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Compress another
                </button>
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition-all hover:scale-105"
                >
                  Download Compressed PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
