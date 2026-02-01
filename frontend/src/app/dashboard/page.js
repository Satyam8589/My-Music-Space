"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { togglePlay, setIsPlaying, setCurrentSong, setVolume, setSeekTo } from "@/config/redux/reducer/musicReducer";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import SearchPage from "@/components/search/SearchPage";
import LibraryPage from "@/components/library/LibraryPage";
import RecommendedPage from "@/components/recommended/RecommendedPage";
import FullPagePlayer from "@/components/player/FullPagePlayer";
import GlobalPlayer from "@/components/player/GlobalPlayer";
import AddToMoodModal from "@/components/modals/AddToMoodModal";
import { getTop100SongsAction } from "@/config/redux/action/searchAction";

const formatISO8601Duration = (durationString) => {
  if (!durationString) return "0:00";
  if (!durationString.startsWith("PT")) return durationString;

  const match = durationString.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return durationString;

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  let result = "";
  if (hours > 0) {
    result += hours + ":";
    result += minutes.toString().padStart(2, "0") + ":";
  } else {
    result += minutes + ":";
  }
  result += seconds.toString().padStart(2, "0");

  return result;
};

const HomePage = ({ mousePosition, handlePlay, setActiveTab, recommendedSongs, isLoadingRecommended, playHistory }) => {
  const [selectedSongForMood, setSelectedSongForMood] = useState(null);

  useEffect(() => {
    console.log("selectedSongForMood changed:", selectedSongForMood);
  }, [selectedSongForMood]);

  return (
  <div className="flex-1 w-full overflow-x-hidden">
    {/* Hero Section */}
    <section className="px-6 md:px-10 pt-6 md:pt-10 pb-6">
      <div className="relative group overflow-hidden rounded-[30px] md:rounded-[40px] p-8 md:p-12 flex flex-col justify-end min-h-[300px] md:min-h-[340px] bg-gradient-to-br from-purple-600/40 via-pink-600/20 to-transparent border border-white/10">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-30 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0, 50 0, 100 100 Z" fill="url(#grad1)" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="relative z-10 space-y-4">
          <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-purple-300 inline-block">
            Newly Added
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent italic">
            AFTER HOURS
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-lg font-medium leading-relaxed">
            Dive into the synth-pop universe of The Weeknd. Explore the darker side of pop.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              onClick={() => handlePlay({
                videoId: "fHI8X4OXluQ",
                title: "Blinding Lights",
                artist: "The Weeknd",
                thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
                duration: "3:20"
              })}
              className="px-6 md:px-10 py-3 md:py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-white/10 text-sm md:text-base"
            >
              Play Now
            </button>
            <button className="px-6 md:px-10 py-3 md:py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl font-black hover:bg-white/20 transition-all text-sm md:text-base">
              Details
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Recommended Tracks Grid */}
    <section className="px-6 md:px-10 py-6 md:py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">Recommended Tracks</h2>
        <button 
          onClick={() => setActiveTab("Recommended")}
          className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {isLoadingRecommended ? (
          // Loading skeleton
          Array(6).fill(0).map((_, i) => (
            <div key={`skeleton-${i}`} className="group relative flex flex-col p-3 md:p-4 bg-white/5 border border-white/10 rounded-[24px] md:rounded-[32px]">
              <div className="aspect-square bg-white/10 rounded-[18px] md:rounded-[24px] animate-pulse mb-3 md:mb-4" />
              <div className="px-1 md:px-2 space-y-2">
                <div className="h-4 bg-white/10 rounded animate-pulse" />
                <div className="h-3 bg-white/5 rounded animate-pulse w-2/3" />
              </div>
            </div>
          ))
        ) : recommendedSongs && recommendedSongs.length > 0 ? (
          recommendedSongs.slice(0, 6).map((song) => (
            <div 
              key={song.videoId} 
              className="group relative flex flex-col p-3 md:p-4 bg-white/5 border border-white/10 rounded-[24px] md:rounded-[32px] hover:bg-white/10 hover:border-white/20 transition-all duration-500"
            >
              <div className="relative aspect-square rounded-[18px] md:rounded-[24px] overflow-hidden mb-3 md:mb-4">
                <img src={song.thumbnail || song.image} alt={song.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                
                {/* Overlay Background - Only on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Play Button - Center, only on hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay({ ...song, thumbnail: song.thumbnail || song.image });
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
                    setSelectedSongForMood({ ...song, thumbnail: song.thumbnail || song.image });
                  }}
                  className="absolute bottom-2 right-2 w-6 h-6 md:w-7 md:h-7 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 z-20"
                >
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="px-1 md:px-2 space-y-1">
                <h3 className="font-bold text-sm md:text-lg truncate group-hover:text-purple-400 transition-colors uppercase italic tracking-tighter">{song.title}</h3>
                <p className="text-[10px] md:text-sm text-gray-500 font-medium truncate uppercase">
                  {song.artist?.name || song.artist || song.author?.name || song.channelTitle || "Unknown Artist"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No recommended tracks available</p>
          </div>
        )}
      </div>
    </section>

    {/* Top Charts / Table List */}
    <section className="px-6 md:px-10 py-6 md:py-10 pb-32 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic underline decoration-purple-500/50 underline-offset-8">Top Charts</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-white/5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 bg-white/5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {playHistory && playHistory.length > 0 ? (
          playHistory.slice(0, 4).map((song, index) => (
          <div 
            key={song.videoId} 
            className="group relative flex items-center gap-4 md:gap-6 p-3 md:p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all"
          >
            <span className="text-xs md:text-sm font-black text-gray-600 group-hover:text-purple-500 transition-colors w-6">{String(index + 1).padStart(2, "0")}</span>
            <div 
              onClick={() => handlePlay(song)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shrink-0 cursor-pointer hover:scale-110 transition-transform"
            >
              <img src={song.thumbnail || song.image} alt={song.title} className="w-full h-full object-cover" />
            </div>
            <div 
              onClick={() => handlePlay(song)}
              className="flex-1 min-w-0 cursor-pointer"
            >
              <p className="text-sm md:text-base font-bold truncate group-hover:text-purple-400 transition-colors uppercase italic">{song.title}</p>
              <p className="text-[10px] md:text-xs text-gray-500 truncate uppercase">
                {song.artist?.name || song.artist || song.author?.name || song.channelTitle || "Unknown Artist"}
              </p>
            </div>
            <p className="hidden sm:block text-[10px] md:text-xs font-medium text-gray-600">Recently Played</p>
            <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold text-gray-400">
              <span>{formatISO8601Duration(song.duration)}</span>
              
              {/* Add to Mood Button - Always visible */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSongForMood(song);
                }}
                className="w-7 h-7 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              
              {/* Options Menu - Only on hover */}
              <button className="p-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          </div>
        ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-lg font-medium">No songs played yet</p>
              <p className="text-gray-500 text-sm mt-1">Start playing songs to see your recent history here</p>
            </div>
          </div>
        )}
      </div>
    </section>
    {/* Add to Mood Modal */}
    {selectedSongForMood && (
      <AddToMoodModal
        song={selectedSongForMood}
        onClose={() => setSelectedSongForMood(null)}
      />
    )}
  </div>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading: authLoading } = useSelector((state) => state.auth);
  const { currentSong, isPlaying, playedSeconds, durationSeconds, volume, playHistory } = useSelector((state) => state.music);
  const { top100 } = useSelector((state) => state.search);
  const [activeTab, setActiveTab] = useState("Home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlayerFullScreen, setIsPlayerFullScreen] = useState(false);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fetch recommended songs
  useEffect(() => {
    const fetchRecommended = async () => {
      setIsLoadingRecommended(true);
      try {
        await dispatch(getTop100SongsAction("IN"));
      } catch (error) {
        console.error("Error fetching recommended songs:", error);
      } finally {
        setIsLoadingRecommended(false);
      }
    };
    fetchRecommended();
  }, [dispatch]);

  // Update recommended songs when top100 changes
  useEffect(() => {
    if (top100 && top100.length > 0) {
      setRecommendedSongs(top100);
      setIsLoadingRecommended(false);
    }
  }, [top100]);

  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <div className="absolute inset-0 bg-purple-500/20 blur-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden flex">
      {/* Background Animated Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px] animate-pulse"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            bottom: "10%",
            right: "10%",
            transform: `translate(${mousePosition.x * -0.1}px, ${mousePosition.y * -0.1}px)`,
          }}
        />
      </div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <GlobalPlayer />

      {/* Main Content */}
      <main className="relative z-10 flex-1 h-screen overflow-y-auto custom-scrollbar pb-28">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-10 py-6 bg-black/50 backdrop-blur-xl border-b border-white/5">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for tracks, artists..."
                onFocus={() => setActiveTab("Songs")}
                className="w-full pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-black" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-sm font-bold text-white uppercase tracking-wider">{user?.name || "Guest User"}</p>
                <p className="text-xs text-purple-400">Premium Member</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-0.5 shadow-xl">
                <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center overflow-hidden">
                  {user?.picture ? (
                    <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                      {user?.name?.charAt(0) || "G"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content View Switching */}
        {activeTab === "Home" && (
          <HomePage 
            mousePosition={mousePosition} 
            handlePlay={(song) => dispatch(setCurrentSong(song))} 
            setActiveTab={setActiveTab}
            recommendedSongs={recommendedSongs}
            isLoadingRecommended={isLoadingRecommended}
            playHistory={playHistory || []}
          />
        )}
        {activeTab === "Songs" && <SearchPage />}
        {activeTab === "Library" && <LibraryPage />}
        {activeTab === "Recommended" && <RecommendedPage setActiveTab={setActiveTab} />}
      </main>

      {/* Persistent Bottom Player */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 h-28 bg-black/60 backdrop-blur-3xl border-t border-white/10 px-8 flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer bg-white/5">
            {currentSong ? (
              <img src={currentSong.thumbnail} alt="Playing" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-700 font-black italic">N/A</div>
            )}
            <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col max-w-[150px]">
            <h4 className="font-black text-lg truncate tracking-tight uppercase italic">{currentSong?.title || "No Song Selected"}</h4>
            <p className="text-sm text-purple-400 font-bold tracking-wider uppercase opacity-80 truncate">{currentSong?.artist || "Pick a track to play"}</p>
          </div>
          {currentSong && (
            <button className="ml-4 p-2 text-pink-500 hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-3 flex-1 max-w-2xl px-12">
          <div className="flex items-center gap-10">
            <button className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h3a1 1 0 001-1V5a1 1 0 00-1-1H5zM11 4a1 1 0 00-1 1v10a1 1 0 001 1h3a1 1 0 001-1V5a1 1 0 00-1-1h-3z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-8 h-8 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l7-4a1 1 0 000-1.664l-7-4A1 1 0 0010 6v2.798L4.555 5.168z" />
              </svg>
            </button>
            <button 
              onClick={() => dispatch(togglePlay())}
              disabled={!currentSong}
              className={`w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-2xl shadow-white/20 group ${!currentSong ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg className="w-8 h-8 transform group-active:scale-95 transition-transform translate-x-0.5" fill="currentColor" viewBox="0 0 20 20">
                {isPlaying ? (
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                )}
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l7-4a1 1 0 000-1.664l-7-4A1 1 0 0010 6v2.798L4.555 5.168z" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>
          </div>
          
          <div className="w-full flex items-center gap-4 group">
            <span className="text-[10px] font-black text-gray-500 tracking-widest">{formatTime(playedSeconds)}</span>
            <div className="relative flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group/progress">
              <input 
                type="range"
                min="0"
                max={durationSeconds || 0}
                step="1"
                value={playedSeconds || 0}
                onChange={(e) => dispatch(setSeekTo(parseFloat(e.target.value)))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all group-hover/progress:from-purple-400 group-hover/progress:to-pink-400" 
                style={{ width: `${(playedSeconds / durationSeconds) * 100 || 0}%` }}
              />
            </div>
            <span className="text-[10px] font-black text-gray-400 tracking-widest">{formatTime(durationSeconds)}</span>
          </div>
        </div>

        {/* Volume & Misc */}
        <div className="flex items-center justify-end gap-6 w-1/4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <div className="flex items-center gap-3 group w-32 relative">
            <button 
              onClick={() => dispatch(setVolume(volume === 0 ? 0.8 : 0))}
              className="text-gray-400 group-hover:text-purple-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                {volume === 0 ? (
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 14.657a1 1 0 01-1.414-1.414A5 5 0 0013 7.414a1 1 0 011.414-1.414 7 7 0 010 8.657z" clipRule="evenodd" />
                )}
              </svg>
            </button>
            <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden cursor-pointer group/vol">
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={(e) => dispatch(setVolume(parseFloat(e.target.value)))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                className="h-full bg-white group-hover:bg-purple-500 transition-colors" 
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
          <button 
            onClick={() => setIsPlayerFullScreen(true)}
            className="p-2.5 bg-white/10 border border-white/10 rounded-xl hover:bg-white/20 transition-all text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </footer>

      {/* Full Page Player Overlay */}
      {isPlayerFullScreen && currentSong && (
        <FullPagePlayer 
          song={currentSong} 
          onClose={() => setIsPlayerFullScreen(false)} 
        />
      )}

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
        .shadow-glow {
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.6);
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}
