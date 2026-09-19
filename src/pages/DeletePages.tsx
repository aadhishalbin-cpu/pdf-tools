import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { deletePagesFromPdf, downloadFile } from '../lib/pdfUtils';
import { PDFDocument } from 'pdf-lib';
import { File, X, Trash2, Loader2, RefreshCw } from 'lucide-react';

export function DeletePages() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]); // 0-indexed page indices to delete
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setSelectedPages([]);
      
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setTotalPages(pdf.getPageCount());
      } catch (err) {
        console.error('Error reading PDF pages:', err);
        alert('Could not read the PDF document. Please make sure it is a valid, unencrypted PDF.');
        setFile(null);
      }
    }
  };

  const togglePageSelection = (index: number) => {
    if (selectedPages.includes(index)) {
      setSelectedPages(selectedPages.filter(idx => idx !== index));
    } else {
      setSelectedPages([...selectedPages, index]);
    }
  };

  const handleDelete = async () => {
    if (!file || selectedPages.length === 0) return;
    if (selectedPages.length >= totalPages) {
      alert('You cannot delete all pages of the PDF. Please keep at least one page.');
      return;
    }
    
    setIsProcessing(true);
    try {
      const resultBytes = await deletePagesFromPdf(file, selectedPages);
      downloadFile(resultBytes, `edited_${file.name}`);
      
      // Update local view count
      setTotalPages(totalPages - selectedPages.length);
      setSelectedPages([]);
    } catch (err) {
      console.error(err);
      alert('Failed to delete pages. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Delete Pages</h1>
        <p className="text-slate-600 text-lg">Remove unnecessary pages from your PDF file dynamically.</p>
      </div>

      {!file ? (
        <FileUploader onFilesSelected={handleFilesSelected} multiple={false} />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Select Pages to Delete</h2>
          
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 mb-8">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center shrink-0">
              <File className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate">{file.name}</p>
              <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB &bull; {totalPages} pages</p>
            </div>
            <button 
              onClick={() => { setFile(null); setSelectedPages([]); }}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const isSelected = selectedPages.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => togglePageSelection(idx)}
                  className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 font-semibold ${
                    isSelected 
                      ? 'border-red-500 bg-red-50 text-red-800' 
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-sm">Page</div>
                  <div className="text-2xl">{idx + 1}</div>
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-slate-100 pt-6">
            <div className="text-sm text-slate-600 font-medium">
              Selected <span className="text-red-600 font-bold">{selectedPages.length}</span> out of {totalPages} pages to delete.
            </div>

            <button
              onClick={handleDelete}
              disabled={selectedPages.length === 0 || isProcessing}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
                selectedPages.length === 0 || isProcessing
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5" /> Delete Selected Pages
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
