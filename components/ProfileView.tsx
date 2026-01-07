import React from 'react';
import Logo from './Logo';
import { ChevronRight } from 'lucide-react';

const ProfileView: React.FC = () => {
  const settings = [
    { label: 'About Us' },
    { label: "FAQ's" },
    { label: 'Help & Support' },
    { label: 'GDPR Policy' },
    { label: 'Terms and Conditions' },
  ];

  return (
    <div className="min-h-screen bg-brand-charcoal pt-32 pb-40">
      <div className="max-w-md mx-auto px-6 space-y-8 animate-reveal">
        {/* User Card */}
        <div className="glass-panel rounded-[2.5rem] p-8 flex items-center gap-6 shadow-2xl">
          <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center">
            <Logo strokeColor="#2f2f2f" className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl brand-text-heavy text-white leading-none tracking-tighter uppercase">Hello there</h2>
            <p className="text-[10px] text-brand-gold brand-text-heavy uppercase tracking-widest mt-1 opacity-60">Session Identity: Active</p>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-brand-gold hover:bg-yellow-600 text-[#2f2f2f] brand-text-heavy py-5 rounded-full text-[10px] uppercase tracking-[0.3em] transition-all active:scale-95 shadow-xl shadow-brand-gold/10">
          Authenticate Account
        </button>

        {/* Settings List */}
        <div className="space-y-6">
          <h3 className="text-[10px] brand-text-heavy uppercase tracking-[0.4em] text-slate-400 pl-2">System Config</h3>
          <div className="space-y-3">
            {settings.map((item, idx) => (
              <button key={idx} className="glass-panel w-full flex items-center justify-between group py-5 px-8 rounded-2xl hover:bg-white/5 transition-all">
                <span className="text-xs brand-text-heavy text-white group-hover:text-brand-gold transition-colors uppercase tracking-widest">{item.label}</span>
                <ChevronRight size={18} className="text-brand-gold" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;