import React from 'react';
import { AppView } from '../types';
import { Video, Mic, Search, Layers, Hexagon } from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: AppView.CHAT, icon: Search, label: 'Strategist' },
    { id: AppView.IMAGE, icon: Layers, label: 'Designer' },
    { id: AppView.VIDEO, icon: Video, label: 'Cinema' },
    { id: AppView.VOICE, icon: Mic, label: 'Concierge' },
  ];

  return (
    <aside className="w-20 lg:w-72 h-full flex flex-col bg-brand-darker/40 backdrop-blur-3xl glass-panel rounded-[2.5rem] overflow-hidden transition-all duration-500">
      <div className="p-8 mb-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center shadow-2xl shadow-brand-gold/20 group">
          <Hexagon className="w-6 h-6 text-black" />
        </div>
        <div className="hidden lg:block overflow-hidden whitespace-nowrap">
          <h1 className="font-black text-xl tracking-tighter text-white italic">HOME HUNT</h1>
          <p className="text-[9px] text-brand-gold font-black uppercase tracking-[0.3em] -mt-1 italic">ECOSYSTEM</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group relative overflow-hidden ${
                isActive 
                  ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' 
                  : 'text-white/30 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-transform ${isActive ? 'scale-110 text-brand-gold' : 'group-hover:scale-110'}`} />
              <span className="hidden lg:block font-black text-[10px] tracking-widest uppercase italic">{item.label}</span>
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-gold rounded-l-full shadow-[0_0_10px_rgba(255,165,0,0.5)]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="hidden lg:block bg-brand-charcoal/40 rounded-2xl p-5 border border-white/5 relative group cursor-pointer overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">Secure Link</span>
          </div>
          <p className="text-[10px] font-black text-white italic">Gemini 3 Pro <span className="text-brand-gold">v2.5</span></p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;