import React from 'react';

const Hero = ({ onPlay }) => {
  return (
    <div 
      className="relative h-[80vh] md:h-[85vh] w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=2070')`
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="relative z-20 h-full flex flex-col justify-end md:justify-center px-6 md:px-16 max-w-7xl pb-20 md:pb-0 space-y-6 md:space-y-8">
        
        <div className="flex items-center space-x-3">
          <div className="bg-red-600 text-white px-2 py-1 rounded shadow-lg animate-pulse">
            <span className="text-[9px] font-black uppercase tracking-widest">Live Now</span>
          </div>
          <span className="text-yellow-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
            IKTV CHANNEL 112
          </span>
        </div>
        
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] text-white">
          BOOM/IKTV <span className="text-yellow-400">GO</span>
        </h1>
        
        <p className="text-sm md:text-xl text-gray-200 max-w-2xl font-medium leading-relaxed border-l-2 md:border-l-4 border-yellow-400 pl-4 md:pl-6">
          Stream IKTV Live and listen to BOOM 106.9 FM anywhere in the world.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
          <button 
            onClick={onPlay}
            className="w-full sm:w-auto bg-yellow-400 text-black px-8 py-3.5 md:py-4 rounded font-black flex items-center justify-center hover:bg-white transition-all transform active:scale-95 shadow-lg"
          >
            <i className="fas fa-play mr-3"></i> 
            <span className="uppercase tracking-wider text-xs md:text-sm">Watch Live TV</span>
          </button>
          
          <button className="w-full sm:w-auto px-8 py-3.5 md:py-4 rounded border border-white/30 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-xs md:text-sm backdrop-blur-sm transition-all active:scale-95">
            Station Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
