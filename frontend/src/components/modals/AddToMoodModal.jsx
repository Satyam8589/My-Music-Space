"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllMoodsAction, addSongToMoodAction } from "@/config/redux/action/musicAction";

export default function AddToMoodModal({ song, onClose }) {
  const dispatch = useDispatch();
  const { moods, isLoading } = useSelector((state) => state.music);

  useEffect(() => {
    console.log("AddToMoodModal mounted with song:", song);
    dispatch(getAllMoodsAction());
  }, [dispatch, song]);

  const handleAddToMood = (moodId, moodName) => {
    const songData = {
      title: song.title,
      artist: song.artist,
      thumbnail: song.thumbnail || song.image,
      videoId: song.videoId,
      duration: song.duration
    };
    
    dispatch(addSongToMoodAction({ spaceId: moodId, songData }));
    
    // Show success feedback
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-24 right-8 z-[200] px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 fade-in duration-500';
    successMessage.innerHTML = `
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <div>
          <p class="text-white font-bold">Added to ${moodName}</p>
          <p class="text-white/80 text-sm">${song.title}</p>
        </div>
      </div>
    `;
    document.body.appendChild(successMessage);
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
    
    onClose();
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg mx-4 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-[32px] shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-t-[32px]" />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Add to Mood Space
              </h2>
              <p className="text-sm text-gray-400 mt-1 font-medium">
                {song.title} • {song.artist}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all hover:rotate-90 duration-300"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
              <p className="text-gray-400 font-medium">Loading mood spaces...</p>
            </div>
          ) : moods.length > 0 ? (
            <div className="grid gap-3">
              {moods.map((mood) => (
                <button
                  key={mood._id}
                  onClick={() => handleAddToMood(mood._id, mood.name)}
                  className="group relative flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  {/* Mood Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                  </div>

                  {/* Mood Info */}
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-bold text-lg truncate group-hover:text-purple-400 transition-colors">
                      {mood.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {mood.songs?.length || 0} songs
                    </p>
                  </div>

                  {/* Add Icon */}
                  <div className="w-8 h-8 bg-white/5 group-hover:bg-purple-500 rounded-full flex items-center justify-center transition-all">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-lg font-medium">No mood spaces yet</p>
                <p className="text-gray-500 text-sm mt-1">Create your first mood space in the Library</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );

  // Use portal to render at document body level
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  
  return null;
}
