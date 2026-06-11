/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, BarChart3, Github, Send, Linkedin } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="bg-transparent border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 text-left" id="app-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
        
        {/* Brand column (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div 
            onClick={() => onNavigate("hero")}
            className="flex items-center space-x-2 cursor-pointer group w-fit"
          >
            <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
              <BarChart3 className="h-4.5 w-4.5 text-blue-500 group-hover:text-emerald-400 transition" />
            </div>
            <span className="font-sans font-bold tracking-tight text-white flex items-center gap-1 text-sm sm:text-base">
              iDataScientist<span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">.ca</span>
              <Sparkles className="h-3 w-3 text-emerald-400" />
            </span>
          </div>

          <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-sans">
            Daniel Sundararajis a Lead Data Scientist, instructor, and custom AI solutions architect based in Toronto, Ontario. 
            Designing state-of-the-art predictive algorithms, teaching advanced mathematics, and demystifying neural pipelines.
          </p>

          <div className="flex gap-3 pt-1">
            <button
              id="social-linkedin"
              className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 rounded transition-all cursor-pointer"
              title="LinkedIn profile"
            >
              <Linkedin className="h-4 w-4" />
            </button>
            <button
              id="social-github"
              className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 rounded transition-all cursor-pointer"
              title="GitHub profile"
            >
              <Github className="h-4 w-4" />
            </button>
            <button
              id="social-contact"
              onClick={() => onNavigate("contact")}
              className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 rounded transition-all cursor-pointer"
              title="Contact"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Links Column (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold">Workspace Navigation</span>
          <ul className="space-y-2 text-xs font-mono text-slate-500">
            <li>
              <a href="#hero" onClick={(e) => handleLinkClick(e, "hero")} className="hover:text-emerald-400 transition">
                &gt; Hero Terminal
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleLinkClick(e, "about")} className="hover:text-emerald-400 transition">
                &gt; Expert Profile
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleLinkClick(e, "services")} className="hover:text-emerald-400 transition">
                &gt; Coaching Services
              </a>
            </li>
            <li>
              <a href="#playground" onClick={(e) => handleLinkClick(e, "playground")} className="hover:text-emerald-400 transition">
                &gt; Interactive Lab
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Lists Column (3 cols) */}
        <div className="md:col-span-4 space-y-3">
          <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold">Pedagogical Resources</span>
          <ul className="space-y-2 text-xs font-mono text-slate-500">
            <li>
              <a href="#learning" onClick={(e) => handleLinkClick(e, "learning")} className="hover:text-emerald-400 transition">
                &gt; Course Curriculum Outline
              </a>
            </li>
            <li>
              <a href="#learning" onClick={(e) => handleLinkClick(e, "learning")} className="hover:text-emerald-400 transition">
                &gt; AI Career Roadmap Quiz
              </a>
            </li>
            <li>
              <a href="#learning" onClick={(e) => handleLinkClick(e, "learning")} className="hover:text-emerald-400 transition">
                &gt; Code Wrangling Cheatsheets
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleLinkClick(e, "contact")} className="hover:text-emerald-400 transition">
                &gt; Fee Estimate Calculator
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Underbar copyright declarations */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-500">
        <span>
          © {new Date().getFullYear()} iDataScientist.ca. All rights reserved. 
        </span>
        <span className="text-slate-500 flex gap-4">
          <span>Toronto, Ontario • Canada</span>
          <span>•</span>
          <span>Demystifying Costs & Algorithms</span>
        </span>
      </div>
    </footer>
  );
}
