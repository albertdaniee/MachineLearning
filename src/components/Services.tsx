/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GraduationCap, Users2, Brain, ShieldAlert, CheckCircle2, UserCheck, Calendar } from "lucide-react";

interface ServicesProps {
  onNavigate: (sectionId: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const serviceCategories = [
    {
      id: "tutoring",
      icon: <GraduationCap className="h-6 w-6 text-teal-400" />,
      title: "1-on-1 Data Science Tutoring",
      subtitle: "University & Professional Mentorship",
      tagline: "Hourly Sessions or Focused Study Packages",
      desc: "Struggling with advanced machine learning theory, complex SQL joins, or writing Pandas wrangling wrappers? I provide personalized, concept-deep, exam-prep tutoring that builds strong analytical logical blocks.",
      features: [
        "Jupyter Notebook live coding & code reviews",
        "Exam review & study prep (SciKit-Learn, NumPy, PyTorch)",
        "SQL query design (CTEs, indices, partitioning)",
        "Mock quantitative interviewing prep",
        "Personal github portfolio guidance"
      ],
      pricing: "Flexible rates",
      slug: "tutoring"
    },
    {
      id: "training",
      icon: <Users2 className="h-6 w-6 text-emerald-400" />,
      title: "Corporate & Team Training",
      subtitle: "Group Cohorts & Bootcamps",
      tagline: "Customized Workforce Upskilling",
      desc: "Upskill your analysts, product managers, or engineering teams to confidently manipulate data, interpret statistical metrics, design robust A/B testing protocols, or query complex data lakes effectively.",
      features: [
        "Tailored custom corporate curriculum",
        "Hands-on bootcamp sandbox exercises",
        "A/B Testing experimental design blueprints",
        "Transitioning from spreadsheets to Python/Pandas",
        "Group code walkthroughs & architecture reviews"
      ],
      pricing: "Corporate quotes",
      slug: "cohorts"
    },
    {
      id: "consulting",
      icon: <Brain className="h-6 w-6 text-amber-400" />,
      title: "AI & ML Enterprise Consulting",
      subtitle: "Bespoke Technical Architecture",
      tagline: "Production-grade Pipelines & Deployed Models",
      desc: "Stop relying solely on out-of-the-box, third-party black-box tools. I collaborate with your leadership to construct actual predictive classification layers, clean database integrations, and implement LLM systems.",
      features: [
        "Multi-variate forecasting & classification structures",
        "Enterprise data warehouse schemas (Snowflake, BigQuery)",
        "Prompt engineering, fine-tuning, & RAG setup with Gemini",
        "Data leakage audits & modeling bias reduction",
        "AWS/GCP scalable pipeline deployment support"
      ],
      pricing: "Retainer or project",
      slug: "consulting"
    }
  ];

  return (
    <section className="bg-transparent py-20 px-4 sm:px-6 lg:px-8" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white font-mono">
            <span>Our Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Comprehensive Data Expertise & Coaching
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Bespoke instruction models, analytics consulting, and robust engineering workflows designed to eliminate black box guesswork.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {serviceCategories.map((service, index) => (
            <div 
              key={service.id}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 hover:scale-[1.01] transition-all duration-300 relative group backdrop-blur-md"
              id={`service-card-${service.id}`}
            >
              {/* Card top section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <div className="px-2.5 py-1 bg-white/5 rounded text-[10px] font-mono text-slate-400 tracking-wider border border-white/5">
                    {service.pricing}
                  </div>
                </div>

                <div className="space-y-1 mb-5">
                  <span className="block text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">{service.subtitle}</span>
                  <h3 className="block text-xl font-sans font-bold text-white tracking-tight">{service.title}</h3>
                  <span className="block text-xs text-slate-500 font-sans italic">{service.tagline}</span>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>

                {/* Features list */}
                <div className="space-y-2.5 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-300 font-sans leading-normal">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                id={`btn-service-book-${service.id}`}
                onClick={() => onNavigate("contact")}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 text-slate-300 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all cursor-pointer font-medium text-xs font-sans mt-auto"
              >
                <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                Inquire & Book Session
              </button>
            </div>
          ))}
        </div>

        {/* Quick Consulting Banner */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 sm:p-10 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 backdrop-blur-md">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              <UserCheck className="h-5 w-5 text-emerald-400" />
              Not sure which service fits your scenario?
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Schedule a 15-minute quick intake consultation. We'll outline your learning curriculum, review your company's schema bottlenecks, and create a custom tailored cost projection.
            </p>
          </div>
          <button
            onClick={() => onNavigate("contact")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-900/40 transition-all whitespace-nowrap cursor-pointer"
            id="service-cta-consult-btn"
          >
            Claim Free Intake Chat
          </button>
        </div>

      </div>
    </section>
  );
}
