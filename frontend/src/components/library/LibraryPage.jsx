"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  getAllMoodsAction, 
  createMoodAction, 
  deleteMoodAction,
  removeSongFromMoodAction
} from "@/config/redux/action/musicAction";
import { setCurrentMood, clearCurrentMood, setCurrentSong } from "@/config/redux/reducer/musicReducer";

export default function LibraryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMood, setNewMood] = useState({ name: "" , description: "" });
  const dispatch = useDispatch();
  const { moods, currentMood, isLoading } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(getAllMoodsAction());
  }, [dispatch]);

  const handleCreateMood = (e) => {
    e.preventDefault();
    if (newMood.name.trim()) {
      dispatch(createMoodAction(newMood));
      setNewMood({ name: "", description: "" });
      setIsModalOpen(false);
    }
  };

  const handleDeleteMood = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this mood space?")) {
      dispatch(deleteMoodAction(id));
    }
  };

  const handleRemoveSong = (e, videoId) => {
    e.stopPropagation();
    if (currentMood) {
      dispatch(removeSongFromMoodAction({ spaceId: currentMood._id, videoId }));
    }
  };

  const handlePlaySong = (song) => {
    dispatch(setCurrentSong({
      videoId: song.videoId,
      title: song.title,
      artist: song.artist,
      thumbnail: song.thumbnail,
      duration: song.duration
    }));
  };

  if (currentMood) {
    return (
      <div className="p-10 pb-32 space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
        {/* Back Button & Header */}
        <div className="space-y-6">
          <button 
            onClick={() => dispatch(clearCurrentMood())}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Library
          </button>
          
          <div className="flex items-end gap-8">
            <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-[40px] shadow-2xl flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
               <svg className="w-24 h-24 text-white/50" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
               </svg>
            </div>
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Mood Space</span>
              <h1 className="text-7xl font-black tracking-tighter italic bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                {currentMood.name}
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">{currentMood.description || "A curated space for your favorite tracks."}</p>
              <div className="flex items-center gap-6 pt-2">
                <span className="text-sm font-bold text-white">{currentMood.songs?.length || 0} Tracks</span>
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                <span className="text-sm font-bold text-gray-400">Created by You</span>
              </div>
            </div>
          </div>
        </div>

        {/* Songs List */}
        <div className="space-y-2 relative z-10">
          {currentMood.songs?.length > 0 ? (
            currentMood.songs.map((song, index) => (
              <div 
                key={song.videoId || index} 
                onClick={() => handlePlaySong(song)}
                className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
              >
                <span className="text-sm font-black text-gray-600 group-hover:text-purple-500 transition-colors w-6">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-lg">
                  <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate group-hover:text-purple-400 transition-colors">{song.title}</p>
                  <p className="text-xs text-gray-500 truncate">{song.artist}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold text-gray-500">{song.duration || "3:45"}</span>
                  <button 
                    onClick={(e) => handleRemoveSong(e, song.videoId)}
                    className="p-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center space-y-4 border border-dashed border-white/10 rounded-[40px] bg-white/[0.02]">
               <p className="text-gray-500 font-bold">This space is empty.</p>
               <p className="text-sm text-gray-600">Go to "Songs" to find and add tracks to this mood!</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 pb-32 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic">
            Your Library
          </h1>
          <p className="text-gray-400 text-lg">Manage your mood spaces and curated collections.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group relative px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-white/10 flex items-center gap-3"
        >
          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          Create Mood
        </button>
      </div>

      {/* Mood Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoading && moods.length === 0 ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="aspect-video bg-white/5 rounded-[32px] animate-pulse border border-white/5" />
          ))
        ) : moods.length > 0 ? (
          moods.map((mood) => (
            <div 
              key={mood._id}
              onClick={() => dispatch(setCurrentMood(mood))}
              className="group relative flex flex-col p-6 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden aspect-video justify-end"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black truncate group-hover:text-purple-400 transition-colors uppercase italic tracking-tighter">
                    {mood.name}
                  </h3>
                  <button 
                    onClick={(e) => handleDeleteMood(mood._id, e)}
                    className="p-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 font-medium">
                  {mood.description || "No description set for this space."}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full">
                    {mood.songs?.length || 0} Tracks
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-32 space-y-6 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-300">Your library is empty</h2>
              <p className="text-gray-500 max-w-sm mx-auto">Start by creating a new mood space to organize your favorite music.</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Mood Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-full max-w-xl bg-zinc-900 border border-white/10 rounded-[40px] p-10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />
            
            <div className="flex items-center justify-between relative z-10">
              <h2 className="text-3xl font-black italic tracking-tighter">Create New Space</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateMood} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Space Name</label>
                <input
                  autoFocus
                  type="text"
                  placeholder="e.g. Midnight Vibin'"
                  value={newMood.name}
                  onChange={(e) => setNewMood({ ...newMood, name: e.target.value })}
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:bg-white/10 transition-all text-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Description (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="What's the vibe of this space?"
                  value={newMood.description}
                  onChange={(e) => setNewMood({ ...newMood, description: e.target.value })}
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:bg-white/10 transition-all text-lg resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-5 bg-white text-black font-black rounded-[24px] text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/10"
              >
                Launch Space
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
