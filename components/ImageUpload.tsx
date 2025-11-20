import React, { useCallback } from 'react';
import { SUPPORTED_MIME_TYPES } from '../types';

interface ImageUploadProps {
  onImageSelected: (file: File, base64: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, WebP, HEIC).');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix to get raw base64 for the API
        const base64Data = base64String.split(',')[1];
        onImageSelected(file, base64Data);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  return (
    <div className="w-full h-full min-h-[300px] border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors flex flex-col items-center justify-center relative group cursor-pointer overflow-hidden">
      <input
        type="file"
        accept={SUPPORTED_MIME_TYPES.join(',')}
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-purple-400 transition-colors">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-200">Upload an image</p>
          <p className="text-sm text-slate-500 mt-1">Drag and drop or click to select</p>
        </div>
        <div className="text-xs text-slate-600 mt-2 bg-slate-900/50 px-3 py-1 rounded-full">
          JPG, PNG, WEBP up to 10MB
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;