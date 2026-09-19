import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { convertWordToPdf, downloadFile } from '../lib/pdfUtils';
import { File, X, FileText, Loader2 } from 'lucide-react';

export function WordToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setIsProcessing(true);
      
      try {
        // Read text content directly. In case of docx, we extract plain text strings for easy browser processing.
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          // Filter some binary headers if they select a raw docx, or show raw text nicely
          if (selectedFile.name.endsWith('.docx')) {
            setTextContent(`[DOCX Text Preview]\n\nLoaded "${selectedFile.name}".\nEditing content below to customize your PDF output:\n\n` + text.replace(/[^\x20-\x7E\n]/g, ''));
          } else {
            setTextContent(text);
          }
          setIsProcessing(false);
        };
        reader.readAsText(selectedFile);
      } catch (err) {
        console.error(err);
        alert('Failed to read file content.');
        setIsProcessing(false);
      }
    }
  };

  const handleConvert = async () => {
    if (!textContent) return;
    setIsProcessing(true);
    try {
      const pdfBytes = await convertWordToPdf(textContent, file?.name.split('.')[0] || 'Converted Document');
      downloadFile(pdfBytes, `${file?.name.split('.')[0] || 'document'}.pdf`);
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Word to PDF</h1>
        <p className="text-slate-600 text-lg">Convert Word documents, text sheets, and notes into beautifully styled PDFs.</p>
      </div>

      {!file ? (
        <FileUploader 
          onFilesSelected={handleFilesSelected} 
          accept=".txt,.docx" 
          multiple={false} 
        />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Convert to PDF</h2>
          
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 mb-6">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate">{file.name}</p>
              <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button 
              onClick={() => { setFile(null); setTextContent(''); }}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Edit Document Text Content</label>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono text-sm leading-relaxed"
            />
          </div>

          <div className="flex justify-center border-t border-slate-100 pt-6">
            <button
              onClick={handleConvert}
              disabled={isProcessing || !textContent}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-700 transition-all shadow hover:shadow-md disabled:bg-slate-300"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Converting...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" /> Convert to PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
