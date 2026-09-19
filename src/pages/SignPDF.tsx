import React, { useState, useRef, useEffect } from 'react';
import { FileUploader } from '../components/FileUploader';
import { signPdfDocument, downloadFile } from '../lib/pdfUtils';
import { PDFDocument } from 'pdf-lib';
import { File, X, PenTool, Edit2, Upload, Loader2, RefreshCw } from 'lucide-react';

export function SignPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [targetPageIndex, setTargetPageIndex] = useState<number>(0);
  const [signatureType, setSignatureType] = useState<'draw' | 'type' | 'upload'>('draw');
  const [typedName, setTypedName] = useState('John Doe');
  const [signatureImageUrl, setSignatureImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Position coordinates & scale
  const [posX, setPosX] = useState(100);
  const [posY, setPosY] = useState(100);
  const [scale, setScale] = useState(0.5);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Set up drawing canvas
  useEffect(() => {
    if (signatureType === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [signatureType, file]);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setSignatureImageUrl(null);
      
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setTotalPages(pdf.getPageCount());
        setTargetPageIndex(0);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    // Handle standard mouse and touch coordinates
    const clientX = ('touches' in e) ? e.touches[0].clientX : e.clientX;
    const clientY = ('touches' in e) ? e.touches[0].clientY : e.clientY;
    const actualX = clientX - rect.left;
    const actualY = clientY - rect.top;

    ctx.lineTo(actualX, actualY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const captureSignature = async (): Promise<string | null> => {
    if (signatureType === 'draw' && canvasRef.current) {
      return canvasRef.current.toDataURL('image/png');
    }
    
    if (signatureType === 'type') {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 400;
      tempCanvas.height = 150;
      const ctx = tempCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        ctx.font = 'italic bold 32px Georgia';
        ctx.fillStyle = '#1e3a8a';
        ctx.fillText(typedName, 40, 85);
        return tempCanvas.toDataURL('image/png');
      }
    }

    if (signatureType === 'upload' && signatureImageUrl) {
      return signatureImageUrl;
    }

    return null;
  };

  const handleApplySignature = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const sigDataUrl = await captureSignature();
      if (!sigDataUrl) {
        alert('Please create or upload a signature first.');
        setIsProcessing(false);
        return;
      }

      const signedBytes = await signPdfDocument(
        file,
        sigDataUrl,
        targetPageIndex,
        posX,
        posY,
        scale
      );

      downloadFile(signedBytes, `signed_${file.name}`);
    } catch (err) {
      console.error(err);
      alert('Failed to sign document. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      const reader = new FileReader();
      reader.onload = () => {
        setSignatureImageUrl(reader.result as string);
      };
      reader.readAsDataURL(uploaded);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Sign PDF Document</h1>
        <p className="text-slate-600 text-lg">Add authentic legal signatures by drawing, typing, or uploading a PNG template.</p>
      </div>

      {!file ? (
        <FileUploader onFilesSelected={handleFilesSelected} multiple={false} />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6">Create Signature</h2>
            
            <div className="flex gap-2 mb-6 border-b border-slate-100 pb-4">
              <button
                onClick={() => setSignatureType('draw')}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm ${signatureType === 'draw' ? 'bg-fuchsia-100 text-fuchsia-800' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Draw Signature
              </button>
              <button
                onClick={() => setSignatureType('type')}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm ${signatureType === 'type' ? 'bg-fuchsia-100 text-fuchsia-800' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Type Name
              </button>
              <button
                onClick={() => setSignatureType('upload')}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm ${signatureType === 'upload' ? 'bg-fuchsia-100 text-fuchsia-800' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Upload File
              </button>
            </div>

            {signatureType === 'draw' && (
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm relative">
                  <canvas 
                    ref={canvasRef} 
                    width={400} 
                    height={180} 
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full cursor-crosshair bg-white"
                  />
                  <button 
                    onClick={clearCanvas}
                    className="absolute bottom-3 right-3 text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 px-2.5 py-1.5 rounded-md"
                  >
                    Clear Canvas
                  </button>
                </div>
              </div>
            )}

            {signatureType === 'type' && (
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={typedName} 
                  onChange={(e) => setTypedName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium focus:outline-none focus:border-fuchsia-500"
                  placeholder="Type signature name..."
                />
                
                <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50 text-center font-serif text-3xl italic text-blue-900 border-dashed">
                  {typedName || 'Sign here'}
                </div>
              </div>
            )}

            {signatureType === 'upload' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 relative">
                  <input 
                    type="file" 
                    accept="image/png,image/jpeg" 
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 font-medium">Click to upload PNG signature</p>
                  <p className="text-xs text-slate-400 mt-1">Transparent backgrounds look best</p>
                </div>

                {signatureImageUrl && (
                  <div className="border border-slate-200 rounded-xl p-3 bg-white flex items-center justify-between">
                    <img src={signatureImageUrl} alt="Signature Preview" referrerPolicy="no-referrer" className="h-10 object-contain" />
                    <button onClick={() => setSignatureImageUrl(null)} className="text-slate-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Layout Positioning Settings */}
            <div className="mt-8 space-y-4 pt-6 border-t border-slate-100">
              <h3 className="font-bold text-slate-800">Placement Controls</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Target Page</label>
                  <select 
                    value={targetPageIndex} 
                    onChange={(e) => setTargetPageIndex(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold focus:outline-none"
                  >
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <option key={idx} value={idx}>Page {idx + 1}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Signature Scale</label>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.5" 
                    step="0.05"
                    value={scale} 
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full accent-fuchsia-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Horizontal Position (X)</label>
                  <input 
                    type="number" 
                    value={posX} 
                    onChange={(e) => setPosX(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Vertical Position (Y)</label>
                  <input 
                    type="number" 
                    value={posY} 
                    onChange={(e) => setPosY(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">PDF Document Canvas</h2>
              
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 mb-6">
                <div className="w-10 h-10 bg-fuchsia-100 text-fuchsia-600 rounded-lg flex items-center justify-center shrink-0">
                  <File className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate text-sm">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB &bull; {totalPages} pages</p>
                </div>
                <button 
                  onClick={() => setFile(null)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Visual signature placement map */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 relative h-60 flex flex-col justify-between overflow-hidden">
                <span className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded text-xs text-slate-500 border border-slate-100">Page {targetPageIndex + 1} Map</span>
                
                {/* Simulated content block */}
                <div className="space-y-2 opacity-5 mt-6">
                  <div className="h-3 w-5/6 bg-slate-950 rounded" />
                  <div className="h-3 w-full bg-slate-950 rounded" />
                  <div className="h-3 w-4/6 bg-slate-950 rounded" />
                  <div className="h-3 w-5/6 bg-slate-950 rounded" />
                </div>

                {/* Simulated placed signature badge */}
                <div 
                  style={{ 
                    position: 'absolute',
                    left: `${Math.min(80, Math.max(10, posX / 5))}%`,
                    bottom: `${Math.min(80, Math.max(10, posY / 5))}%`,
                    transform: `scale(${scale * 1.5})`
                  }}
                  className="bg-fuchsia-50 border-2 border-fuchsia-400 text-fuchsia-700 font-bold text-xs py-1 px-2.5 rounded shadow-md select-none flex items-center gap-1 font-mono transition-all duration-300"
                >
                  <PenTool className="w-3.5 h-3.5" /> SIGNATURE
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleApplySignature}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <PenTool className="w-5 h-5" /> Sign & Save PDF
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
