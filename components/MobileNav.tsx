import React from 'react';
import { AppView } from '../types';
import Logo from './Logo';
import { Home, User } from 'lucide-react';

interface MobileNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden">
      <div className="bg-[#1a1a1a] border-t border-white/5 px-10 py-4 flex justify-between items-center relative">
        {/* Properties/Home Link */}
        <button 
          onClick={() => onNavigate(AppView.HOME)}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === AppView.HOME ? 'text-brand-gold' : 'text-slate-500'}`}
        >
          <Home size={24} />
          <span className="text-[10px] font-black uppercase tracking-widest">Properties</span>
        </button>

        {/* Floating Center Button */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <button 
            onClick={() => onNavigate(AppView.NRP)}
            className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center shadow-2xl border-4 border-[#1a1a1a] active:scale-90 transition-transform"
          >
            <Logo strokeColor="#1a1a1a" className="w-8 h-8" />
          </button>
        </div>

        {/* Profile Link */}
        <button 
          onClick={() => onNavigate(AppView.PROFILE)}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === AppView.PROFILE ? 'text-brand-gold' : 'text-slate-500'}`}
        >
          <User size={24} />
          <span className="text-[10px] font-black uppercase tracking-widest">My Profile</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNav;