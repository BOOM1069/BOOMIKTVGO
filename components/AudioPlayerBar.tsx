import React, { useState, useRef, useEffect } from 'react';

const AudioPlayerBar = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(new Audio('https://streaming.shoutcast.com/boom106-9'));

  useEffect(() => {
    // Auto-play when the bar appears
    audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    
    // Cleanup: Stop audio when bar is closed
    return () => {
      audioRef.current.pause();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) { audioRef.current.pause(); } 
    else { audioRef.current.play(); }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#141414] border-t border-yellow-400/20 px-4 md:px-8 py-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.8)] animate-slide-up">
      <div className="flex items-center space-x-4">
        <div className="bg-yellow-400 text-black w-10 h-10 rounded flex items-center justify-center font-black text-xs animate-pulse">
          ON AIR
        </div>
        <div>
          <p className="text-white font-black text-sm uppercase tracking-tighter leading-none">BOOM 106.9 FM</p>
          <p className="text-gray-400 text-[10px] uppercase font-bold mt-1 tracking-widest">Live from St. Vincent</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button onClick={togglePlay} className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition shadow-lg hover:bg-yellow-400">
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-lg`}></i>
        </button>
        
        {/* THE CLOSE BUTTON */}
        <button onClick={onClose} className="text-gray-500 hover:text-white transition">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default AudioPlayerBar;
