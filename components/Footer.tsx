import React from 'react';
import { AppView } from '../types';
import Logo from './Logo';
import { Instagram, Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-darker text-white pt-20 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(AppView.HOME)}>
              <Logo className="w-8 h-8" strokeColor="var(--brand-gold)" />
              <span className="text-xl font-bold tracking-tighter uppercase italic">HOME HUNT <span className="text-brand-gold not-italic">AR</span></span>
            </div>
            <p className="text-white/40 leading-relaxed max-w-sm text-sm font-medium uppercase tracking-tight">
              Leading the spatial property revolution across the Canadian landscape. Discover your future home today.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-brand-gold">Navigation</h4>
            <ul className="space-y-3 text-white/50 font-bold text-[10px] uppercase tracking-widest">
              <li><button onClick={() => onNavigate(AppView.ABOUT)} className="hover:text-brand-gold transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate(AppView.HOME)} className="hover:text-brand-gold transition-colors">Properties</button></li>
              <li><button onClick={() => onNavigate(AppView.CONTACT)} className="hover:text-brand-gold transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Column 3: Tools */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-brand-gold">AI Suite</h4>
            <ul className="space-y-3 text-white/50 font-bold text-[10px] uppercase tracking-widest">
              <li><button onClick={() => onNavigate(AppView.CHAT)} className="hover:text-brand-gold transition-colors">Strategist</button></li>
              <li><button onClick={() => onNavigate(AppView.IMAGE)} className="hover:text-brand-gold transition-colors">Designer</button></li>
              <li><button onClick={() => onNavigate(AppView.VOICE)} className="hover:text-brand-gold transition-colors">Concierge</button></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-brand-gold">Connect</h4>
            <ul className="space-y-4 text-white/50 font-bold text-[10px] uppercase tracking-widest">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-brand-gold" />
                <span>hello@homehuntar.ca</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-gold" />
                <span>Toronto, ON, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">© 2025 Home Hunt AR. All rights reserved.</p>
          <div className="flex gap-5">
            <Linkedin size={18} className="text-white/20 hover:text-brand-gold cursor-pointer transition-colors" />
            <Instagram size={18} className="text-white/20 hover:text-brand-gold cursor-pointer transition-colors" />
            <Twitter size={18} className="text-white/20 hover:text-brand-gold cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;