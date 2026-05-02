import React from 'react';

const PlayerModal = ({ isOpen, onClose, media }) => {
  if (!isOpen || !media) return null;

  // Determine source based on the item clicked
  const isTwitch = media.type === 'twitch';
  const videoSrc = isTwitch 
    ? `https://player.twitch.tv/?channel=iktv112svg&parent=boom-and-iktv-go.vercel.app&parent=boom1069fm.com&parent=localhost&autoplay=true`
    : `https://www.youtube.com/embed/${media.videoUrl}?autoplay=1&rel=0`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10">
      <div className="relative w-full max-w-6xl aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-600">
          <i className="fas fa-times text-xl"></i>
        </button>

        <iframe
          src={videoSrc}
          height="100%"
          width="100%"
          allowFullScreen
          frameBorder="0"
          title={media.title}
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>
    </div>
  );
};

export default PlayerModal;
