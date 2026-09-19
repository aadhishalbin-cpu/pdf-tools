import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { decryptPdfLocal, downloadFile } from '../lib/pdfUtils';
import { File, X, Unlock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

export function UnlockPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [decryptedBytes, setDecryptedBytes] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDecryptedBytes(null);
      setError(null);
    }
  };

  const handleUnlock = async () => {
    if (!file || !password) return;
    setIsProcessing(true);
    setError(null);
    try {
      const decrypted = await decryptPdfLocal(file, password);
      setDecryptedBytes(decrypted);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to decrypt. Double check the password.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!decryptedBytes || !file) return;
    downloadFile(decryptedBytes, file.name.replace('protected_', ''), 'application/pdf');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Unlock PDF File</h1>
        <p className="text-slate-600 text-lg">Decrypt password-protected PDFs securely to view or edit them.</p>
      </div>

      {!file ? (
        <FileUploader onFilesSelected={handleFilesSelected} multiple={false} />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Enter Password to Unlock</h2>
          
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 mb-6">
            <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center shrink-0">
              <File className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate text-sm">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={() => { setFile(null); setDecryptedBytes(null); setPassword(''); setError(null); }}
              className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!decryptedBytes ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Decryption Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-yellow-500 font-medium"
                    placeholder="Enter security password..."
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3.5 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 border border-red-100 text-sm font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleUnlock}
                disabled={isProcessing || !password}
                className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-yellow-600 hover:bg-yellow-700 transition-all shadow-md disabled:bg-slate-300"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Unlocking...
                  </>
                ) : (
                  <>
                    <Unlock className="w-5 h-5" /> Unlock PDF
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="text-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Unlock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-900 mb-1">PDF Decrypted Successfully</h3>
              <p className="text-sm text-emerald-600 mb-6">Your document has been unlocked and is ready to save.</p>

              <div className="flex gap-4">
                <button
                  onClick={() => { setFile(null); setDecryptedBytes(null); setPassword(''); }}
                  className="flex-1 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Unlock Another
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow hover:shadow-md"
                >
                  Download Unlocked PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
