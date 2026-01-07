import React from 'react';
import { AppView } from '../types';
import { Smartphone, Box, Glasses, MousePointer2, Monitor, Database, ArrowRight } from 'lucide-react';

interface NRPHubProps {
  onLaunchTool: (view: AppView) => void;
}

const NRPHub: React.FC<NRPHubProps> = ({ onLaunchTool }) => {
  const tools = [
    { 
        id: AppView.CHAT, 
        icon: Smartphone, 
        name: "AR HOME SAFARI", 
        desc: "EXPLORE PROPERTIES AS YOU WALK THROUGH NEIGHBORHOODS, WITH REAL-TIME AR OVERLAYS.",
        reveal: "reveal-left"
    },
    { 
        id: AppView.IMAGE, 
        icon: Box, 
        name: "3D VISUALIZATION", 
        desc: "VISUALIZE UNBUILT BUILDINGS IN THEIR ACTUAL LOCATIONS WITH HI-FI 3D MODELS.",
        reveal: "reveal-zoom"
    },
    { 
        id: AppView.VIDEO, 
        icon: Glasses, 
        name: "INTERIOR AI STAGING", 
        desc: "TRANSFORM BLANK SPACES INTO BEAUTIFULLY FURNISHED HOMES THROUGH YOUR PHONE LENS.",
        reveal: "reveal-right"
    },
    { 
        id: AppView.VOICE, 
        icon: MousePointer2, 
        name: "AR AD NETWORK", 
        desc: "LOCALIZED AR ADVERTISING FOR BUSINESSES INTEGRATED DIRECTLY INTO THE STREET VIEW.",
        reveal: "reveal-left"
    },
    { 
        id: AppView.CHAT, 
        icon: Monitor, 
        name: "REMOTE SEARCH", 
        desc: "BROWSE PROPERTIES FROM YOUR COUCH WITH IMMERSIVE STREET-LEVEL SIMULATIONS.",
        reveal: "reveal-zoom"
    },
    { 
        id: AppView.NRP, 
        icon: Database, 
        name: "AGENT PORTAL", 
        desc: "DEDICATED PLATFORM FOR AGENTS TO MANAGE LISTINGS AND TRACK CLIENT ENGAGEMENT.",
        reveal: "reveal-right"
    }
  ];

  return (
    <div className="bg-brand-charcoal min-h-screen pb-32 lg:pb-56 text-white overflow-hidden">
      {/* 1. HERO HEADER */}
      <section className="relative pt-32 lg:pt-60 pb-16 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 -left-20 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16 relative z-10">
          <div data-reveal className="scroll-reveal reveal-down">
            <h1 className="hero-title select-none">
              <span className="brand-text-heavy text-white uppercase leading-none block mb-4 hover:text-brand-gold transition-colors duration-500 cursor-default">Our Advanced</span>
              <span className="brand-text-heavy text-white uppercase leading-none block mb-4 hover:text-brand-gold transition-colors duration-500 cursor-default">Spatial Property</span>
              <span className="brand-text-heavy text-brand-gold uppercase leading-none block hover:scale-[1.02] transition-transform origin-left cursor-default">Services Suite</span>
            </h1>
            
            <p className="max-w-md text-slate-300 brand-text-heavy uppercase tracking-widest text-[14px] leading-relaxed opacity-80 mt-12 flex items-center gap-4 hover:text-brand-gold transition-colors cursor-default group">
              <div className="w-12 h-0.5 bg-brand-gold/30 group-hover:w-24 transition-all" />
              NEURAL REAL ESTATE PROTOCOL • SUITE 2.5
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1700px] mx-auto px-8 lg:px-16 mt-12 lg:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {tools.map((tool, idx) => (
            <div 
              key={idx} 
              data-reveal
              className={`scroll-reveal ${tool.reveal} delay-${(idx % 3) * 100} bg-[#262626] border border-white/5 p-10 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] flex flex-col justify-between h-[450px] lg:h-[500px] hover:bg-[#333333] hover:border-brand-gold transition-all cursor-pointer group shadow-2xl`}
              onClick={() => onLaunchTool(tool.id)}
            >
              <div className="space-y-8 lg:space-y-10">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-brand-gold text-black rounded-3xl flex items-center justify-center shadow-lg shadow-brand-gold/10 group-hover:rotate-6 transition-transform group-hover:bg-white">
                  <tool.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl brand-text-heavy uppercase tracking-tight mb-4 text-white group-hover:text-brand-gold transition-colors">{tool.name}</h3>
                  <p className="text-[11px] lg:text-[13px] brand-text-heavy text-slate-400 uppercase tracking-widest opacity-80 leading-relaxed group-hover:text-white transition-colors">
                    {tool.desc}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group-hover:gap-6 transition-all bg-[#1a1a1a] w-fit px-6 lg:px-8 py-3 lg:py-4 rounded-2xl border border-white/5 group-hover:border-brand-gold/40">
                <span className="text-[11px] lg:text-[13px] brand-text-heavy uppercase tracking-[0.3em] text-brand-gold group-hover:text-white transition-colors">LAUNCH MODULE</span>
                <ArrowRight size={18} className="text-brand-gold group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NRPHub;