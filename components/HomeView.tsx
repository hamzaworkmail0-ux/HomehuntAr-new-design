import React from 'react';
import { AppView } from '../types';
import { 
  ArrowUpRight, MapPin, ChevronDown, Search, 
  BedDouble, Bath, Square, ArrowRight, Star,
  ShieldCheck, UserCheck, Filter, Sparkles, Building2
} from 'lucide-react';

/* 
 * HomeView Component: The main landing page view for HomeHuntAR.
 * This component displays featured properties and site features.
 */
const HomeView: React.FC<{ onNavigate: (view: AppView) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-brand-charcoal text-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] lg:h-[80vh] min-h-[500px] overflow-hidden flex items-end pb-12 px-5 lg:px-16 pt-20">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Architecture" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* ENHANCED OVERLAYS FOR LEGIBILITY */}
        {/* Primary Bottom-to-Top Charcoal Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent opacity-90" />
        {/* Horizontal Left-to-Right "Text Protection" Fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        
        <div className="max-w-[1700px] mx-auto w-full relative z-10 space-y-8 lg:space-y-6">
          <div className="max-w-4xl animate-reveal px-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic leading-[1.1] text-shadow-sm">
              Find Your <br className="hidden sm:block" />
              <span className="text-brand-gold">Future Home</span> <br /> 
              With Home Hunt AR
            </h1>
            <p className="text-white text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed font-bold uppercase tracking-widest opacity-95 text-shadow-sm">
              Discover luxury properties tailored to your lifestyle via Canada's premier spatial intelligence suite.
            </p>
          </div>

          <div className="hero-glass p-4 sm:p-5 w-full max-w-5xl shadow-2xl animate-reveal [animation-delay:200ms] border border-white/10 bg-brand-darker/80">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-0 divide-y lg:divide-y-0 lg:divide-white/10 lg:divide-x">
              <div className="flex-1 w-full lg:px-6 space-y-1 py-3 lg:py-0">
                <p className="text-brand-gold text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em]">Location</p>
                <div className="flex items-center justify-between group cursor-pointer">
                  <span className="text-white font-black uppercase text-[11px] sm:text-xs tracking-widest group-hover:text-brand-gold transition-colors">Toronto, Ontario</span>
                  <MapPin size={16} className="text-brand-gold" />
                </div>
              </div>
              <div className="flex-1 w-full lg:px-6 space-y-1 py-3 lg:py-0">
                <p className="text-brand-gold text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em]">Property Type</p>
                <div className="flex items-center justify-between group cursor-pointer">
                  <span className="text-white font-black uppercase text-[11px] sm:text-xs tracking-widest group-hover:text-brand-gold transition-colors">Condo / Loft</span>
                  <ChevronDown size={16} className="text-brand-gold opacity-60 group-hover:opacity-100 transition-colors" />
                </div>
              </div>
              <div className="flex-1 w-full lg:px-6 space-y-1 py-3 lg:py-0">
                <p className="text-brand-gold text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em]">Price Range</p>
                <div className="flex items-center justify-between group cursor-pointer">
                  <span className="text-white font-black uppercase text-[11px] sm:text-xs tracking-widest group-hover:text-brand-gold transition-colors">$1.2M - $3.5M</span>
                  <ChevronDown size={16} className="text-brand-gold opacity-60 group-hover:opacity-100 transition-colors" />
                </div>
              </div>
              <div className="w-full lg:w-auto lg:pl-6 pt-2 lg:pt-0">
                <button className="w-full lg:w-auto bg-brand-gold text-black px-6 sm:px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xl active:scale-95 shadow-brand-gold/20">
                  <Search size={18} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES GRID */}
      <section className="py-12 lg:py-16 px-6 lg:px-16 max-w-[1700px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 order-2 lg:order-1">
            <div data-reveal className="scroll-reveal reveal-left dark-card p-6 sm:p-8 space-y-4 bg-brand-darker border-white/10 transition-all group shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold border border-brand-gold/20 transition-all">
                <UserCheck size={24} />
              </div>
              <h4 className="text-base sm:text-lg font-black uppercase tracking-tighter text-white transition-colors">Elite Agents</h4>
              <p className="text-white font-bold uppercase tracking-widest leading-relaxed text-[9px] sm:text-[10px] opacity-80">Platinum tier certified specialists.</p>
            </div>
            <div data-reveal className="scroll-reveal reveal-right delay-100 dark-card p-6 sm:p-8 space-y-4 lg:translate-y-6 bg-brand-darker border-white/10 transition-all group shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold border border-brand-gold/20 transition-all">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-base sm:text-lg font-black uppercase tracking-tighter text-white transition-colors">Neural Trust</h4>
              <p className="text-white font-bold uppercase tracking-widest leading-relaxed text-[9px] sm:text-[10px] opacity-80">Verified property histories.</p>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div data-reveal className="scroll-reveal reveal-zoom delay-200 aspect-video lg:aspect-[21/9] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative group">
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105" 
                alt="Modern Interior" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section data-reveal className="scroll-reveal reveal-down py-12 lg:py-16 px-5 sm:px-8 lg:px-16 max-w-[1700px] mx-auto bg-brand-darker/50 rounded-[2rem] lg:rounded-[2.5rem] border border-white/5 my-4 sm:my-8 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="space-y-1">
            <span className="text-brand-gold font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-[9px] lg:text-[10px]">Curated Selection</span>
            <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter italic">Top <span className="text-brand-gold not-italic">Listings</span></h2>
          </div>
          <button className="w-full md:w-auto bg-white/5 border border-white/10 text-brand-gold px-6 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[9px] lg:text-[10px] flex items-center justify-center gap-2 hover:bg-brand-gold hover:text-black transition-all">
            All Inventory <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="space-y-12 sm:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center group">
            <div data-reveal className="scroll-reveal reveal-left rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl h-72 sm:h-96 lg:h-[400px] border border-white/10 relative">
              <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" alt="Penthouse" />
            </div>
            <div data-reveal className="scroll-reveal reveal-right space-y-6">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />)}
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Platinum Rating</span>
              </div>
              <h3 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter italic">The Yorkville <span className="text-brand-gold">Penthouse</span></h3>
              <div className="flex flex-wrap gap-6 text-slate-300 font-bold uppercase tracking-widest text-[10px]">
                <div className="flex items-center gap-2"><BedDouble size={16} className="text-brand-gold" /> 4 Beds</div>
                <div className="flex items-center gap-2"><Bath size={16} className="text-brand-gold" /> 5 Baths</div>
                <div className="flex items-center gap-2"><Square size={16} className="text-brand-gold" /> 4,200 SQFT</div>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400 leading-relaxed max-w-lg">A masterpiece of modern architecture in the heart of Toronto's most exclusive district. Features a private glass elevator and 360-degree skyline views.</p>
              <button className="bg-brand-gold text-black px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center gap-3 hover:bg-white transition-all shadow-2xl shadow-brand-gold/10 active:scale-95 italic">
                Request Virtual Tour <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;