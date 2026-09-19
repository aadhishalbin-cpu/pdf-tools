import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { watermarkPdf, downloadFile } from '../lib/pdfUtils';
import { File, X, Stamp, Loader2 } from 'lucide-react';

export function WatermarkPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.3);
  const [rotation, setRotation] = useState(-45);
  const [scale, setScale] = useState(1.5);
  const [color, setColor] = useState('#ff0000');
  const [position, setPosition] = useState<'center' | 'top' | 'bottom'>('center');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleApplyWatermark = async () => {
    if (!file || !text) return;
    setIsProcessing(true);
    try {
      const watermarkedBytes = await watermarkPdf(
        file, 
        text, 
        opacity, 
        rotation, 
        scale, 
        color, 
        position
      );
      downloadFile(watermarkedBytes, `watermarked_${file.name}`);
    } catch (err) {
      console.error(err);
      alert('Failed to apply watermark.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Add Watermark</h1>
        <p className="text-slate-600 text-lg">Add text watermarks to your PDF with customized fonts, rotation, and opacity.</p>
      </div>

      {!file ? (
        <FileUploader onFilesSelected={handleFilesSelected} multiple={false} />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6">Watermark Settings</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Watermark Text</label>
                <input 
                  type="text" 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                  placeholder="e.g. CONFIDENTIAL"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Color</label>
                  <input 
                    type="color" 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-11 rounded-lg border border-slate-200 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Position</label>
                  <select 
                    value={position} 
                    onChange={(e: any) => setPosition(e.target.value)}
                    className="w-full px-3 h-11 rounded-lg border border-slate-200 font-medium focus:outline-none"
                  >
                    <option value="center">Center</option>
                    <option value="top">Top Header</option>
                    <option value="bottom">Bottom Footer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                  <span>Opacity</span>
                  <span>{Math.round(opacity * 100)}%</span>
                </label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1.0" 
                  step="0.05"
                  value={opacity} 
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                  <span>Rotation</span>
                  <span>{rotation}&deg;</span>
                </label>
                <input 
                  type="range" 
                  min="-180" 
                  max="180" 
                  step="5"
                  value={rotation} 
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                  <span>Scale Size</span>
                  <span>{scale}x</span>
                </label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="4.0" 
                  step="0.1"
                  value={scale} 
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Target Document</h2>
              
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 mb-6">
                <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center shrink-0">
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

              {/* Live Preview Simulator card */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 text-center relative overflow-hidden h-48 flex items-center justify-center">
                <span className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded text-xs text-slate-500 border border-slate-100 shadow-sm">Preview</span>
                
                {/* Simulated pdf content */}
                <div className="space-y-2 opacity-10">
                  <div className="h-4 w-40 bg-slate-900 rounded mx-auto" />
                  <div className="h-3 w-48 bg-slate-900 rounded mx-auto" />
                  <div className="h-3 w-32 bg-slate-900 rounded mx-auto" />
                </div>

                {/* Simulated Watermark */}
                <div 
                  style={{ 
                    opacity: opacity, 
                    transform: `rotate(${rotation}deg) scale(${scale})`,
                    color: color,
                    position: 'absolute'
                  }}
                  className="font-black select-none pointer-events-none transition-all duration-300 text-xl whitespace-nowrap"
                >
                  {text || 'PREVIEW'}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleApplyWatermark}
                disabled={isProcessing || !text}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-cyan-600 hover:bg-cyan-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:bg-slate-300"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Watermarking...
                  </>
                ) : (
                  <>
                    <Stamp className="w-5 h-5" /> Save Watermarked PDF
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
