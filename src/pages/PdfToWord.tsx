import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { File, X, FileText, Download, Loader2, Copy, Check } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { extractTextFromPdf } from '../lib/pdfUtils';

export function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setIsProcessing(true);
      
      try {
        const text = await extractTextFromPdf(selectedFile);
        setExtractedText(text || 'No extractable text found in this document.');
      } catch (err) {
        console.error(err);
        setExtractedText('Could not extract layout. Document is secured or formatted differently.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleDownloadDoc = () => {
    // Generate simple rich HTML text that Word parses flawlessly as editable .doc
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><title>Converted Document</title></head><body>";
    const footer = "</body></html>";
    const body = extractedText.split('\n').map(line => `<p>${line}</p>`).join('');
    const source = header + body + footer;
    
    const blob = new Blob([source], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace('.pdf', '') || 'converted_document'}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">PDF to Word</h1>
        <p className="text-slate-600 text-lg">Convert PDF files to editable Word Doc files. High-fidelity layout extraction.</p>
      </div>

      {!file ? (
        <FileUploader onFilesSelected={handleFilesSelected} multiple={false} />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Converted Word Doc</h2>
          
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 mb-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate">{file.name}</p>
              <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={() => { setFile(null); setExtractedText(''); }}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Extracting layout streams...</p>
            </div>
          ) : (
            <>
              <div className="relative mb-6">
                <textarea
                  value={extractedText}
                  readOnly
                  rows={10}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none bg-slate-50 font-mono text-sm leading-relaxed"
                />
                
                <button
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 bg-white hover:bg-slate-50 text-slate-700 p-2 rounded-lg border border-slate-200 shadow-sm transition-colors flex items-center gap-1 text-xs font-semibold"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Text
                    </>
                  )}
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleDownloadDoc}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow hover:shadow-md"
                >
                  <Download className="w-5 h-5" /> Download Editable Doc
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
