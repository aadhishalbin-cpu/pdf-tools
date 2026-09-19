import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { rotatePdf, downloadFile } from '../lib/pdfUtils';
import { File, X, RotateCw, RotateCcw, Download, Loader2 } from 'lucide-react';

export function RotatePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotation, setRotation] = useState(90);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleRotate = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const rotatedPdfBytes = await rotatePdf(file, rotation);
      downloadFile(rotatedPdfBytes, `rotated_${file.name}`);
    } catch (error) {
      console.error('Failed to rotate PDF:', error);
      alert('An error occurred while rotating the PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Rotate PDF</h1>
        <p className="text-slate-600 text-lg">Rotate your PDFs the way you need them. You can even rotate multiple pages at once!</p>
      </div>

      {!file ? (
        <FileUploader onFilesSelected={handleFilesSelected} multiple={false} />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">File to Rotate</h2>
          
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 mb-8">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
              <File className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate">{file.name}</p>
              <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={() => setFile(null)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-purple-50 border border-purple-100 p-6 rounded-xl mb-8 flex flex-col items-center">
            <h3 className="font-medium text-purple-800 mb-6">Rotation Settings</h3>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <button 
                onClick={() => setRotation((prev) => (prev - 90) % 360)}
                className="w-16 h-16 rounded-full bg-white border border-purple-200 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-colors shadow-sm"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              
              <div className="w-32 text-center text-2xl font-bold text-purple-900">
                {((rotation % 360) + 360) % 360}&deg;
              </div>

              <button 
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="w-16 h-16 rounded-full bg-white border border-purple-200 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-colors shadow-sm"
              >
                <RotateCw className="w-6 h-6" />
              </button>
            </div>
            <p className="text-purple-600 text-sm">All pages in the PDF will be rotated by {((rotation % 360) + 360) % 360}&deg;</p>
          </div>

          <div className="flex justify-center border-t border-slate-100 pt-6">
            <button
              onClick={handleRotate}
              disabled={isProcessing || rotation % 360 === 0}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
                isProcessing || rotation % 360 === 0
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <RotateCw className="w-5 h-5" /> Apply Rotation
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
