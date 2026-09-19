import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { mergePdfs, downloadFile } from '../lib/pdfUtils';
import { File, X, GripVertical, Plus, Download, Loader2, Info, Combine } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires setting data
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    if (draggedIndex === index) return;

    const newFiles = [...files];
    const draggedFile = newFiles[draggedIndex];
    newFiles.splice(draggedIndex, 1);
    newFiles.splice(index, 0, draggedFile);
    setFiles(newFiles);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    
    try {
      const mergedPdfBytes = await mergePdfs(files);
      downloadFile(mergedPdfBytes, 'merged_document.pdf');
    } catch (error) {
      console.error('Failed to merge PDFs:', error);
      alert('An error occurred while merging PDFs. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 dark:text-slate-100">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">Merge PDF Files</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Combine PDFs in the order you want with the easiest PDF merger available.</p>
      </div>

      <div className="w-full h-24 mb-10 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm relative">
        <span className="absolute z-10 bg-white dark:bg-slate-950 px-2 py-1 rounded text-xs top-2 right-2 shadow-sm border border-slate-200 dark:border-slate-800">Ad</span>
        Advertisement Banner Space
      </div>

      {files.length === 0 ? (
        <FileUploader onFilesSelected={handleFilesSelected} multiple={true} />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Files to Merge ({files.length})</h2>
            <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-md border border-slate-100 dark:border-slate-850">
              <Info className="w-4 h-4 text-blue-500" /> Drag to reorder
            </div>
          </div>
          
          <div className="space-y-3 mb-8">
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  draggable
                  onDragStart={(e) => handleDragStart(e as any, index)}
                  onDragOver={(e) => handleDragOver(e as any, index)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-grab active:cursor-grabbing ${
                    draggedIndex === index 
                      ? 'border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-md z-10' 
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-200 dark:hover:border-blue-800'
                  }`}
                >
                  <div className="text-slate-400 touch-none">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center shrink-0">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-850 dark:text-slate-200 truncate">{file.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-slate-100 dark:border-slate-800/80 pt-6">
            <div className="relative">
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    handleFilesSelected(Array.from(e.target.files));
                  }
                  e.target.value = '';
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Add more files"
              />
              <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors border border-blue-200 dark:border-blue-900 bg-white dark:bg-slate-950">
                <Plus className="w-5 h-5" /> Add more files
              </button>
            </div>
            
            <button
              onClick={handleMerge}
              disabled={files.length < 2 || isProcessing}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
                files.length < 2 || isProcessing
                  ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Combine className="w-5 h-5" /> Merge PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
