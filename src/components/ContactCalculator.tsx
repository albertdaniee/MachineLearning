/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sliders, Mail, Calendar, Calculator, CheckCircle2, ShieldCheck, FileSpreadsheet, Send } from "lucide-react";
import { ConsultationRequest } from "../types";

export default function ContactCalculator() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [serviceType, setServiceType] = React.useState("tutoring");
  const [message, setMessage] = React.useState("");
  
  // Pricing Slider calculations states
  const [tutoringHours, setTutoringHours] = React.useState<number>(8);
  const [includeSyllabus, setIncludeSyllabus] = React.useState<boolean>(true);
  const [consultingTier, setConsultingTier] = React.useState<string>("medium"); // small (predictive models), medium (data warehouse pipelines), large (custom fine-tuned LLM system)

  // Local storage lists
  const [pastRequests, setPastRequests] = React.useState<ConsultationRequest[]>([]);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  // Load requests from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("idatascientist_requests");
    if (saved) {
      try {
        setPastRequests(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse past requests from localStorage");
      }
    }
  }, []);

  // Sync pricing estimates depending on sliding variables
  const calculatedFee = React.useMemo(() => {
    let price = 0;
    if (serviceType === "tutoring") {
      // hourly tutor fee = $75/hr
      price = tutoringHours * 75;
      if (includeSyllabus) {
        price += 150; // Flat fee custom syllabus configuration
      }
    } else if (serviceType === "training") {
      // average team training bootcamp = $3,500 flat
      price = 3500;
    } else {
      // consulting tier fee
      if (consultingTier === "small") {
        price = 2200; // standard classification model building
      } else if (consultingTier === "medium") {
        price = 4800; // SQL data lakes warehouse Snowflake pipelines
      } else {
        price = 9500; // enterprise deep learning and fine-tuned LLMs
      }
    }
    return price;
  }, [serviceType, tutoringHours, includeSyllabus, consultingTier]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newRequest: ConsultationRequest = {
      id: `request-${Date.now()}`,
      name,
      email,
      serviceType: serviceType === "tutoring" ? "1-on-1 Private Tutoring" : serviceType === "training" ? "Corporate Group Bootcamp" : "AI/ML Custom Consulting",
      message: message || "Requesting standard intake assessment.",
      estimatedFee: calculatedFee,
      submittedAt: new Date().toLocaleDateString("en-CA") + " at " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedList = [newRequest, ...pastRequests];
    setPastRequests(updatedList);
    localStorage.setItem("idatascientist_requests", JSON.stringify(updatedList));

    setName("");
    setEmail("");
    setMessage("");
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section className="bg-transparent border-y border-white/5 py-20 px-4 sm:px-6 lg:px-8" id="contact">
      <div className="max-w-7xl mx-auto">
        
        {/* Module Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white font-mono">
            <span>Enquiry Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Structure Your Estimate & Reserve
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Select parameters to calculate estimated fees instantly, then submit consultation bookings directly to Albert.
          </p>
        </div>

        {/* Double Column workspace: Sliders vs Form details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-12">
          
          {/* Column A: Slider pricing Calculator (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col justify-between backdrop-blur-md" id="pricing-calculator-block">
            <div className="space-y-6 text-left">
              <h3 className="text-lg font-sans font-semibold text-white tracking-tight flex items-center gap-2">
                <Calculator className="h-5 w-5 text-emerald-400" />
                Intelligent Service Estimator
              </h3>

              {/* Service switcher synced with main form */}
              <div className="space-y-2">
                <span className="block text-xs font-mono text-slate-400">Chosen Project Category</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "tutoring", label: "Tutoring" },
                    { id: "training", label: "Bootcamps" },
                    { id: "consulting", label: "Consulting" }
                  ].map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => setServiceType(srv.id)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                        serviceType === srv.id
                          ? "bg-white/10 text-emerald-400 border-white/10"
                          : "bg-white/5 text-slate-400 border-transparent hover:text-white"
                      }`}
                    >
                      {srv.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider variables depending on service Category */}
              {serviceType === "tutoring" && (
                <div className="space-y-4" id="calculator-tutoring-options">
                  <div className="space-y-2">
                    <label className="flex justify-between items-center text-xs font-mono text-slate-400">
                      <span>Tutoring Duration Package</span>
                      <span className="text-emerald-400 font-bold">{tutoringHours} Hours</span>
                    </label>
                    <input 
                      type="range"
                      min={2}
                      max={24}
                      step={2}
                      value={tutoringHours}
                      onChange={(e) => setTutoringHours(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer bg-white/5 h-1.5 rounded-lg"
                    />
                    <span className="block text-[10px] text-slate-500 font-mono text-right">Rate: $75/hr</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-white/5 mt-4">
                    <div className="text-left">
                      <span className="block text-xs font-sans font-bold text-slate-300">Tailored Curriculum Syllabus</span>
                      <span className="block text-[10px] text-slate-500 font-sans mt-0.5">Includes custom roadmap prep & milestone tests.</span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={includeSyllabus}
                      onChange={(e) => setIncludeSyllabus(e.target.checked)}
                      className="h-4 w-4 accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {serviceType === "training" && (
                <div className="p-4 bg-black/40 border border-white/5 rounded-xl text-left space-y-2" id="calculator-training-options">
                  <span className="block text-xs font-mono text-emerald-450 uppercase tracking-widest font-bold">Group Cohort Bootcamp Flat-Fee</span>
                  <p className="text-xs text-slate-400 leading-normal font-sans">
                    Our standard corporate cohort upskilling starts at a flat <strong>$3,500 CAD</strong> deliverable package. Covers up to 10 team participants with private code walkthrough sandboxes, custom dataset exercises, and exam certifications.
                  </p>
                </div>
              )}

              {serviceType === "consulting" && (
                <div className="space-y-4" id="calculator-consulting-options">
                  <span className="block text-xs font-mono text-slate-400">Consulting Project Scale</span>
                  <div className="space-y-2.5">
                    {[
                      { id: "small", label: "Predictive/Classification Model Fit", desc: "Building targeted analytical model pipelines with metrics report.", price: "$2,200 approx." },
                      { id: "medium", label: "Snowflake/Airflow Data Warehouse Integration", desc: "Constructing reliable staging layers & automated pipelines.", price: "$4,800 approx." },
                      { id: "large", label: "Enterprise Generative AI & Fine-Tuned LLMs", desc: "Deploying production-grade custom APIs & RAG networks.", price: "$9,500 approx." }
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => setConsultingTier(tier.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-start ${
                          consultingTier === tier.id
                            ? "bg-white/10 text-emerald-400 border-white/15"
                            : "bg-white/5 text-slate-400 border-white/5 hover:text-slate-200"
                        }`}
                      >
                        <div className="space-y-0.5 pr-3 text-left">
                          <span className="block text-xs font-sans font-bold text-white">{tier.label}</span>
                          <span className="block text-[10px] text-slate-500 leading-normal">{tier.desc}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400 whitespace-nowrap mt-0.5">{tier.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Total calculated estimates display */}
            <div className="bg-gradient-to-r from-blue-900/30 to-black/30 p-5 border border-white/10 rounded-xl flex items-center justify-between text-left mt-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Estimated Cost (CAD)</span>
                <span className="text-3xl font-sans font-extrabold text-white block">
                  ${calculatedFee.toLocaleString()}
                </span>
              </div>
              <div className="px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] font-mono rounded text-emerald-400">
                Coaching Included
              </div>
            </div>

          </div>

          {/* Column B: Booking and confirmation Form (7 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col justify-between backdrop-blur-md" id="booking-intake-form">
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <h3 className="text-lg font-sans font-semibold text-white tracking-tight flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-400" />
                Reserve Consultation Slot
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wide">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Albert Einstein"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wide">Your Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="einstein@princeton.edu"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Service picker binds back to calculator */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wide">Required Service Category</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-all cursor-pointer font-sans"
                >
                  <option value="tutoring">1-on-1 Private Tutoring (University study / career transition)</option>
                  <option value="training">Corporate Team Upskilling Bootcamp (Group study cohort)</option>
                  <option value="consulting">Bespoke Enterprise AI/ML Pipeline Consulting</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wide">Intake Context & Message Details</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline key files or algorithms you are currently stuck on, or describe your enterprise scheduling needs..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all resize-none font-sans"
                ></textarea>
              </div>

              {/* Success flags */}
              {submitSuccess && (
                <div className="p-3.5 bg-emerald-950/40 border border-emerald-900/60 rounded-xl flex items-start gap-2.5 text-emerald-200 text-xs font-mono" id="form-success-banner">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold">Consultation Booked!</p>
                    <p>Your estimation of ${calculatedFee.toLocaleString()} CAD has been locked into localStorage for audit.</p>
                  </div>
                </div>
              )}

              {/* Submit triggers local save */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-sm rounded-xl shadow-lg shadow-blue-900/40 active:scale-[0.98] transition-all cursor-pointer"
                id="btn-submit-consultation"
              >
                <Send className="h-4 w-4" />
                Submit Consultation Request & Reserve Estimate
              </button>
            </form>
          </div>

        </div>

        {/* Durable local list rendering showing past requested intakes */}
        {pastRequests.length > 0 && (
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-2xl space-y-4 text-left max-w-4xl mx-auto mt-10 backdrop-blur-md" id="past-reservations-cabinet">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
              Your Active Consultation Booking Submissions (Local Audit)
            </h4>

            <div className="divide-y divide-white/5 max-h-48 overflow-y-auto pr-2">
              {pastRequests.map((req) => (
                <div key={req.id} className="py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <span className="block text-xs font-sans font-bold text-white leading-none">
                      {req.name} ({req.email})
                    </span>
                    <span className="block text-[10px] font-mono text-slate-500 leading-none mt-1">
                      Service: {req.serviceType} • Date: {req.submittedAt}
                    </span>
                    <p className="text-[11px] text-slate-400 font-sans line-clamp-1 mt-1 font-sans">
                      Notes: {req.message}
                    </p>
                  </div>
                  <div className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-mono rounded text-emerald-400 shrink-0 font-bold">
                    Est: ${req.estimatedFee.toLocaleString()} CAD
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
