"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSongsAction } from "@/config/redux/action/searchAction";
import { getAllMoodsAction } from "@/config/redux/action/musicAction";
import { setCurrentSong } from "@/config/redux/reducer/musicReducer";
import AddToMoodModal from "@/components/modals/AddToMoodModal";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedSongForMood, setSelectedSongForMood] = useState(null);
  const dispatch = useDispatch();
  
  const { results, isLoading: isSearchLoading } = useSelector((state) => state.search || { results: [], isLoading: false });

  useEffect(() => {
    dispatch(getAllMoodsAction());
  }, [dispatch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        dispatch(searchSongsAction(query));
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, dispatch]);

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
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic">
          Songs
        </h1>
        <p className="text-gray-400 text-lg">Find your favorite tracks and add them to your mood spaces.</p>
      </div>

      {/* Search Input Box */}
      <div className="relative group max-w-2xl">
        <svg 
          className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-purple-400 group-focus-within:scale-110 transition-all duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="w-full pl-16 pr-8 py-5 bg-white/5 border border-white/10 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:bg-white/10 transition-all duration-500 text-xl placeholder-gray-500 shadow-2xl"
        />
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {isSearchLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-gray-400 font-medium animate-pulse">Searching the universe...</p>
          </div>
        ) : query.trim() === "" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Genre Cards (Mock) */}
            {[
              { name: "Pop", color: "#8b5cf6", img: "/images/genres/pop.png" },
              { name: "Rock", color: "#ec4899", img: "/images/genres/rock.png" },
              { name: "Hip Hop", color: "#06b6d4", img: "/images/genres/hiphop.png" },
              { name: "Jazz", color: "#f59e0b", img: "/images/genres/jazz.png" },
              { name: "Electronic", color: "#10b981", img: "/images/genres/electronic.png" },
              { name: "Classical", color: "#3b82f6", img: "/images/genres/classical.png" },
              { name: "Lo-fi", color: "#ef4444", img: "/images/genres/lofi.png" },
              { name: "R&B", color: "#6366f1", img: "/images/genres/rnb.png" },
              { name: "Indie", color: "#f43f5e", img: "/images/genres/indie.png" },
              { name: "Focus", color: "#8b5cf6", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop" },
            ].map((genre, i) => (
              <div 
                key={genre.name}
                onClick={() => setQuery(genre.name)}
                className="relative overflow-hidden aspect-square rounded-[32px] cursor-pointer hover:scale-105 transition-all duration-500 shadow-xl group border border-white/5"
              >
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                  <img src={genre.img} alt={genre.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                  <div 
                    className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity duration-500" 
                    style={{ background: `linear-gradient(135deg, ${genre.color} 0%, rgba(0,0,0,0.8) 100%)` }}
                  />
                </div>

                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <span className="text-2xl font-black italic tracking-tighter text-white drop-shadow-lg">{genre.name}</span>
                  <div className="self-end w-12 h-12 bg-white/10 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {results.map((track) => (
              <div 
                key={track.videoId} 
                onClick={() => handlePlaySong(track)}
                className="group relative flex flex-col p-4 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer"
              >
                <div className="relative aspect-square rounded-[24px] overflow-hidden mb-4">
                  <img src={track.thumbnail || track.image} alt={track.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  
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
                  <h3 className="font-bold text-lg truncate group-hover:text-purple-400 transition-colors">{track.title}</h3>
                  <p className="text-sm text-gray-500 font-medium truncate">
                    {track.artist?.name || track.artist || track.author?.name || track.channelTitle || "Unknown Artist"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
               <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
             </div>
             <p className="text-gray-400 text-xl font-medium">No results found for "{query}"</p>
             <p className="text-gray-500">Try searching for something else.</p>
          </div>
        )}
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
