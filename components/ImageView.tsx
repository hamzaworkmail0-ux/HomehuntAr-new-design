import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { GeneratedImage } from '../types';
import { Sofa, Loader2, Download, Layers, Sparkles } from 'lucide-react';

const ImageView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const housingPrompt = `Architectural photorealistic render of: ${prompt}. Cinematic lighting, 8k, professional interior design, luxury finish.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: housingPrompt }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const newImg: GeneratedImage = {
            id: Date.now().toString(),
            url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
            prompt: prompt,
            timestamp: Date.now()
          };
          setImages(prev => [newImg, ...prev]);
          setPrompt('');
          break;
        }
      }
    } catch (error) {
      console.error('Image Generation Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-[80vh] flex flex-col md:flex-row bg-[#111111] border-y border-white/5">
      {/* Sidebar / Controls */}
      <div className="w-full md:w-96 border-b md:border-b-0 md:border-r border-white/5 p-12 space-y-12 flex flex-col bg-[#1a1a1a]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-gold text-black flex items-center justify-center shadow-xl shadow-brand-gold/10">
            <Layers size={28} />
          </div>
          <div>
            <h3 className="text-xl brand-text-heavy text-white leading-none tracking-tighter italic uppercase">
              <span className="brand-text-light">Visual</span> Intelligence
            </h3>
            <span className="text-[10px] brand-text-heavy uppercase tracking-[0.4em] text-slate-500 italic">Vision Module</span>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] brand-text-heavy uppercase text-slate-500 tracking-[0.4em] pl-1">Design Brief</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Modern Canadian lakeside cabin..."
              className="w-full h-48 bg-[#111111] border border-white/5 rounded-[2rem] p-8 text-sm brand-text-heavy outline-none focus:border-brand-gold resize-none shadow-inner text-white placeholder:text-slate-700 italic"
            />
          </div>
          <button
            onClick={generateImage}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-6 bg-brand-gold hover:bg-yellow-500 disabled:bg-slate-900 text-black rounded-2xl brand-text-heavy text-[11px] tracking-[0.3em] uppercase shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 border border-brand-gold/10 italic"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            Render Vision
          </button>
        </div>
      </div>

      {/* Main Display Area */}
      <div className="flex-1 bg-[#111111] p-12 overflow-y-auto custom-scrollbar">
        {images.length > 0 ? (
          <div className="grid grid-cols-1 gap-12 animate-reveal">
            {images.map(img => (
              <div key={img.id} className="bg-[#1a1a1a] p-8 rounded-[3.5rem] group border border-white/5 relative overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.prompt} 
                  className="w-full rounded-[2.5rem] object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="mt-8 flex justify-between items-center px-4">
                  <div className="max-w-[80%]">
                    <p className="text-white brand-text-heavy text-lg tracking-tight italic">{img.prompt}</p>
                    <p className="text-[9px] text-slate-500 brand-text-heavy uppercase tracking-widest mt-1">
                      Generated: {new Date(img.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <a 
                    href={img.url} 
                    download={`homehunt-render-${img.id}.png`}
                    className="p-5 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all shadow-lg"
                  >
                    <Download size={22} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-20">
            <div className="w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center mb-8 animate-pulse">
              <Sofa size={40} className="text-brand-gold" />
            </div>
            <h3 className="text-3xl brand-text-heavy text-white mb-2 uppercase tracking-tighter italic">Virtual Staging</h3>
            <p className="text-sm brand-text-heavy text-slate-500 max-w-sm text-center leading-relaxed uppercase tracking-widest">
              Describe an interior vision to generate a photorealistic render using Gemini 2.5 Flash.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageView;