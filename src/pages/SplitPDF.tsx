import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { splitPdf, downloadFile } from '../lib/pdfUtils';
import { File, X, Scissors, Download, Loader2 } from 'lucide-react';

export function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]); // Only handle one file for split
    }
  };

  const handleSplit = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const splitPdfs = await splitPdf(file, '');
      
      // In a real app we might zip these, but for now we'll trigger multiple downloads
      // or just download the first few to avoid browser blocking multiple downloads.
      // A better approach would be to generate a zip file, but to avoid adding jszip dependency
      // we'll trigger up to 3 downloads and show a message if there are more.
      
      const limit = Math.min(splitPdfs.length, 5);
      
      for (let i = 0; i < limit; i++) {
        const originalName = file.name.replace('.pdf', '');
        downloadFile(splitPdfs[i], `${originalName}_page_${i + 1}.pdf`);
        // small delay to avoid browser blocking
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      if (splitPdfs.length > limit) {
        alert(`Note: The PDF has ${splitPdfs.length} pages. To prevent browser freezing, only the first ${limit} pages were downloaded automatically in this demo.`);
      }

    } catch (error) {
      console.error('Failed to split PDF:', error);
      alert('An error occurred while splitting the PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Split PDF File</h1>
        <p className="text-slate-600 text-lg">Extract pages from your PDF or split it into separate one-page PDF files.</p>
      </div>

      {!file ? (
        <FileUploader onFilesSelected={handleFilesSelected} multiple={false} />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">File to Split</h2>
          
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 mb-8">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center shrink-0">
              <File className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate">{file.name}</p>
              <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={() => setFile(null)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-8">
            <h3 className="font-medium text-blue-800 mb-2">Split Options</h3>
            <p className="text-blue-600 text-sm">
              Currently, this tool will split the PDF into individual 1-page PDF files.
            </p>
          </div>

          <div className="flex justify-center border-t border-slate-100 pt-6">
            <button
              onClick={handleSplit}
              disabled={isProcessing}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
                isProcessing
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-rose-600 hover:bg-rose-700 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5" /> Split PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
