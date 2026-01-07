import React, { useState, useEffect, useRef } from 'react';
import { AppView } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import NRPHub from './components/ServicesHub';
import ContactView from './components/ContactView';
import ChatView from './components/ChatView';
import ImageView from './components/ImageView';
import VideoView from './components/VideoView';
import LiveVoiceView from './components/LiveVoiceView';
import ProfileView from './components/ProfileView';
import MobileNav from './components/MobileNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const isNavigatingRef = useRef(false);

  // Define which views are part of the main scrollable landing page
  const isLandingView = (view: AppView) => 
    [AppView.HOME, AppView.ABOUT, AppView.NRP, AppView.CONTACT].includes(view);

  // 1. Scroll-Spy Logic for Navigation Active States
  useEffect(() => {
    if (!isLandingView(currentView)) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isNavigatingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'home') setCurrentView(AppView.HOME);
          if (id === 'about') setCurrentView(AppView.ABOUT);
          if (id === 'nrp') setCurrentView(AppView.NRP);
          if (id === 'contact') setCurrentView(AppView.CONTACT);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'about', 'nrp', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScrollFallback = () => {
      if (isNavigatingRef.current) return;
      if (window.scrollY < 100) {
        setCurrentView(AppView.HOME);
      }
    };

    window.addEventListener('scroll', handleScrollFallback);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollFallback);
    };
  }, [currentView]);

  // 2. Global Intersection Observer for Scroll Reveal Transitions
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // We usually don't un-reveal for a premium experience
            // revealObserver.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const elementsToReveal = document.querySelectorAll('[data-reveal]');
    elementsToReveal.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, [currentView]); // Re-run when view changes to observe new elements

  const handleNavigate = (view: AppView) => {
    if (isLandingView(view)) {
      isNavigatingRef.current = true;
      const sectionId = view === AppView.HOME ? 'home' : view.toLowerCase();
      
      if (isLandingView(currentView)) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setCurrentView(view);
          setTimeout(() => { isNavigatingRef.current = false; }, 800);
        }
      } else {
        setCurrentView(view);
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => { isNavigatingRef.current = false; }, 800);
        }, 50);
      }
    } else {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    if (isLandingView(currentView)) {
      return (
        <div className="flex flex-col bg-brand-charcoal">
          <section id="home">
            <HomeView onNavigate={handleNavigate} />
          </section>
          <section id="about">
            <AboutView />
          </section>
          <section id="nrp">
            <NRPHub onLaunchTool={handleNavigate} />
          </section>
          <section id="contact">
            <ContactView />
          </section>
        </div>
      );
    }

    switch (currentView) {
      case AppView.PROFILE: return <ProfileView />;
      case AppView.CHAT: return <ChatView />;
      case AppView.IMAGE: return <ImageView />;
      case AppView.VIDEO: return <VideoView />;
      case AppView.VOICE: return <LiveVoiceView />;
      default: return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-charcoal selection:bg-brand-gold selection:text-black scroll-smooth">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <MobileNav currentView={currentView} onNavigate={handleNavigate} />
    </div>
  );
};

export default App;