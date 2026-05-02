
import React from 'react';

const Header = ({ onListenLive, onNav, currentPage }) => {
  const linkClass = (page) => `
    text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-1 italic
    ${currentPage === page ? 'text-orange-500 border-b-4 border-orange-500' : 'text-white hover:text-orange-500'}
  `;

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-black border-b-2 border-orange-500/30 px-4 md:px-12 py-4">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-6 md:space-x-12">
          <img 
            onClick={() => onNav('home')}
            src="/LOGOCOMBO.jpg" 
            alt="BOOM/IKTV GO" 
            className="h-10 md:h-16 w-auto object-contain cursor-pointer active:scale-95 transition-transform" 
          />
          
          <nav className="hidden lg:flex space-x-10">
            <button onClick={() => onNav('home')} className={linkClass('home')}>Home</button>
            <button onClick={() => onNav('tv')} className={linkClass('tv')}>TV</button>
            <button onClick={() => onNav('radio')} className={linkClass('radio')}>Radio</button>
          </nav>
        </div>
        
        <button 
          onClick={onListenLive} 
          className="bg-orange-500 text-black px-6 md:px-8 py-2.5 rounded-none text-[11px] font-black uppercase italic hover:bg-white transition-all shadow-[4px_4px_0px_rgba(255,255,255,0.2)] flex items-center gap-3 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <i className="fas fa-broadcast-tower text-sm animate-pulse"></i>
          <span className="hidden sm:inline tracking-tighter">Listen Live</span>
          <span className="sm:hidden">Live</span>
        </button>
      </div>

      <nav className="lg:hidden flex justify-center space-x-8 py-3 border-t border-white/10 mt-3">
        <button onClick={() => onNav('home')} className={linkClass('home')}>Home</button>
        <button onClick={() => onNav('tv')} className={linkClass('tv')}>TV</button>
        <button onClick={() => onNav('radio')} className={linkClass('radio')}>Radio</button>
      </nav>
    </header>
  );
};

export default Header;
