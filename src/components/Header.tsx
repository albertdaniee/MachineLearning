/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, BarChart3, Menu, X, BookOpen, Contact, ShieldCheck } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About Albert", id: "about" },
    { label: "Services", id: "services" },
    { label: "Data Lab", id: "playground" },
    { label: "Learning Hub", id: "learning" },
    { label: "Consultation", id: "contact" },
  ];

  const handleNavItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#05070a]/85 backdrop-blur-md border-b border-white/5 px-4 py-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavItemClick("hero")}
          className="flex items-center space-x-3 cursor-pointer group"
          id="header-brand-logo"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition duration-300">
            i
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold tracking-tight text-white flex items-center gap-1 text-base sm:text-lg uppercase leading-none">
              iDataScientist<span className="text-emerald-500">.ca</span>
            </span>
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest leading-none mt-0.5">
              Daniel Sundararaj
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" id="header-desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => handleNavItemClick(item.id)}
              className={`py-1 mx-2 text-sm font-medium tracking-wide transition-all cursor-pointer border-b-2 ${
                activeSection === item.id
                  ? "text-white border-emerald-500 rounded-none pb-0.5"
                  : "text-slate-400 hover:text-white border-transparent pb-0.5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA and Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => handleNavItemClick("playground")}
            className="flex items-center gap-1.5 text-xs font-sans px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white text-slate-300 transition-all cursor-pointer"
            id="header-sandbox-btn"
          >
            <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
            Launch Lab
          </button>
          <button
            onClick={() => handleNavItemClick("contact")}
            className="text-xs font-sans font-bold px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-900/40 transition-all cursor-pointer"
            id="header-book-btn"
          >
            Book Session
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="bg-[#05070a]/95 backdrop-blur-md border-b border-white/5 px-4 py-4 space-y-3" id="mobile-dropdown-nav">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavItemClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                  activeSection === item.id
                    ? "bg-white/5 border-l-2 border-emerald-500 text-emerald-450 font-bold rounded-l-none"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => handleNavItemClick("playground")}
              className="flex items-center justify-center gap-1.5 text-xs font-mono py-2 bg-white/5 text-emerald-450 rounded-lg border border-white/10 hover:text-white"
            >
              <BookOpen className="h-4 w-4" />
              Launch Interactive Lab
            </button>
            <button
              onClick={() => handleNavItemClick("contact")}
              className="flex items-center justify-center gap-1.5 text-xs font-sans font-medium py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg shadow"
            >
              <Contact className="h-4 w-4" />
              Request Booking
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
