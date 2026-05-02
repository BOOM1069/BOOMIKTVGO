import React from 'react';

const MediaCard = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="relative aspect-video bg-gray-900 rounded-md overflow-hidden cursor-pointer shadow-lg"
    >
      <img 
        src={item.thumbnail} 
        alt={item.title}
        className="w-full h-full object-cover"
      />
      
      {/* OVERLAY ON HOVER */}
      <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.category}</p>
        <p className="text-white font-bold text-sm leading-tight line-clamp-2 uppercase">{item.title}</p>
        <div className="mt-2 flex items-center text-white">
          <i className="fas fa-play-circle text-xl mr-2"></i>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Play Now</span>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
