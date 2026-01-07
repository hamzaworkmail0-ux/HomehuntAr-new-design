import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { GeneratedVideo } from '../types';
import { Camera, Loader2, Film, Key, ExternalLink, Play } from 'lucide-react';

const VideoView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      const selected = await (window as any).aistudio.hasSelectedApiKey();
      setHasApiKey(selected);
    }
  };

  const handleSelectKey = async () => {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const generateVideo = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setStatus('Initializing Architectural Engine...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const archPrompt = `A cinematic architectural walkthrough of: ${prompt}. Professional cinematography, luxurious finishes, Canadian architectural aesthetic.`;
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: archPrompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setStatus('Framing Northern Exposure...');
      
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        try {
          operation = await ai.operations.getVideosOperation({ operation: operation });
          
          const progress = [
            'Simulating solar angles...',
            'Calculating floor loads...',
            'Synthesizing materials...',
            'Rendering HD walkthrough...',
            'Encoding final stream...'
          ];
          setStatus(progress[Math.floor(Math.random() * progress.length)]);
        } catch (e: any) {
          if (e.message?.includes('Requested entity was not found')) {
            alert("Security session refreshed. Please re-select your key.");
            setHasApiKey(false);
            throw e;
          }
        }
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await videoResponse.blob();
        const videoUrl = URL.createObjectURL(blob);
        
        const newVideo: GeneratedVideo = {
          id: Date.now().toString(),
          url: videoUrl,
          prompt: prompt,
          timestamp: Date.now()
        };
        setVideos(prev => [newVideo, ...prev]);
        setPrompt('');
      }
    } catch (error) {
      console.error("Tour Error:", error);
      alert("Cinematic generation requires a professional API tier.");
    } finally {
      setIsGenerating(false);
      setStatus('');
    }
  };

  if (hasApiKey === false) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-brand-charcoal">
        <div className="w-20 h-20 rounded-3xl bg-brand-gold/10 flex items-center justify-center mb-8 border border-brand-gold/20">
          <Key className="w-10 h-10 text-brand-gold" />
        </div>
        <h2 className="text-3xl brand-text-heavy text-white mb-3 uppercase tracking-tighter italic">Enterprise Key Required</h2>
        <p className="text-slate-400 max-w-md mb-8 leading-relaxed brand-text-heavy uppercase text-xs tracking-widest opacity-80">
          Generating cinematic property walkthroughs requires a verified Google Cloud billing project for high-performance compute.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleSelectKey}
            className="px-10 py-5 bg-brand-gold hover:bg-yellow-600 text-black brand-text-heavy uppercase tracking-[0.2em] rounded-full transition-all shadow-xl shadow-brand-gold/10 active:scale-95 text-[10px] italic"
          >
            Connect Billing Project
          </button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            className="text-[9px] text-slate-500 hover:text-brand-gold flex items-center justify-center gap-2 brand-text-heavy uppercase tracking-widest transition-colors"
          >
            View pricing guide <ExternalLink size={12} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-brand-charcoal overflow-hidden">
      <div className="p-10 max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <header className="mb-12 text-center">
          <h2 className="text-5xl brand-text-heavy text-white tracking-tighter uppercase italic flex items-center justify-center gap-6">
            <Film className="w-12 h-12 text-brand-gold" />
            <span className="brand-text-light">Cinema</span> Tours
          </h2>
          <p className="text-slate-400 mt-3 brand-text-heavy tracking-[0.4em] uppercase text-[10px]">Architectural Intelligence • Veo Engine 3.1</p>
        </header>

        <div className="flex-1 flex flex-col gap-10">
          <div className="aspect-video w-full max-w-4xl mx-auto rounded-[3.5rem] bg-[#111111] border border-white/5 overflow-hidden relative shadow-2xl group">
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-charcoal/90 backdrop-blur-md">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full border-[3px] border-white/5 border-t-brand-gold animate-spin"></div>
                  <Camera className="absolute inset-0 m-auto w-10 h-10 text-brand-gold animate-pulse" />
                </div>
                <div className="mt-10 text-center">
                  <p className="text-3xl brand-text-heavy text-white mb-2 uppercase tracking-tighter italic">{status}</p>
                  <p className="text-slate-400 text-xs brand-text-heavy uppercase tracking-[0.2em]">Drafting cinematic sequence...</p>
                </div>
              </div>
            ) : videos.length > 0 ? (
              <video 
                key={videos[0].id}
                src={videos[0].url} 
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                loop
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-700">
                <div className="w-20 h-20 rounded-full bg-brand-charcoal flex items-center justify-center border border-white/5 mb-6 shadow-inner group-hover:scale-110 transition-transform">
                    <Play size={40} className="text-brand-gold/40 ml-1" />
                </div>
                <p className="brand-text-heavy text-[10px] uppercase tracking-[0.3em] opacity-40 text-brand-gold italic">Ready to visualize</p>
              </div>
            )}
          </div>

          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl focus-within:border-brand-gold/30 transition-all">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. 'Sleek Montreal industrial loft with brick walls, high ceilings, and sunset view'..."
                className="w-full h-24 bg-transparent border-none focus:ring-0 text-slate-100 placeholder-slate-700 resize-none py-2 text-xl brand-text-heavy italic"
              />
              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] brand-text-heavy text-slate-500 uppercase tracking-widest">Res</span>
                    <span className="px-4 py-1 rounded-full bg-[#111111] text-[10px] text-brand-gold brand-text-heavy border border-white/10 italic">720P HD</span>
                  </div>
                </div>
                <button
                  onClick={generateVideo}
                  disabled={!prompt.trim() || isGenerating}
                  className="px-12 py-5 bg-brand-gold hover:bg-yellow-600 disabled:bg-[#111111] disabled:text-slate-600 text-black brand-text-heavy uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all flex items-center gap-3 shadow-lg shadow-brand-gold/20 active:scale-95 italic"
                >
                  {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
                  Record Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoView;