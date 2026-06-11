/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, GraduationCap, Code2, Users, Lightbulb, BookOpenCheck } from "lucide-react";

export default function About() {
  const skills = [
    { name: "Python (Pandas, Numpy, Scikit-Learn)", score: 98 },
    { name: "SQL (Window Functions, CTEs, Analytics)", score: 95 },
    { name: "Deep Learning (PyTorch, CNN, RNN, Transformers)", score: 90 },
    { name: "Generative AI & LLMs (Gemini API, RAG, prompt tuning)", score: 92 },
    { name: "Data Architecture (AWS, Snowflake, Postgres, GCP)", score: 88 },
    { name: "Statistical Inferencing & Experimental Design", score: 94 },
  ];

  const highlights = [
    {
      icon: <GraduationCap className="h-6 w-6 text-teal-400" />,
      title: "Master Educator",
      desc: "Guided over 2,000 university students and professionals transition securely into senior data analytics, ML engineering, and analytical research roles."
    },
    {
      icon: <Code2 className="h-6 w-6 text-emerald-400" />,
      title: "Pragmatic Development",
      desc: "Designed and deployed 15+ production-grade data pipelines, predictive algorithms, and custom LLM interfaces across financial platforms, real-estate hubs, and marketing engines."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-amber-400" />,
      title: "Intuitive First Philosophy",
      desc: "Adamantly against 'black box' learning. We break down the mathematical cost functions, linear algebra, and data patterns so you code with absolute clarity."
    }
  ];

  return (
    <section className="bg-transparent border-y border-white/5 py-20 px-4 sm:px-6 lg:px-8" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white font-mono">
            <span>Core Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Meet the Data Scientist & Instructor
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Expert guidance modeled around rigorous instruction, data-driven consulting, and building enterprise artificial systems.
          </p>
        </div>

        {/* Biography Block and Skill Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Text bio */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-sans font-semibold text-white tracking-tight">
              Daniel Sundararaj
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              As a Lead Data Scientist and veteran consultant, my career has been defined by a simple principle: <strong>making complex data accessible and highly functional</strong>. 
              Whether I am deploying a predictive multi-variate modeling pipeline for a corporate client or tutoring students looking to pass high-stakes college machine learning courses, I emphasize <strong>concept clarity and clean code architecture</strong>.
            </p>

            <blockquote className="border-l-4 border-blue-500 pl-4 py-1 italic text-slate-400 text-sm">
              "We don't just write scripts; we build models with surgical mathematical understanding. Knowing exactly why an algorithm splits, clusters, or regularizes separates junior developers from elite artificial architects."
            </blockquote>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Outside of building production pipelines, I consult with startups and mid-market companies to devise custom AI roadmaps, help them evaluate data warehouses like Snowflake, and engineer API integrations with Gemini. I run custom cohort bootcamps and provide personalized 1-on-1 tutoring, guiding motivated learners through Scikit-Learn pipelines, SQL window functions, and neural networks.
            </p>

            {/* Quick Badges in grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-2 p-3 bg-white/5 rounded-xl border border-white/10">
                <Users className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-medium text-slate-300">2K+ Learners Mentored</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white/5 rounded-xl border border-white/10">
                <Award className="h-5 w-5 text-blue-400" />
                <span className="text-xs font-medium text-slate-300">10+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Graphical skill bars representing technical specialties */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6 backdrop-blur-md">
            <h4 className="text-lg font-mono text-white flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-emerald-400" />
              Albert's Technical Stack
            </h4>
            <div className="space-y-4 pt-1">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-sans">{skill.name}</span>
                    <span className="text-slate-400 font-mono">{skill.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[11px] font-mono text-slate-500">
              <span>Stack: Python • R • SQL • PyTorch • Postgres</span>
              <span>Updated: June 2026</span>
            </div>
          </div>

        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] p-6 sm:p-8 border border-white/10 rounded-2xl relative group hover:border-white/20 hover:scale-[1.01] transition-all duration-300 backdrop-blur-md"
              id={`about-pillar-${idx}`}
            >
              <div className="p-3 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/10">
                {item.icon}
              </div>
              <h3 className="text-lg font-sans font-semibold text-white mb-2 tracking-tight group-hover:text-emerald-405 transition">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
