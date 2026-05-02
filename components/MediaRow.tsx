import React from 'react';
import MediaCard from './MediaCard';

const MediaRow = ({ title, items, onMediaClick }) => {
  return (
    <div className="py-4 md:py-8">
      <h2 className="text-xl md:text-3xl font-black px-4 md:px-12 mb-6 text-white uppercase italic tracking-tighter">
        {title}
      </h2>
      
      {/* THE ROW ENGINE */}
      <div className="flex overflow-x-auto flex-nowrap space-x-2 md:space-x-4 px-4 md:px-12 pb-10 no-scrollbar scroll-smooth">
        {items?.map((item) => (
          /* md:w-[16.2%] fits exactly 6 tiles per row on desktop */
          <div key={item.id} className="flex-none w-[70%] md:w-[16.2%] transition-all duration-300 hover:scale-110 hover:z-50">
            <MediaCard item={item} onClick={() => onMediaClick(item)} />
          </div>
        ))}
        <div className="flex-none w-4 md:w-12"></div>
      </div>
    </div>
  );
};

export default MediaRow;
