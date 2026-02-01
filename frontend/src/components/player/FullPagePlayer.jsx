"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import { togglePlay, setIsVideoMode, setSeekTo, setProgress } from "@/config/redux/reducer/musicReducer";

export default function FullPagePlayer({ song, onClose }) {
  const [isLiked, setIsLiked] = useState(false);
  const [mode, setMode] = useState("audio");
  const [progress, setProgressState] = useState(35);
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { isPlaying, playedSeconds, durationSeconds } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(setIsVideoMode(mode === "video"));
  }, [mode, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setIsVideoMode(false));
    };
  }, [dispatch]);

  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!song) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#080808] text-white animate-in fade-in zoom-in-95 duration-700 overflow-hidden font-sans select-none">
      
      {/* 1. Ultra-Premium Immersive Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Meshes */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-purple-600/10 blur-[150px] animate-pulse duration-[8s]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-blue-600/10 blur-[150px] animate-pulse duration-[10s] delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-pink-600/5 blur-[120px] animate-pulse duration-[12s] delay-700" />
        
        {/* Noise/Grain Overlay for Texture */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* 2. Main Premium Content */}
      <div className="relative z-10 h-full w-full flex flex-col max-w-[1600px] mx-auto">
        
        {/* Precision Header */}
        <header className={`flex flex-col sm:flex-row items-center justify-between shrink-0 ${
          mode === 'video' ? 'px-4 md:px-6 py-2 md:py-3 gap-2' : 'px-6 md:px-10 py-4 md:py-6 gap-4 sm:gap-0'
        }`}>
          <button 
            onClick={onClose}
            className="group flex items-center gap-3 px-5 py-2.5 sm:px-7 sm:py-3.5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-500 border border-white/10 backdrop-blur-3xl shadow-2xl hover:scale-105 active:scale-95"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]">Minimize</span>
          </button>

          {/* Luxury Switcher */}
          <div className="flex bg-black/40 border border-white/5 p-1 rounded-[30px] backdrop-blur-3xl shadow-2xl relative scale-90 sm:scale-100">
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-[24px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-xl ${
                mode === 'audio' ? 'left-1.5' : 'left-[50%]'
              }`}
            />
            <button 
              onClick={() => setMode("audio")}
              className={`relative z-10 flex items-center gap-3 px-10 py-3 rounded-[24px] font-black text-xs uppercase tracking-widest transition-colors duration-500 ${
                mode === "audio" ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
              Audio
            </button>
            <button 
              onClick={() => setMode("video")}
              className={`relative z-10 flex items-center gap-3 px-10 py-3 rounded-[24px] font-black text-xs uppercase tracking-widest transition-colors duration-500 ${
                mode === "video" ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              Video
            </button>
          </div>

          <div className="w-40 hidden xl:block" />
        </header>

        {/* Balanced Centerpiece */}
        <main className={`flex-1 flex flex-col items-center min-h-0 px-4 md:px-10 ${
          mode === 'video' ? 'overflow-y-auto justify-start pt-2' : 'overflow-hidden justify-center py-2'
        }`}>
          
          <div className={`w-full h-full flex flex-col lg:flex-row items-center justify-center ${mode === 'video' ? 'gap-8 lg:gap-16' : 'gap-10 lg:gap-28'} transition-all duration-1000 max-w-[1600px]`}>
            
            <div className={`relative transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0 ${
              mode === 'audio' 
                ? 'w-full sm:w-3/4 lg:w-1/2 aspect-square max-w-[320px] md:max-w-[420px]' 
                : 'w-full lg:w-[60%] max-w-[900px] lg:max-w-[1000px]'
            }`}>
              {mode === "audio" ? (
                <div className="relative w-full h-full group perspective-2000">
                  <div 
                    onClick={() => dispatch(togglePlay())}
                    className="w-full h-full rounded-[64px] overflow-hidden shadow-[0_60px_120px_-25px_rgba(0,0,0,0.8)] transform transition-transform duration-[1.5s] ease-out group-hover:rotate-y-12 group-hover:rotate-x-6 group-hover:scale-105 border border-white/5 cursor-pointer relative"
                  >
                    <img 
                      src={song.image || song.thumbnail} 
                      alt={song.title} 
                      className="w-full h-full object-cover"
                    />
                    {/* Gloss & Interactive Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-60" />

                    {/* Center Play/Pause Button on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center shadow-2xl">
                        <svg className="w-12 h-12 text-white fill-current" viewBox="0 0 20 20">
                          {isPlaying ? (
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          )}
                        </svg>
                      </div>
                    </div>
                    
                    {/* Animated Visualizer Bars */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-16 pointer-events-none">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div 
                          key={i}
                          className={`w-1.5 bg-white/80 rounded-full transition-all duration-500 ${isPlaying ? 'animate-sound-bar' : 'h-2'}`}
                          style={{ 
                            animationDelay: `${i * 0.1}s`,
                            height: isPlaying ? '100%' : '8px',
                            opacity: isPlaying ? 0.8 : 0.3
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Aura Glow */}
                  <div className="absolute -inset-16 bg-gradient-to-br from-purple-500/30 via-transparent to-blue-500/30 blur-[100px] -z-10 opacity-100" />
                </div>
              ) : (
                <div 
                  onClick={() => dispatch(togglePlay())}
                  className="relative w-full aspect-video rounded-[32px] md:rounded-[48px] overflow-hidden bg-black border border-white/10 shadow-[0_80px_160px_-30px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-110 duration-1000 cursor-pointer group/video"
                >
                  <div className="absolute inset-0 w-[108%] h-[150%] top-[-25%] left-[-4%] pointer-events-none">
                    <ReactPlayer
                      ref={playerRef}
                      url={`https://www.youtube.com/watch?v=${song.videoId}`}
                      playing={isPlaying}
                      width="100%"
                      height="100%"
                      onProgress={(state) => {
                        dispatch(setProgress({
                          playedSeconds: state.playedSeconds,
                          durationSeconds: playerRef.current ? playerRef.current.getDuration() : 0,
                        }));
                      }}
                      config={{
                        youtube: {
                          playerVars: { 
                            autoplay: 1,
                            controls: 0,
                            modestbranding: 1,
                            rel: 0,
                            iv_load_policy: 3,
                            showinfo: 0,
                            disablekb: 1
                          }
                        }
                      }}
                    />
                  </div>

                  {/* Play/Pause Overlay Feedback */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity pointer-events-none">
                    <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 transform scale-75 group-active/video:scale-100 transition-transform">
                      <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 20 20">
                        {isPlaying ? (
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        ) : (
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Cinematic Typography Section */}
            <div className={`flex flex-col items-center lg:items-start transition-all duration-700 w-full shrink-0 ${
              mode === 'video' ? 'lg:flex-1' : 'flex-1 max-w-4xl'
            }`}>
              <div className={`w-full max-w-4xl ${mode === 'video' ? 'space-y-4 md:space-y-6' : 'space-y-10'}`}>
                <div className={`${mode === 'video' ? 'space-y-4 md:space-y-6' : 'space-y-6'}`}>
                  <div className="flex items-center gap-4 animate-in slide-in-from-left-4 duration-1000">
                    <span className="h-[2px] w-12 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-purple-400 opacity-80">Listening Now</span>
                  </div>
                  <div className={`flex-1 min-w-0 w-full overflow-hidden text-center lg:text-left ${
                    mode === 'video' ? 'space-y-3 md:space-y-4' : 'space-y-4 md:space-y-6'
                  }`}>
                    <h1 className={`font-black tracking-tighter italic leading-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] break-words ${
                      mode === 'video' 
                        ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl line-clamp-2' 
                        : 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl line-clamp-2'
                    }`}>
                      {song.title}
                    </h1>
                    <p className={`font-bold text-gray-500 uppercase font-sans opacity-60 ${
                      mode === 'video'
                        ? 'text-sm md:text-base lg:text-lg tracking-[0.15em] truncate'
                        : 'text-lg md:text-2xl tracking-[0.2em] md:tracking-[0.3em] mt-2 md:mt-4 truncate'
                    }`}>
                      {song.artist}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>

        {/* 3. Luxury Playback Console */}
        <footer className="w-full px-4 md:px-10 pb-4 md:pb-8 space-y-4 md:space-y-6 shrink-0">
          
          {/* Animated Progress Group */}
          <div className="max-w-[1100px] mx-auto space-y-3 md:space-y-4">
            <div className="relative group cursor-pointer h-8 flex items-center">
              <input 
                type="range"
                min="0"
                max={durationSeconds || 0}
                step="1"
                value={playedSeconds || 0}
                onChange={(e) => dispatch(setSeekTo(parseFloat(e.target.value)))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
              />
              <div className="h-2.5 w-full bg-white/5 rounded-full backdrop-blur-3xl relative overflow-hidden ring-1 ring-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-[length:200%_100%] animate-shimmer shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all duration-300" 
                  style={{ width: `${(playedSeconds / durationSeconds) * 100 || 0}%` }}
                />
              </div>
              {/* Floating Scrub Indicator */}
              <div 
                className="absolute w-6 h-6 bg-white rounded-full shadow-[0_0_20px_white] scale-0 group-hover:scale-100 transition-transform duration-300 delay-75"
                style={{ left: `${(playedSeconds / durationSeconds) * 100 || 0}%`, marginLeft: '-12px' }}
              />
            </div>
            <div className="flex justify-between items-center px-2">
              <span className="text-[12px] font-black text-gray-500 uppercase tracking-[0.3em]">{formatTime(playedSeconds)}</span>
              <div className="flex-1 mx-12 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-[12px] font-black text-white uppercase tracking-[0.3em]">{formatTime(durationSeconds)}</span>
            </div>
          </div>


        </footer>
      </div>

      <style jsx>{`
        @keyframes sound-bar {
          0%, 100% { height: 15%; }
          50% { height: 100%; }
        }
        .animate-sound-bar {
          animation: sound-bar 1.2s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 4s linear infinite;
        }
        .perspective-2000 { perspective: 2000px; }
        .rotate-y-12 { transform: rotateY(12deg); }
        .rotate-x-6 { transform: rotateX(6deg); }
      `}</style>
    </div>
  );
}
