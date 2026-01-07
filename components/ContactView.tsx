import React from 'react';
import { Mail, Linkedin, Instagram, Twitter } from 'lucide-react';

const ContactView: React.FC = () => {
  return (
    <div className="bg-brand-charcoal py-24 lg:py-40 text-white overflow-hidden min-h-screen flex items-center relative">
      <div className="absolute top-1/2 -left-20 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1700px] mx-auto w-full px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
        <div data-reveal className="scroll-reveal space-y-10 lg:space-y-12">
          <h1 className="hero-title select-none">
            <span className="brand-text-heavy text-white uppercase leading-none block mb-4 hover:text-brand-gold transition-colors duration-500 cursor-default">Book A</span>
            <span className="brand-text-heavy text-brand-gold uppercase leading-none block hover:scale-[1.02] transition-transform origin-left cursor-default">Spatial Demo</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-300 brand-text-heavy max-w-md leading-relaxed uppercase tracking-tight opacity-80 hover:text-brand-gold transition-colors duration-300 cursor-default">
            Ready to experience the future of Canadian real estate? Schedule a personalized AR walkthrough today.
          </p>

          <div className="space-y-6 lg:space-y-8 pt-4 lg:pt-8">
            <a href="mailto:hello@homehuntar.ca" className="flex items-center gap-4 lg:gap-6 group">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-brand-gold rounded-[1.5rem] flex items-center justify-center text-black shadow-xl shadow-brand-gold/20 group-hover:scale-110 group-hover:bg-white transition-all">
                <Mail size={22} />
              </div>
              <div>
                <span className="text-[11px] lg:text-[13px] brand-text-heavy text-brand-gold uppercase tracking-[0.4em] block mb-1 group-hover:text-white transition-colors text-shadow-sm">Email Protocol</span>
                <span className="text-xl lg:text-3xl brand-text-heavy group-hover:text-brand-gold transition-colors tracking-tighter uppercase">hello@homehuntar.ca</span>
              </div>
            </a>
            
            <div className="flex gap-4 pt-4 lg:pt-6">
               {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                 <div key={i} className="w-12 h-12 lg:w-16 lg:h-16 glass-panel border border-white/5 rounded-2xl flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all cursor-pointer shadow-lg hover:-translate-y-1">
                    <Icon size={22} />
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div data-reveal className="scroll-reveal delay-200 glass-panel p-8 lg:p-16 rounded-[2.5rem] lg:rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-3xl hover:border-brand-gold group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full"></div>
          
          <form className="space-y-10 lg:space-y-12 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <div className="space-y-4">
                <label className="text-[11px] lg:text-[13px] brand-text-heavy uppercase tracking-[0.4em] text-slate-400 pl-1 group-hover:text-brand-gold transition-colors">Full Name</label>
                <input type="text" placeholder="JOHN DOE" className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 lg:py-5 outline-none focus:border-brand-gold transition-colors brand-text-heavy text-white placeholder:text-slate-700" />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] lg:text-[13px] brand-text-heavy uppercase tracking-[0.4em] text-slate-400 pl-1 group-hover:text-brand-gold transition-colors">Email Address</label>
                <input type="email" placeholder="JOHN@COMPANY.CA" className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 lg:py-5 outline-none focus:border-brand-gold transition-colors brand-text-heavy text-white placeholder:text-slate-700" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] lg:text-[13px] brand-text-heavy uppercase tracking-[0.4em] text-slate-400 pl-1 group-hover:text-brand-gold transition-colors">Requested Module</label>
              <select className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 lg:py-5 outline-none focus:border-brand-gold transition-colors brand-text-heavy appearance-none text-white uppercase cursor-pointer group-hover:text-brand-gold">
                <option className="bg-brand-charcoal">AR HOME SAFARI</option>
                <option className="bg-brand-charcoal">3D VISUALIZATION</option>
                <option className="bg-brand-charcoal">AI STAGING</option>
                <option className="bg-brand-charcoal">INVESTOR STRATEGY</option>
              </select>
            </div>

            <button className="w-full bg-brand-gold text-black brand-text-heavy uppercase tracking-[0.4em] py-6 lg:py-8 rounded-full hover:bg-white transition-all active:scale-95 shadow-2xl shadow-brand-gold/10 text-[12px] lg:text-[14px]">
              Initialize Neural Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactView;