
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { TranscriptionItem } from '../types';
import { Mic, Headset, CircleCheck, Loader2, Zap } from 'lucide-react';

const SAMPLE_RATE_IN = 16000;
const SAMPLE_RATE_OUT = 24000;

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const LiveVoiceView: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [history, setHistory] = useState<TranscriptionItem[]>([]);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active'>('idle');
  
  const sessionRef = useRef<any>(null);
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const currentInputTranscription = useRef('');
  const currentOutputTranscription = useRef('');

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.then((session: any) => session.close());
      sessionRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (audioContextInRef.current) {
        audioContextInRef.current.close();
        audioContextInRef.current = null;
    }
    if (audioContextOutRef.current) {
        audioContextOutRef.current.close();
        audioContextOutRef.current = null;
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setStatus('idle');
  }, []);

  const startSession = async () => {
    try {
      setStatus('connecting');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      audioContextInRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: SAMPLE_RATE_IN });
      audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: SAMPLE_RATE_OUT });
      const outputNode = audioContextOutRef.current.createGain();
      outputNode.connect(audioContextOutRef.current.destination);

      // Connect to Gemini Live API
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = audioContextInRef.current!.createMediaStreamSource(stream);
            scriptProcessorRef.current = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessorRef.current.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              // CRITICAL: Solely rely on sessionPromise resolves and then call session.sendRealtimeInput
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessorRef.current);
            scriptProcessorRef.current.connect(audioContextInRef.current!.destination);
            setStatus('active');
            setIsActive(true);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              currentOutputTranscription.current += message.serverContent.outputTranscription.text;
            } else if (message.serverContent?.inputTranscription) {
              currentInputTranscription.current += message.serverContent.inputTranscription.text;
            }
            
            if (message.serverContent?.turnComplete) {
              const u = currentInputTranscription.current;
              const m = currentOutputTranscription.current;
              if (u || m) {
                setHistory(prev => [
                    ...prev, 
                    { role: 'user', text: u || '(Voice Input)', timestamp: Date.now() },
                    { role: 'model', text: m || '(Response Provided)', timestamp: Date.now() + 1 }
                ]);
              }
              currentInputTranscription.current = '';
              currentOutputTranscription.current = '';
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextOutRef.current) {
              const ctx = audioContextOutRef.current;
              // Schedule the next audio chunk to start at the exact end time of the previous one
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), ctx, SAMPLE_RATE_OUT, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputNode);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current.values()) {
                source.stop();
              }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => stopSession(),
          onclose: () => stopSession()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          systemInstruction: 'You are the HomeHuntAR AI Concierge. You guide Canadian property tours. Sophisticated, warm, professional. Reference architectural details and Canadian context (neighborhoods, weather-readiness, etc.) where appropriate. Conciseness is key.',
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        }
      });
      sessionRef.current = sessionPromise;
    } catch (error) {
      setStatus('idle');
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, [stopSession]);

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-brand-charcoal min-h-[90vh]">
      {/* LEFT: TRANSCRIPTION HISTORY */}
      <div className="flex-1 flex flex-col p-6 lg:p-16 max-w-5xl mx-auto overflow-hidden">
        <header className="mb-8 lg:mb-16 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-brand-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold/80">Active Protocol: Tour Sync</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-white italic tracking-tighter uppercase">Concierge</h2>
          </div>
          <div className="flex items-center gap-3 lg:gap-4 bg-white/5 border border-white/10 px-4 lg:px-6 py-2 lg:py-3 rounded-full">
             <div className={`w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full ${isActive ? 'bg-brand-gold shadow-[0_0_12px_rgba(255,165,0,0.8)]' : 'bg-slate-700'}`} />
             <span className="text-[9px] lg:text-[10px] font-black uppercase text-slate-300 tracking-[0.1em] lg:tracking-[0.2em]">{status === 'active' ? 'Sync Stable' : 'Standby'}</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-6 lg:space-y-8 px-4 custom-scrollbar pb-10 min-h-[300px]">
          {history.length === 0 && !isActive && (
            <div className="h-full flex flex-col items-center justify-center py-20">
              <div className="animate-pulse">
                <Headset size={80} strokeWidth={0.5} className="text-white opacity-10 lg:w-[120px] lg:h-[120px]" />
              </div>
              <p className="mt-6 lg:mt-8 font-black uppercase tracking-[0.4em] lg:tracking-[0.6em] text-[9px] lg:text-[10px] opacity-50 text-white text-center">Initiate Voice Link For Guidance</p>
            </div>
          )}
          {history.map((item, idx) => (
            <div key={idx} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-500`}>
              <div className={`max-w-[90%] lg:max-w-[80%] rounded-[1.5rem] lg:rounded-[2.5rem] px-6 lg:px-8 py-4 lg:py-5 text-xs lg:text-sm font-black tracking-tight leading-relaxed shadow-2xl ${
                  item.role === 'user' 
                    ? 'bg-[#262626] text-slate-300 border border-white/5' 
                    : 'bg-brand-gold/10 border border-brand-gold/20 text-brand-gold'
              }`}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT/BOTTOM: CONTROLS */}
      <div className="w-full lg:w-[450px] border-t lg:border-t-0 lg:border-l border-white/5 bg-[#111111]/40 backdrop-blur-3xl flex flex-col items-center justify-center p-8 lg:p-16 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-brand-gold/5 rounded-full blur-[80px] lg:blur-[120px] transition-all duration-1000 ${isActive ? 'scale-150 opacity-100' : 'scale-75 opacity-0'}`} />
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-10 lg:space-y-16 w-full">
           <div className="relative group">
              <div className={`absolute -inset-8 lg:-inset-12 bg-brand-gold/10 rounded-full blur-2xl lg:blur-3xl transition-opacity duration-1000 ${isActive ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
              <button
                onClick={isActive ? stopSession : startSession}
                disabled={status === 'connecting'}
                className={`relative w-32 h-32 lg:w-48 lg:h-48 rounded-[2.5rem] lg:rounded-[4rem] flex items-center justify-center transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.6)] active:scale-90 border-2 ${
                  isActive 
                    ? 'bg-brand-charcoal border-brand-gold/50 scale-105 lg:scale-110' 
                    : 'bg-brand-gold hover:bg-orange-600 border-transparent hover:shadow-brand-gold/20'
                }`}
              >
                {status === 'connecting' ? (
                    <Loader2 size={32} className="text-black animate-spin lg:w-[50px] lg:h-[50px]" />
                ) : isActive ? (
                    <div className="flex gap-2 h-10 lg:h-16 items-center">
                        {[1, 1.5, 2, 1.5, 1].map((scale, i) => (
                            <div key={i} className="w-1.5 lg:w-2 bg-brand-gold rounded-full animate-pulse" style={{ height: `${isActive ? 15 * scale : 10}px`, animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                ) : (
                    <Mic size={32} className="text-black group-hover:scale-110 transition-transform lg:w-[50px] lg:h-[50px]" />
                )}
              </button>
           </div>

           <div className="text-center space-y-2 lg:space-y-4 px-4">
              <h3 className="text-white font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-[9px] lg:text-[10px] italic">{status === 'active' ? 'Neural Link Engaged' : 'Sync Request Ready'}</h3>
              <p className="text-slate-500 text-[10px] lg:text-[11px] font-black leading-relaxed max-w-[240px] mx-auto uppercase tracking-widest">Natural language guidance via Gemini 2.5 flash native audio</p>
           </div>

           <div className="w-full space-y-3 lg:space-y-5 pt-8 lg:pt-12 border-t border-white/5">
              {[
                "CMHC Guideline Aware",
                "HD PCM Audio Stream",
                "Canadian Market Context"
              ].map(feat => (
                <div key={feat} className="flex items-center gap-4 text-slate-500 group cursor-default">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-lg bg-brand-gold/5 flex items-center justify-center border border-brand-gold/20 group-hover:bg-brand-gold/20 transition-colors">
                    <CircleCheck size={12} className="text-brand-gold" />
                  </div>
                  <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.15em] lg:tracking-[0.2em] group-hover:text-brand-gold transition-colors">{feat}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default LiveVoiceView;
