export enum AppView {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  NRP = 'NRP',
  CONTACT = 'CONTACT',
  PROFILE = 'PROFILE',
  CHAT = 'CHAT',     // Tool: Strategist
  IMAGE = 'IMAGE',   // Tool: Designer
  VIDEO = 'VIDEO',   // Tool: Cinema
  VOICE = 'VOICE'    // Tool: Concierge
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface GeneratedVideo {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface TranscriptionItem {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}