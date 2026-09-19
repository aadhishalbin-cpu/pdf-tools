import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { rearrangePagesInPdf, downloadFile } from '../lib/pdfUtils';
import { PDFDocument } from 'pdf-lib';
import { File, X, ArrowLeft, ArrowRight, GripHorizontal, Loader2 } from 'lucide-react';

export function RearrangePages() {
  const [file, setFile] = useState<File | null>(null);
  const [pageOrder, setPageOrder] = useState<number[]>([]); // Array of original 0-indexed page indices
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const count = pdf.getPageCount();
        setPageOrder(Array.from({ length: count }, (_, i) => i));
      } catch (err) {
        console.error('Error reading PDF pages:', err);
        alert('Could not read the PDF document. Make sure it is valid.');
        setFile(null);
      }
    }
  };

  const moveLeft = (index: number) => {
    if (index === 0) return;
    const newOrder = [...pageOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index - 1];
    newOrder[index - 1] = temp;
    setPageOrder(newOrder);
  };

  const moveRight = (index: number) => {
    if (index === pageOrder.length - 1) return;
    const newOrder = [...pageOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + 1];
    newOrder[index + 1] = temp;
    setPageOrder(newOrder);
  };

  const handleSaveOrder = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const rearrangedBytes = await rearrangePagesInPdf(file, pageOrder);
      downloadFile(rearrangedBytes, `rearranged_${file.name}`);
    } catch (err) {
      console.error(err);
      alert('Failed to rearrange pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Rearrange Pages</h1>
        <p className="text-slate-600 text-lg">Change the order of your PDF pages easily by sliding them left or right.</p>
      </div>

      {!file ? (
        <FileUploader onFilesSelected={handleFilesSelected} multiple={false} />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">File to Rearrange</h2>
          
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 mb-8">
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center shrink-0">
              <File className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate">{file.name}</p>
              <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB &bull; {pageOrder.length} pages</p>
            </div>
            <button 
              onClick={() => { setFile(null); setPageOrder([]); }}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
            {pageOrder.map((originalIndex, currentIndex) => (
              <div 
                key={originalIndex}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-3 relative shadow-sm"
              >
                <div className="absolute top-2 right-2 bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full font-bold">
                  Orig: {originalIndex + 1}
                </div>
                
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-xl font-bold text-slate-800 shadow-inner">
                  Page {currentIndex + 1}
                </div>

                <div className="flex items-center gap-2 mt-2 w-full">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => moveLeft(currentIndex)}
                    className="flex-1 p-2 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-600 disabled:opacity-40 transition-colors"
                    title="Move page left"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={currentIndex === pageOrder.length - 1}
                    onClick={() => moveRight(currentIndex)}
                    className="flex-1 p-2 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-600 disabled:opacity-40 transition-colors"
                    title="Move page right"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center border-t border-slate-100 pt-6">
            <button
              onClick={handleSaveOrder}
              disabled={isProcessing}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:bg-slate-300"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Rearranging...
                </>
              ) : (
                <>
                  <GripHorizontal className="w-5 h-5" /> Save Rearranged PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
