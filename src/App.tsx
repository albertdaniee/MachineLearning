/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ModelPlayground from "./components/ModelPlayground";
import DatasetExplorer from "./components/DatasetExplorer";
import GeminiAssistant from "./components/GeminiAssistant";
import LearningHub from "./components/LearningHub";
import ContactCalculator from "./components/ContactCalculator";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = React.useState("hero");

  // Track scroll position to update header active highlights
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "services", "playground", "learning", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId === "hero" ? "hero-section" : sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const targetEl = document.getElementById(sectionId === "hero" ? "hero-section" : sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 selection:bg-emerald-500/25 selection:text-white relative overflow-hidden" id="main-app-viewport">
      {/* Background Glow Effects from Immersive UI theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* 1. Header Navigation Bar */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 2. Main content grids and modules */}
      <main className="relative z-10" id="main-content-flow">
        
        {/* Hero segments */}
        <Hero onNavigate={handleNavigate} />

        {/* Bio segment */}
        <About />

        {/* Offerings list */}
        <Services onNavigate={handleNavigate} />

        {/* Sandbox Live playground: ML Workspace & EDA Explorer */}
        <div id="playground" className="scroll-mt-16">
          <ModelPlayground />
          <DatasetExplorer />
        </div>

        {/* Collaborative coaching Chatbot */}
        <GeminiAssistant />

        {/* Learning, roadmap quizes & cheat sheets */}
        <div id="learning" className="scroll-mt-16">
          <LearningHub />
        </div>

        {/* Pricing estimator & Consultation Booking form */}
        <div id="contact" className="scroll-mt-16">
          <ContactCalculator />
        </div>

      </main>

      {/* 3. Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
