"use client";

import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { setIsPlaying, setProgress, clearSeekTo } from "@/config/redux/reducer/musicReducer";

export default function GlobalPlayer() {
  const [hasMounted, setHasMounted] = useState(false);
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { currentSong, isPlaying, isVideoMode, volume, seekTo } = useSelector((state) => state.music);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && seekTo !== null && playerRef.current) {
      playerRef.current.seekTo(seekTo);
      dispatch(clearSeekTo());
    }
  }, [seekTo, dispatch, hasMounted]);

  if (typeof window === "undefined" || !hasMounted) return null;

  const handleProgress = (state) => {
    dispatch(setProgress({
      playedSeconds: state.playedSeconds,
      durationSeconds: playerRef.current ? playerRef.current.getDuration() : 0,
    }));
  };

  const handleEnded = () => {
    dispatch(setIsPlaying(false));
  };

  const handleError = (e) => {
    console.error("YouTube Player Error:", e);
  };

  const handleDuration = (duration) => {
    dispatch(setProgress({
      playedSeconds: 0,
      durationSeconds: duration,
    }));
  };

  return (
    <div className="fixed -left-[1000px] top-0 w-[300px] h-[200px] opacity-[0.01] pointer-events-none -z-[100] overflow-hidden">
      {currentSong && (
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${currentSong.videoId}`}
          playing={isPlaying && !isVideoMode}
          volume={volume}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          onError={(e) => {
            console.error("YouTube Player Error Component:", e);
            handleError(e);
          }}
          onReady={() => console.log("YouTube Player: Ready")}
          onBuffer={() => console.log("YouTube Player: Buffering...")}
          onStart={() => console.log("YouTube Player: Playback Started")}
          onPlay={() => console.log("YouTube Player: Playing")}
          onPause={() => console.log("YouTube Player: Paused")}
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: { 
                autoplay: 1,
                modestbranding: 1,
                controls: 0,
                playsinline: 1,
                fs: 0,
                iv_load_policy: 3,
                rel: 0
              }
            }
          }}
        />
      )}
    </div>
  );
}
