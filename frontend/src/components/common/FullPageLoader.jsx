"use client";

import React from "react";

const FullPageLoader = ({ message = "Loading your music space..." }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Logo/Icon */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center transform animate-float shadow-2xl shadow-purple-500/50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur opacity-50 animate-pulse" />
            <svg className="w-12 h-12 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
          
          {/* Circular Rings */}
          <div className="absolute -inset-4 border-2 border-purple-500/20 rounded-full animate-[ping_3s_linear_infinite]" />
          <div className="absolute -inset-8 border-2 border-pink-500/10 rounded-full animate-[ping_3s_linear_infinite_1s]" />
          <div className="absolute -inset-12 border-2 border-purple-500/5 rounded-full animate-[ping_3s_linear_infinite_2s]" />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent italic tracking-tighter uppercase">
            {message}
          </h2>
          <div className="flex items-center justify-center gap-1.5">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(5px) rotate(-2deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FullPageLoader;
