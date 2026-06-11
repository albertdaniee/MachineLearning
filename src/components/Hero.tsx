/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Terminal, ArrowRight, Play, Server, UserCheck, Award, Zap } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [typedText, setTypedText] = React.useState("");
  const titles = ["Machine Learning Models.", "Predictive Analytics Pipelines.", "Bespoke Enterprise AI Solutions.", "Interactive Student Bootcamps."];
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = titles[currentIdx];

    if (!isDeleting) {
      if (charIdx < currentWord.length) {
        timer = setTimeout(() => {
          setTypedText(currentWord.slice(0, charIdx + 1));
          setCharIdx(charIdx + 1);
        }, 80);
      } else {
        // Hold word for 2.5 seconds
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setTypedText(currentWord.slice(0, charIdx - 1));
          setCharIdx(charIdx - 1);
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentIdx((currentIdx + 1) % titles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, currentIdx]);

  return (
    <section className="relative overflow-hidden bg-[#05070a] pt-16 pb-20 lg:pt-24 lg:pb-28" id="hero-section">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-36 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-36 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Prompt */}
          <div className="lg:col-span-7 space-y-6" id="hero-left-col">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white">
              <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
              <span>Full-Stack Consulting & Education Portal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-white leading-[1.1]">
              Demystifying Algorithms.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Building Real {typedText}
              </span>
              <span className="text-emerald-450 animate-pulse">|</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl font-sans leading-relaxed">
              Meet <strong>Daniel Sundararaj</strong>, Toronto-based Lead Data Scientist and veteran instructor. 
              Bridging the deep divide between mathematical theory and high-impact production code to power business 
              intelligence and accelerate ML careers.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="hero-navigate-contact"
                onClick={() => onNavigate("contact")}
                className="flex items-center gap-2 group px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                Book Consulting Hour
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </button>
              <button
                id="hero-navigate-playground"
                onClick={() => onNavigate("playground")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Play className="h-4 w-4 text-emerald-400 fill-emerald-400" />
                Try ML Data Lab
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5" id="hero-specs-row">
              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold font-sans text-white">2,000+</span>
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider">Students Taught</span>
              </div>
              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold font-sans text-white">10+ Yrs</span>
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider">Industry Exp.</span>
              </div>
              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold font-sans text-white">15+</span>
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider">Deployed Pipelines</span>
              </div>
            </div>
          </div>

          {/* Interactive Core Display (Right Column) */}
          <div className="lg:col-span-5 relative" id="hero-right-col">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Box Glow Border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur-xl opacity-20"></div>
              
              {/* Container Card representing virtual console terminal */}
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
                
                {/* Simulated Header Tab Bar */}
                <div className="bg-black/45 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                    <Terminal className="h-3 w-3 text-teal-400" />
                    <span>scikit_learn_pipeline.py</span>
                  </div>
                  <div className="w-12"></div>
                </div>

                {/* Simulated Code Panel */}
                <div className="p-5 font-mono text-xs text-slate-300 space-y-4 overflow-x-auto select-none">
                  <div className="space-y-1">
                    <span className="text-teal-400 font-semibold">import</span> pandas <span className="text-teal-400 font-semibold">as</span> pd
                    <br />
                    <span className="text-teal-400 font-semibold">from</span> sklearn.model_selection <span className="text-teal-400 font-semibold">import</span> train_test_split
                    <br />
                    <span className="text-teal-400 font-semibold">from</span> sklearn.ensemble <span className="text-teal-400 font-semibold">import</span> RandomForestClassifier
                  </div>

                  <div className="space-y-1 border-l-2 border-white/10 pl-3">
                    <span className="text-slate-500"># 1. Load Albert's Curated Toronto dataset</span>
                    <br />
                    df = pd.read_csv(<span className="text-emerald-400">"idatascientist_leads.csv"</span>)
                    <br />
                    X, y = df.drop(<span className="text-emerald-400">"outcome"</span>, axis=<span className="text-amber-400">1</span>), df[<span className="text-emerald-400">"outcome"</span>]
                  </div>

                  <div className="space-y-1 border-l-2 border-white/10 pl-3">
                    <span className="text-slate-500"># 2. Fit classifier with elite hyper-parameters</span>
                    <br />
                    clf = RandomForestClassifier(n_estimators=<span className="text-amber-400">150</span>, max_depth=<span className="text-amber-400">5</span>)
                    <br />
                    clf.fit(X_train, y_train)
                  </div>

                  <div className="space-y-1 text-slate-400">
                    <span>print(f</span><span className="text-emerald-400">"Validation Score: &#123;clf.score(X_val, y_val):.4f&#125;"</span><span>)</span>
                    <br />
                    <span className="text-slate-500">&gt;&gt;&gt; Running analytical grid search...</span>
                    <br />
                    <span className="text-emerald-400 font-medium">Validation Accuracy: 0.9852 (SUCCESS)</span>
                  </div>
                </div>

                {/* Visual Widget representing active analytics status */}
                <div className="bg-black/50 p-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <div className="text-[11px] font-mono">
                      <span className="text-slate-400 block leading-none">Consulting Status</span>
                      <span className="text-emerald-400 font-bold block mt-1 tracking-wide text-xs">ONLINE & READY</span>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-mono rounded text-slate-400">
                    Toronto, CA
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
