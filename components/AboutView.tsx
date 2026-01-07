import React from 'react';
import Logo from './Logo';
import { Target, Users, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';

const AboutView: React.FC = () => {
  return (
    <div className="pb-20 bg-brand-charcoal text-white border-t border-white/5 overflow-hidden">
      {/* HERO HEADER */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-reveal className="scroll-reveal reveal-left">
            <h1 className="hero-title select-none">
              <span className="brand-text-heavy text-white uppercase leading-none block mb-2 hover:text-brand-gold transition-colors duration-500 cursor-default">The Purpose</span>
              <span className="brand-text-heavy text-brand-gold uppercase leading-none block hover:scale-[1.02] transition-transform origin-left cursor-default">HomeHunt AR</span>
            </h1>
            
            <p className="max-w-md text-white/50 font-black uppercase tracking-widest text-xs mt-8 leading-relaxed italic">
              We are a spatial intelligence agency dedicated to redefining how Canadians discover their future sanctuaries.
            </p>
          </div>

          <div data-reveal className="scroll-reveal reveal-right delay-200 hidden lg:flex justify-end animate-reveal [animation-delay:200ms]">
            <div className="w-48 h-48 p-10 bg-brand-darker rounded-[3rem] border border-white/5 backdrop-blur-3xl flex items-center justify-center text-brand-gold group hover:border-brand-gold transition-all">
               <Logo strokeColor="currentColor" className="w-full h-full opacity-30 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="max-w-[1700px] mx-auto px-8 lg:px-16 mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div data-reveal className="scroll-reveal reveal-left bg-brand-darker border border-white/5 p-10 rounded-[2.5rem] shadow-2xl space-y-6 group">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
               <AlertCircle size={24} className="text-red-500/60 group-hover:text-red-500 transition-colors" />
               <h3 className="text-lg font-black uppercase tracking-tighter text-white/60 group-hover:text-white transition-colors">THE FRICTION</h3>
            </div>
            <ul className="space-y-4">
              {[
                "PROPERTY SEARCH IS DISCONNECTED FROM REALITY.",
                "BUYERS SCROLL ENDLESSLY THROUGH 2D LISTINGS.",
                "VACANT UNITS FEEL COLD AND UNINSPIRING."
              ].map((text, i) => (
                <li key={i} className="flex gap-3 items-start text-sm font-black text-white/30 uppercase tracking-tighter italic">
                  <span className="text-brand-gold mt-1">•</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="scroll-reveal reveal-right delay-200 bg-brand-gold p-10 rounded-[2.5rem] shadow-2xl space-y-6 group">
            <div className="flex items-center gap-3 border-b border-black/10 pb-4">
               <CheckCircle size={24} className="text-black group-hover:scale-110 transition-transform" />
               <h3 className="text-lg font-black uppercase tracking-tighter text-black">OUR ENGINE</h3>
            </div>
            <ul className="space-y-4">
              {[
                "WALK THROUGH NEIGHBORHOODS VIA AR OVERLAYS.",
                "INSTANT CONTEXTUAL PROPERTY DISCOVERY.",
                "AI-POWERED STAGING TO VISUALIZE THE FUTURE."
              ].map((text, i) => (
                <li key={i} className="flex gap-3 items-start text-sm font-black text-black uppercase tracking-tighter italic">
                  <span className="mt-1">•</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutView;