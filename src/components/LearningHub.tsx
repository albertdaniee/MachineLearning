/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BookOpen, Search, GraduationCap, ChevronDown, ChevronUp, Copy, Check, FileCheck, Compass, Sliders, LayoutGrid } from "lucide-react";
import { COURSES, CHEATSHEETS } from "../data";
import { Course, CourseTopic } from "../types";

export default function LearningHub() {
  const [activeTab, setActiveTab] = React.useState<"courses" | "roadmap" | "cheatsheets">("courses");
  const [topicFilter, setTopicFilter] = React.useState<CourseTopic | "all">("all");
  const [expandedCourseId, setExpandedCourseId] = React.useState<string | null>("python-ds");
  const [copiedCodeId, setCopiedCodeId] = React.useState<string | null>(null);

  // Roadmap Quiz State
  const [quizStep, setQuizStep] = React.useState<number>(1);
  const [quizAns1, setQuizAns1] = React.useState<string>("");
  const [quizAns2, setQuizAns2] = React.useState<string>("");
  const [quizAns3, setQuizAns3] = React.useState<string>("");
  const [generatedRoadmap, setGeneratedRoadmap] = React.useState<any | null>(null);

  // Search filter for cheatsheets
  const [cheatsheetSearch, setCheatsheetSearch] = React.useState<string>("");

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleToggleCourse = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  // Filter courses
  const filteredCourses = React.useMemo(() => {
    if (topicFilter === "all") return COURSES;
    return COURSES.filter((c) => c.topic === topicFilter);
  }, [topicFilter]);

  // Generate personalized roadmap
  const handleGenerateRoadmap = () => {
    let sequence: Course[] = [];
    let advice = "";
    let timeline = "";

    // Math/coding background
    const bg = quizAns1; 
    // Goal
    const goal = quizAns2;
    // Hours
    const hours = quizAns3;

    if (bg === "beginner") {
      sequence.push(COURSES.find(c => c.id === "python-ds")!);
      sequence.push(COURSES.find(c => c.id === "sql-mastery")!);
      if (goal === "exams" || goal === "transition") {
        sequence.push(COURSES.find(c => c.id === "statistics-found")!);
        sequence.push(COURSES.find(c => c.id === "machine-learning-pragmatic")!);
      }
      advice = "Start immediately with core syntax rather than complex mathematical formulas. We build structural logic barriers in Python, then bridge to relational algebra using SQL before diving into machine learning matrices.";
      timeline = hours === "low" ? "6 Months (3-4 hrs/wk)" : "3 Months (10+ hrs/wk)";
    } else if (bg === "python") {
      sequence.push(COURSES.find(c => c.id === "sql-mastery")!);
      sequence.push(COURSES.find(c => c.id === "statistics-found")!);
      sequence.push(COURSES.find(c => c.id === "machine-learning-pragmatic")!);
      if (goal === "ai") {
        sequence.push(COURSES.find(c => c.id === "deep-learning-adv")!);
      }
      advice = "Since you possess foundational loops and dictionary logic, your primary focus should be relational wrangling using CTE window formulas and statistical variables testing prior to fitting machine learning models.";
      timeline = hours === "low" ? "4 Months (3-4 hrs/wk)" : "2 Months (10+ hrs/wk)";
    } else {
      // Developer / Research
      sequence.push(COURSES.find(c => c.id === "statistics-found")!);
      sequence.push(COURSES.find(c => c.id === "machine-learning-pragmatic")!);
      sequence.push(COURSES.find(c => c.id === "deep-learning-adv")!);
      advice = "Direct your attention to intermediate cost optimization, backpropagation matrices, and custom Transformers. Standard engineering loops are second nature to you, so focusing on mathematical convergence functions is key.";
      timeline = hours === "low" ? "3 Months (3-4 hrs/wk)" : "1.5 Months (10+ hrs/wk)";
    }

    setGeneratedRoadmap({
      sequence,
      advice,
      timeline,
      bgLabel: bg === "beginner" ? "Absolute Coding Beginner" : bg === "python" ? "Basic Python Familiarity" : "Experienced Engineer/Researcher",
      goalLabel: goal === "exams" ? "College Exams Prep" : goal === "transition" ? "Career Transitioning" : goal === "ai" ? "Mastering Deep Learning/AI" : "Enterprise Consulting Preparation"
    });
    setQuizStep(4);
  };

  const handleResetQuiz = () => {
    setQuizStep(1);
    setQuizAns1("");
    setQuizAns2("");
    setQuizAns3("");
    setGeneratedRoadmap(null);
  };

  // Filter cheatsheets list
  const filteredCheatsheets = React.useMemo(() => {
    if (!cheatsheetSearch.trim()) return CHEATSHEETS;
    const query = cheatsheetSearch.toLowerCase();
    
    return CHEATSHEETS.map((sheet) => {
      const filteredCmds = sheet.commands.filter((cmd) => 
        cmd.code.toLowerCase().includes(query) || 
        cmd.desc.toLowerCase().includes(query)
      );
      return { ...sheet, commands: filteredCmds };
    }).filter((sheet) => sheet.commands.length > 0);
  }, [cheatsheetSearch]);

  return (
    <section className="bg-transparent py-20 px-4 sm:px-6 lg:px-8" id="learning">
      <div className="max-w-7xl mx-auto">
        
        {/* TAB Switch header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white font-mono">
            <span>Student Curriculum Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Learning Pathways & Reference
          </h2>
          
          {/* Main hub tab selectors */}
          <div className="flex justify-center pt-4" id="learning-hub-tabs">
            <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex font-mono text-xs backdrop-blur-md">
              <button
                onClick={() => setActiveTab("courses")}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                  activeTab === "courses" ? "bg-white/10 text-emerald-400 border border-white/5" : "text-slate-400 hover:text-white"
                }`}
              >
                1. Standard Curriculums
              </button>
              <button
                onClick={() => setActiveTab("roadmap")}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                  activeTab === "roadmap" ? "bg-white/10 text-emerald-400 border border-white/5" : "text-slate-400 hover:text-white"
                }`}
              >
                2. AI Career Roadmap Generator
              </button>
              <button
                onClick={() => setActiveTab("cheatsheets")}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                  activeTab === "cheatsheets" ? "bg-white/10 text-emerald-400 border border-white/5" : "text-slate-400 hover:text-white"
                }`}
              >
                3. Analytical Cheatsheets
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB A: Courses Matrix */}
        {/* ========================================================= */}
        {activeTab === "courses" && (
          <div className="space-y-8" id="tab-courses-container">
            {/* Quick Filter Menu */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1">
                <Sliders className="h-3 w-3" />
                Select Subject Area:
              </span>
              {["all", "python", "sql", "ml", "deep-learning", "statistics"].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setTopicFilter(topic as any)}
                  className={`py-1 px-3 text-xs font-mono capitalize rounded border transition-all cursor-pointer ${
                    topicFilter === topic
                      ? "bg-white/10 border-white/15 text-emerald-400 font-semibold"
                      : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {topic === "all" ? "View All" : topic === "ml" ? "Machine Learning" : topic}
                </button>
              ))}
            </div>

            {/* Matrix of items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start" id="courses-grid-matrix">
              {filteredCourses.map((course) => {
                const isExpanded = expandedCourseId === course.id;
                return (
                  <div 
                    key={course.id}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 transition-all hover:bg-white/[0.07] hover:border-white/20 relative group backdrop-blur-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold ${
                            course.level === "Beginner" ? "bg-teal-950/60 text-teal-400" : course.level === "Intermediate" ? "bg-amber-950/60 text-amber-400" : "bg-red-950/60 text-red-400"
                          }`}>
                            {course.level}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">{course.duration}</span>
                        </div>
                        <h3 className="text-lg font-sans font-bold text-white tracking-tight">{course.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-normal max-w-md">
                          {course.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleToggleCourse(course.id)}
                        className="p-1.5 bg-white/5 border border-white/10 rounded hover:text-white transition-all cursor-pointer"
                        id={`toggle-syllabus-${course.id}`}
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4 text-emerald-400" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Syllabus Detail Section */}
                    {isExpanded && (
                      <div className="mt-5 pt-4 border-t border-white/5 space-y-3" id={`syllabus-box-${course.id}`}>
                        <span className="block text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">
                          Week-by-Week Syllabus Outline:
                        </span>
                        <ul className="space-y-2">
                          {course.curriculum.map((item, idx) => (
                            <li key={idx} className="flex gap-2 items-start text-xs sm:text-sm text-slate-300">
                              <span className="text-emerald-400 font-mono font-bold shrink-0">W{idx + 1}.</span>
                              <span className="font-sans leading-normal">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB B: Career Roadmap Generator */}
        {/* ========================================================= */}
        {activeTab === "roadmap" && (
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 max-w-2xl mx-auto rounded-2xl p-6 sm:p-8 backdrop-blur-md" id="tab-roadmap-container">
            
            {/* Step 1: Current background qualification */}
            {quizStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider block">QUESTION 01 OF 03</span>
                  <h3 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight">
                    What is your current analytical or coding background?
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { id: "beginner", label: "Absolute Coding Beginner", info: "Unfamiliar with terminal loops, arrays, or standard functions." },
                    { id: "python", label: "Basic Python / SQL Familiarity", info: "Understand core basic logic structures but cannot fit pipelines." },
                    { id: "developer", label: "Experienced Software Engineer", info: "Know full OOP coding interfaces but want to learn costs mathematics." }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setQuizAns1(opt.id);
                        setQuizStep(2);
                      }}
                      className="w-full text-left p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/15 hover:bg-black/60 transition-all cursor-pointer"
                    >
                      <span className="block text-sm font-sans font-bold text-white">{opt.label}</span>
                      <span className="block text-xs text-slate-500 mt-1">{opt.info}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Goal selection */}
            {quizStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider block">QUESTION 02 OF 03</span>
                  <h3 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight">
                    What is your primary analytical learning objective?
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { id: "exams", label: "Pass University ML & Stats Exams", info: "Focus on mathematical theorems, formulas, and hypothesis testing controls." },
                    { id: "transition", label: "Transition Careers into Data Roles", info: "Master Scikit-Learn pipelines, SQL window querying, and build solid GitHub profiles." },
                    { id: "ai", label: "Deploy Advanced Neural / LLM Services", info: "Integrate multi-modal models, PyTorch code, and manage fine-tuned APIs." }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setQuizAns2(opt.id);
                        setQuizStep(3);
                      }}
                      className="w-full text-left p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/15 hover:bg-black/60 transition-all cursor-pointer"
                    >
                      <span className="block text-sm font-sans font-bold text-white">{opt.label}</span>
                      <span className="block text-xs text-slate-500 mt-1">{opt.info}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Commitment Hours */}
            {quizStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider block">QUESTION 03 OF 03</span>
                  <h3 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight">
                    How many hours/week can you realistically commit?
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { id: "low", label: "Part-Time commitment: 2 - 5 Hrs/Wk", info: "Studying alongside demanding full-time jobs or other coursework." },
                    { id: "high", label: "Intensive commitment: 10+ Hrs/Wk", info: "Dedicated bootcamp hours for accelerated professional scaling." }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setQuizAns3(opt.id);
                        // Complete quiz and trigger sequence calculation
                        const finalVal = opt.id;
                        setQuizAns3(finalVal);
                        setTimeout(handleGenerateRoadmap, 100);
                      }}
                      className="w-full text-left p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/15 hover:bg-black/60 transition-all cursor-pointer"
                    >
                      <span className="block text-sm font-sans font-bold text-white">{opt.label}</span>
                      <span className="block text-xs text-slate-500 mt-1">{opt.info}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Results output */}
            {quizStep === 4 && generatedRoadmap && (
              <div className="space-y-6 text-left" id="roadmap-outputs">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <Compass className="h-6 w-6 text-emerald-400" />
                  <div>
                    <h3 className="text-lg font-sans font-bold text-white">Your Personalized Study Roadmap</h3>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mt-0.5">
                      Based on profile: {generatedRoadmap.bgLabel} • Goal: {generatedRoadmap.goalLabel}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-500 block">Recommended Timeline</span>
                    <span className="text-white font-bold block mt-1 text-sm">{generatedRoadmap.timeline}</span>
                  </div>
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-500 block">Required Courses Units</span>
                    <span className="text-white font-bold block mt-1 text-sm">{generatedRoadmap.sequence.length} Core Modules</span>
                  </div>
                </div>

                {/* sequence roadmap path */}
                <div className="space-y-4 pt-1">
                  <span className="block text-xs font-mono text-slate-400 uppercase tracking-wider">Suggested Course Sequence:</span>
                  <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 mt-1 before:w-0.5 before:bg-white/5">
                    {generatedRoadmap.sequence.map((course: Course, idx: number) => (
                      <div key={course.id} className="flex gap-4 items-start relative pl-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 z-10 shrink-0 shadow shadow-emerald-500/50"></div>
                        <div className="flex-1 bg-black/40 p-3 rounded-xl border border-white/5">
                          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wide">PHASE {idx + 1}</span>
                          <span className="block text-xs font-sans font-bold text-white mt-0.5">{course.title}</span>
                          <span className="block text-[10px] text-slate-500 mt-1">{course.duration} duration</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* advice check text */}
                <div className="bg-black/40 p-4 border border-white/5 rounded-xl text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mt-2">
                  <strong className="text-emerald-400 block mb-1">Albert's Professional Mentorship Advice:</strong>
                  {generatedRoadmap.advice}
                </div>

                {/* Reset button slider */}
                <button
                  onClick={handleResetQuiz}
                  className="w-full py-3 bg-white/5 text-slate-400 font-mono text-xs border border-white/10 rounded-xl hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  Regenerate Roadmap Quiz
                </button>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB C: Searchable cheatsheets */}
        {/* ========================================================= */}
        {activeTab === "cheatsheets" && (
          <div className="space-y-6" id="tab-cheatsheets-container">
            {/* Search inputs */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search Python, Pandas, SQL commands..."
                value={cheatsheetSearch}
                onChange={(e) => setCheatsheetSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            {/* List sheets */}
            <div className="grid grid-cols-1 gap-8" id="cheatsheets-logs-container">
              {filteredCheatsheets.map((sheet, sIdx) => (
                <div key={sIdx} className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-4 backdrop-blur-md">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                    {sheet.category} • {sheet.title}
                  </span>

                  <div className="space-y-3 pt-1">
                    {sheet.commands.map((cmd, cIdx) => {
                      const elementId = `code-cmd-${sIdx}-${cIdx}`;
                      return (
                        <div 
                          key={cIdx} 
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/40 border border-white/5 p-4 rounded-xl"
                        >
                          <div className="space-y-1 text-left min-w-0">
                            <code className="text-teal-300 font-mono text-[11px] sm:text-xs block overflow-x-auto whitespace-nowrap">
                              {cmd.code}
                            </code>
                            <span className="text-xs text-slate-400 font-sans block leading-normal">
                              {cmd.desc}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => handleCopyCode(cmd.code, elementId)}
                            className="bg-white/5 text-slate-400 p-2 border border-white/10 rounded hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0 w-8 h-8"
                          >
                            {copiedCodeId === elementId ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {filteredCheatsheets.length === 0 && (
                <span className="block text-center text-slate-500 font-mono text-sm">
                  No matching cheatsheet rules exist. Try typing different keywords.
                </span>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
