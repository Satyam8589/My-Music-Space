"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTop100SongsAction } from "@/config/redux/action/searchAction";
import { getAllMoodsAction } from "@/config/redux/action/musicAction";
import { setCurrentSong } from "@/config/redux/reducer/musicReducer";
import AddToMoodModal from "@/components/modals/AddToMoodModal";

const languages = [
  { name: "Indian", code: "IN" },
  { name: "Korean", code: "KR" },
  { name: "English", code: "US" }
];

export default function RecommendedPage({ setActiveTab }) {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedSongForMood, setSelectedSongForMood] = useState(null);
  const dispatch = useDispatch();
  
  const { top100, isLoading } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getTop100SongsAction(selectedLang.code));
    dispatch(getAllMoodsAction());
  }, [dispatch, selectedLang]);

  const handlePlaySong = (track) => {
    const artistName = track.artist?.name || track.artist || track.author?.name || track.channelTitle || "Unknown Artist";
    dispatch(setCurrentSong({
      videoId: track.videoId,
      title: track.title,
      artist: artistName,
      thumbnail: track.thumbnail || track.image,
      duration: track.duration?.label || track.duration
    }));
  };

  return (
    <div className="p-10 pb-32 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic">
            Recommended
          </h1>
          <p className="text-gray-400 text-lg">Exploring the top 100 global anthems.</p>
        </div>

        {/* Language Selector */}
        <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang)}
              className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all duration-300 ${
                selectedLang.code === lang.code
                  ? "bg-white text-black shadow-xl"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Songs Grid - Showing all 100 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {isLoading ? (
          Array(15).fill(0).map((_, i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-[32px] animate-pulse border border-white/5" />
          ))
        ) : top100.length > 0 ? (
          top100.map((track, index) => (
            <div 
              key={track.videoId} 
              onClick={() => handlePlaySong(track)}
              className="group relative flex flex-col p-4 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer"
            >
              <div className="relative aspect-square rounded-[24px] overflow-hidden mb-4 shadow-2xl">
                <img src={track.thumbnail || track.image} alt={track.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                
                {/* Ranking Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-center font-black text-white italic border border-white/10">
                  #{index + 1}
                </div>

                {/* Overlay Background - Only on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Play Button - Center, only on hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaySong(track);
                    }}
                    className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-500 shadow-2xl hover:scale-110 z-10"
                  >
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                
                {/* Add to Mood Button - Bottom Right, always visible */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const artistName = track.artist?.name || track.artist || track.author?.name || track.channelTitle || "Unknown Artist";
                    setSelectedSongForMood({
                      ...track,
                      artist: artistName,
                      thumbnail: track.thumbnail || track.image
                    });
                  }}
                  className="absolute bottom-2 right-2 w-6 h-6 md:w-7 md:h-7 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 z-20"
                >
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="px-2 space-y-1">
                <h3 className="font-bold text-lg truncate group-hover:text-purple-400 transition-colors uppercase italic tracking-tighter">{track.title}</h3>
                <p className="text-sm text-gray-500 font-medium truncate">
                  {track.artist?.name || track.artist || track.author?.name || track.channelTitle || "Unknown Artist"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-500">No tracks found. Try changing the region.</p>
          </div>
        )}
      </div>

      {/* Search More Action */}
      <div className="flex justify-center pt-10">
        <button 
          onClick={() => setActiveTab("Songs")}
          className="group relative px-12 py-5 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 transition-all duration-500 flex items-center gap-4 shadow-2xl"
        >
          <span className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
            Search More Tracks
          </span>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-all duration-500 group-hover:rotate-[360deg]">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>
      </div>

      {/* Add to Mood Modal */}
      {selectedSongForMood && (
        <AddToMoodModal
          song={selectedSongForMood}
          onClose={() => setSelectedSongForMood(null)}
        />
      )}
    </div>
  );
}
