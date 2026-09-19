import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { imagesToPdf, downloadFile } from '../lib/pdfUtils';
import { File, X, Image as ImageIcon, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

export function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = (newFiles: File[]) => {
    // Filter to image files
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    setFiles(prev => [...prev, ...imageFiles]);
  };

  const moveLeft = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index - 1];
    newFiles[index - 1] = temp;
    setFiles(newFiles);
  };

  const moveRight = (index: number) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index + 1];
    newFiles[index + 1] = temp;
    setFiles(newFiles);
  };

  const handleConvertToPdf = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const pdfBytes = await imagesToPdf(files);
      downloadFile(pdfBytes, 'converted_images.pdf');
    } catch (err) {
      console.error(err);
      alert('Failed to convert images to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">JPG to PDF</h1>
        <p className="text-slate-600 text-lg">Convert multiple JPG, JPEG, and PNG images into a single professional PDF document.</p>
      </div>

      {files.length === 0 ? (
        <FileUploader 
          onFilesSelected={handleFilesSelected} 
          accept="image/jpeg,image/png" 
          multiple={true} 
        />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Images to Convert ({files.length})</h2>
            <button 
              onClick={() => setFiles([])}
              className="text-sm text-red-600 hover:underline font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
            {files.map((file, index) => {
              const url = URL.createObjectURL(file);
              return (
                <div 
                  key={`${file.name}-${index}`}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col items-center gap-2 relative shadow-sm group"
                >
                  <button
                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-md transition-colors z-10"
                    title="Remove Image"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  <div className="w-full h-32 rounded-xl bg-white border border-slate-100 overflow-hidden flex items-center justify-center relative">
                    <img 
                      src={url} 
                      alt={file.name}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <p className="text-xs text-slate-500 font-medium truncate w-full text-center">{file.name}</p>

                  <div className="flex items-center gap-2 mt-1 w-full">
                    <button
                      disabled={index === 0}
                      onClick={() => moveLeft(index)}
                      className="flex-1 p-1 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-600 disabled:opacity-40"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={index === files.length - 1}
                      onClick={() => moveRight(index)}
                      className="flex-1 p-1 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-600 disabled:opacity-40"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-slate-100 pt-6">
            <div className="relative">
              <input
                type="file"
                accept="image/jpeg,image/png"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    handleFilesSelected(Array.from(e.target.files));
                  }
                  e.target.value = '';
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="flex items-center gap-2 text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors border border-blue-200 bg-white">
                Add more images
              </button>
            </div>

            <button
              onClick={handleConvertToPdf}
              disabled={isProcessing}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 transition-all shadow hover:shadow-md"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Converting...
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" /> Generate PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
