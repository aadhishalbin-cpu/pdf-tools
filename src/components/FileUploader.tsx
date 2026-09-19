import React, { useCallback, useState } from 'react';
import { UploadCloud, File, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
}

export function FileUploader({ 
  onFilesSelected, 
  accept = "application/pdf", 
  multiple = true,
  maxSizeMB = 50 
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndProcessFiles = (fileList: FileList | null) => {
    setError(null);
    if (!fileList) return;

    const files = Array.from(fileList);
    const validFiles: File[] = [];

    for (const file of files) {
      if (accept.includes('pdf') && file.type !== 'application/pdf') {
        setError(`File "${file.name}" is not a valid PDF.`);
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File "${file.name}" exceeds the ${maxSizeMB}MB limit.`);
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      if (!multiple && validFiles.length > 1) {
        onFilesSelected([validFiles[0]]);
      } else {
        onFilesSelected(validFiles);
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndProcessFiles(e.dataTransfer.files);
  }, [accept, maxSizeMB, multiple, onFilesSelected]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndProcessFiles(e.target.files);
    // Reset input so the same file can be selected again if needed
    e.target.value = '';
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 shadow-inner' 
            : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50 shadow-sm'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          title=""
        />
        
        <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
          <div className={`p-4 rounded-full transition-colors duration-300 ${isDragging ? 'bg-blue-100' : 'bg-slate-100'}`}>
            <UploadCloud className={`w-12 h-12 ${isDragging ? 'text-blue-600' : 'text-slate-500'}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Select PDF file{multiple ? 's' : ''}
            </h3>
            <p className="text-slate-500 mb-6">
              or drop {multiple ? 'PDFs' : 'PDF'} here
            </p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-md pointer-events-auto">
            Select file{multiple ? 's' : ''}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto p-1 hover:bg-red-100 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
