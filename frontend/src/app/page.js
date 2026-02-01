"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated 3D Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs with 3D effect */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl animate-float"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, #ec4899 50%, transparent 70%)",
            top: "10%",
            left: "10%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl animate-float-delayed"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, #3b82f6 50%, transparent 70%)",
            top: "50%",
            right: "10%",
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-30 blur-3xl animate-float-slow"
          style={{
            background: "radial-gradient(circle, #f59e0b 0%, #ef4444 50%, transparent 70%)",
            bottom: "10%",
            left: "40%",
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `perspective(1000px) rotateX(60deg) translateZ(-100px)`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-purple-500/50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
            <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
            My Music Space
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="relative px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-medium group overflow-hidden"
            >
              <span className="relative z-10">Dashboard</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="relative px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-medium group overflow-hidden"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => router.push("/register")}
                className="relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-medium shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-20">
        <div className="text-center space-y-10">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Your Personal Music Universe
            </span>
          </div>

          {/* 3D Main Heading */}
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-black leading-tight perspective-1000">
              <div className="relative inline-block">
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x transform hover:scale-105 transition-transform duration-300"
                  style={{
                    textShadow: "0 0 80px rgba(168, 85, 247, 0.5)",
                  }}
                >
                  Discover Music
                </span>
              </div>
              <br />
              <div className="relative inline-block mt-4">
                <span className="block text-white transform hover:scale-105 transition-transform duration-300"
                  style={{
                    textShadow: "0 10px 40px rgba(0, 0, 0, 0.8), 0 0 80px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  That Moves You
                </span>
              </div>
            </h1>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-500 rounded-full blur-3xl opacity-50 animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-pink-500 rounded-full blur-3xl opacity-50 animate-pulse animation-delay-1000" />
          </div>

          {/* Subheading with Typewriter Effect */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Create <span className="text-purple-400 font-semibold">mood-based playlists</span>, explore{" "}
            <span className="text-pink-400 font-semibold">trending tracks</span>, and enjoy{" "}
            <span className="text-blue-400 font-semibold">personalized recommendations</span> powered by YouTube.
          </p>

          {/* 3D CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button
              onClick={() => router.push(isAuthenticated ? "/dashboard" : "/register")}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              style={{
                boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4), 0 0 40px rgba(236, 72, 153, 0.3)",
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Start Listening Free
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity animate-gradient-x" />
            </button>
            
            <button
              onClick={() => router.push("/login")}
              className="group relative px-10 py-5 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/30 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Explore Features
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* 3D Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {[
            {
              icon: (
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              ),
              gradient: "from-purple-500 to-pink-500",
              title: "Mood Spaces",
              description: "Organize your music by mood. Create custom spaces for every feeling and moment.",
              delay: "0ms",
            },
            {
              icon: (
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              ),
              gradient: "from-blue-500 to-cyan-500",
              title: "Smart Search",
              description: "Find any song instantly with our powerful YouTube-powered search engine.",
              delay: "100ms",
            },
            {
              icon: (
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              ),
              gradient: "from-orange-500 to-red-500",
              title: "Top Charts",
              description: "Stay updated with trending music from around the world. Discover what's hot.",
              delay: "200ms",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
              style={{
                animationDelay: feature.delay,
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity`} />
                <svg className="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  {feature.icon}
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Animated Stats Section */}
        <div className="grid md:grid-cols-3 gap-12 mt-32">
          {[
            { number: "10M+", label: "Songs Available", gradient: "from-purple-400 to-pink-400" },
            { number: "100+", label: "Countries Supported", gradient: "from-blue-400 to-cyan-400" },
            { number: "24/7", label: "Music Streaming", gradient: "from-orange-400 to-red-400" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group text-center space-y-4 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transform hover:scale-110 transition-all duration-500 cursor-pointer"
            >
              <div className={`text-6xl md:text-7xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500`}
                style={{
                  textShadow: "0 0 60px rgba(168, 85, 247, 0.3)",
                }}
              >
                {stat.number}
              </div>
              <div className="text-gray-400 text-lg font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Popular Songs Carousel */}
        <div className="mt-32 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Trending Now
            </h2>
            <p className="text-gray-400 text-lg">
              Discover what's hot around the world
            </p>
          </div>

          {/* Infinite Scroll Container */}
          <div className="relative overflow-hidden py-8">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

            {/* Scrolling Track */}
            <div 
              className="flex gap-6"
              style={{
                animation: 'scroll-left 25s linear infinite',
              }}
            >
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 shrink-0">
                  {[
                    {
                      title: "Blinding Lights",
                      artist: "The Weeknd",
                      image: "/api/placeholder/400/400",
                      plays: "2.8B",
                    },
                    {
                      title: "Shape of You",
                      artist: "Ed Sheeran",
                      image: "/api/placeholder/400/400",
                      plays: "3.2B",
                    },
                    {
                      title: "Levitating",
                      artist: "Dua Lipa",
                      image: "/api/placeholder/400/400",
                      plays: "1.9B",
                    },
                    {
                      title: "Starboy",
                      artist: "The Weeknd",
                      image: "/api/placeholder/400/400",
                      plays: "2.1B",
                    },
                    {
                      title: "Bad Guy",
                      artist: "Billie Eilish",
                      image: "/api/placeholder/400/400",
                      plays: "1.7B",
                    },
                    {
                      title: "Peaches",
                      artist: "Justin Bieber",
                      image: "/api/placeholder/400/400",
                      plays: "1.5B",
                    },
                    {
                      title: "Stay",
                      artist: "The Kid LAROI",
                      image: "/api/placeholder/400/400",
                      plays: "1.8B",
                    },
                    {
                      title: "Heat Waves",
                      artist: "Glass Animals",
                      image: "/api/placeholder/400/400",
                      plays: "1.6B",
                    },
                  ].map((song, index) => (
                    <div
                      key={`${setIndex}-${index}`}
                      className="group relative w-64 h-80 rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 shrink-0"
                      style={{
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      {/* Album Cover Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('https://picsum.photos/seed/${song.title.replace(/\s/g, '')}/400/400')`,
                        }}
                      />
                      
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-between p-6">
                        {/* Top Section */}
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                            </svg>
                          </div>
                          <div className="px-3 py-1 bg-white/20 backdrop-blur-xl rounded-full text-xs font-semibold text-white">
                            {song.plays} plays
                          </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="space-y-3">
                          {/* Play Button */}
                          <div className="flex justify-center mb-4">
                            <button className="w-16 h-16 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/40 hover:scale-110 transition-all duration-300 group-hover:shadow-2xl">
                              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                              </svg>
                            </button>
                          </div>

                          {/* Song Info */}
                          <div className="text-center space-y-1">
                            <h3 className="text-xl font-bold text-white truncate">
                              {song.title}
                            </h3>
                            <p className="text-white/80 text-sm truncate">
                              {song.artist}
                            </p>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-white/60 rounded-full" />
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-32 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-purple-500/50">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
              </div>
              <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Music Space
              </span>
            </div>
            
            <div className="text-gray-400 text-sm">
              © 2026 My Music Space. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Contact"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 25px) scale(1.05); }
          66% { transform: translate(25px, -25px) scale(0.95); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -15px) scale(1.03); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
        .animation-delay-1000 { animation-delay: 1s; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
}
