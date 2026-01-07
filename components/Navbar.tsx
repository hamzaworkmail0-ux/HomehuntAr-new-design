import React, { useState, useEffect } from 'react';
import { AppView } from '../types';
import Logo from './Logo';
import { Menu, ChevronDown, Linkedin, Instagram, Twitter, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Explore', view: AppView.HOME },
    { label: 'Buy', view: AppView.HOME, hasDropdown: true },
    { label: 'Rent', view: AppView.HOME },
    { label: 'Sell', view: AppView.HOME, hasDropdown: true },
    { label: 'Agents', view: AppView.HOME },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500">
      {/* Auxiliary Top Bar - Now following dark theme strictly */}
      <div className={`hidden lg:flex bg-brand-darker py-2 px-16 border-b border-white/5 justify-between items-center transition-all duration-500 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10 opacity-100'}`}>
         <div className="flex items-center gap-6 text-[11px] brand-text-heavy uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-2 hover:text-brand-gold transition-colors cursor-pointer">
               <Mail size={12} className="text-brand-gold" /> hello@homehuntar.ca
            </div>
            <div className="flex items-center gap-2 hover:text-brand-gold transition-colors cursor-pointer">
               <Phone size={12} className="text-brand-gold" /> +1 416.555.0199
            </div>
         </div>
         <div className="flex items-center gap-5">
            {[Linkedin, Instagram, Twitter].map((Icon, i) => (
              <Icon key={i} size={14} className="text-slate-400 hover:text-brand-gold cursor-pointer transition-colors" />
            ))}
         </div>
      </div>

      {/* Main Navbar - Switched from white to brand-charcoal background */}
      <nav className={`transition-all duration-300 flex items-center ${
        isScrolled ? 'bg-brand-charcoal/95 backdrop-blur-md shadow-2xl h-14 lg:h-16 border-b border-white/10' : 'bg-transparent h-20 lg:h-24'
      }`}>
        <div className="max-w-[1700px] mx-auto w-full px-5 lg:px-16 flex justify-between items-center gap-2 lg:gap-4">
          {/* Logo - Adjusted scaling for mobile to prevent overlap */}
          <div 
            className="flex items-center gap-2 lg:gap-3 cursor-pointer group shrink-0" 
            onClick={() => onNavigate(AppView.HOME)}
          >
            <div className="p-1.5 lg:p-2 rounded-xl bg-brand-gold text-black transition-transform group-hover:rotate-6">
              <Logo className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" strokeColor="black" />
            </div>
            <span className={`font-black tracking-tighter uppercase leading-none transition-all ${
              isScrolled ? 'text-sm sm:text-lg lg:text-xl' : 'text-base sm:text-xl lg:text-2xl'
            } text-white`}>
              HOME HUNT <span className="text-brand-gold">AR</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  className={`text-[12px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors ${
                    isScrolled ? 'text-slate-300 hover:text-brand-gold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={12} />}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 pl-8 border-l border-white/10">
              <button className={`text-[12px] font-bold uppercase tracking-widest transition-colors ${
                isScrolled ? 'text-white hover:text-brand-gold' : 'text-white'
              }`}>
                Sign In
              </button>
              <button className="bg-brand-gold text-black px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-xl hover:bg-white transition-all active:scale-95">
                List Property
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className={`lg:hidden p-2 text-white hover:text-brand-gold transition-colors flex items-center gap-2`}>
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Menu</span>
            <Menu size={22} className="sm:size-24" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;