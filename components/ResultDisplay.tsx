import React from 'react';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string | null;
  isLoading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading }) => {
  if (!generatedImage && !isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800 p-12">
        <div className="text-center text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <p>Generated image will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl min-h-[300px] flex items-center justify-center">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-900/80 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-purple-300 font-medium animate-pulse">Thinking with Nano Banana...</p>
          </div>
        ) : null}

        {generatedImage ? (
            <div className="relative w-full h-full group">
             <img 
               src={`data:image/png;base64,${generatedImage}`} 
               alt="Generated Result" 
               className="w-full h-auto object-contain max-h-[600px]" 
             />
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                <a 
                  href={`data:image/png;base64,${generatedImage}`}
                  download="nanoedit-upscaled.png"
                  className="px-4 py-2 bg-white text-black rounded-lg font-medium flex items-center gap-2 hover:bg-slate-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Download
                </a>
             </div>
            </div>
        ) : (
          // If loading but no result yet, show placeholder or original blurred?
          // Actually simpler to just show the loader above.
          // But if we want to show original while loading?
          <div className="w-full h-full flex items-center justify-center">
             <img src={originalImage} alt="Original" className="max-w-full max-h-[300px] opacity-20 blur-sm" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;