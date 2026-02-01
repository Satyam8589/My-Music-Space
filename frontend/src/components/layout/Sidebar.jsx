"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/config/redux/action/authAction";

const menuItems = [
  { name: "Home", icon: <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /> },
  { name: "Songs", icon: <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /> },
  { name: "Library", icon: <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /> },
  { name: "Recommended", icon: <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /> },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push("/login");
  };

  return (
    <aside 
      className={`relative z-20 bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col h-screen transition-all duration-500 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform z-30"
      >
        <svg 
          className={`w-4 h-4 text-white transition-transform duration-500 ${isCollapsed ? "rotate-180" : ""}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Logo Section */}
      <div className={`p-8 flex items-center gap-3 overflow-hidden ${isCollapsed ? "justify-center px-0" : ""}`}>
        <div className="min-w-[40px] w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
          </svg>
        </div>
        {!isCollapsed && (
          <span className="text-xl font-bold tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500">
            MusicSpace
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative ${
              activeTab === item.name
                ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 text-white shadow-xl shadow-purple-500/10"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            } ${isCollapsed ? "justify-center px-0" : ""}`}
            title={isCollapsed ? item.name : ""}
          >
            <svg 
              className={`w-5 h-5 shrink-0 transition-colors ${
                activeTab === item.name ? "text-purple-400" : "group-hover:text-purple-400"
              }`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              {item.icon}
            </svg>
            {!isCollapsed && (
              <span className="font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500">
                {item.name}
              </span>
            )}
            {activeTab === item.name && (
              <div className={`absolute rounded-full bg-purple-500 shadow-glow transition-all duration-500 ${
                isCollapsed ? "right-2 w-1.5 h-1.5" : "ml-auto w-1.5 h-1.5 relative right-0"
              }`} />
            )}
          </button>
        ))}

        {/* Logout Button moved inside nav */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300 group ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
          title={isCollapsed ? "Logout" : ""}
        >
          <svg className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && (
            <span className="font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500">
              Logout
            </span>
          )}
        </button>
      </nav>



      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.6);
        }
      `}</style>
    </aside>
  );
}
