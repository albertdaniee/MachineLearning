/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MessageSquare, Send, Sparkles, User, RefreshCw, X, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function GeminiAssistant() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hello! I am Albert's virtual Data Science & AI twin. Ask me anything about Python coding, SQL optimization, statistical models, or inquiring about my bootcamps and tutoring sessions!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState<string | null>(null);
  const chatBottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const quickPrompts = [
    "Explain Gini Impurity intuitively",
    "Show Scikit-Learn training syntax",
    "What is included in private tutoring?",
    "Write a SQL window query example"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    setErrorText(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsLoading(true);

    try {
      // Map existing messages to history format required by Express backend (excluding ids/dates)
      const historyList = messages.map(msg => ({
        role: msg.role,
        text: msg.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyList
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to retrieve response from assistant.");
      }

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "model",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Error connecting with virtual assistant:", err);
      setErrorText(err.message || "An unexpected error occurred. Please make sure the Gemini API key is configured.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: "Hi again! Let's start fresh. What can I help you demystify or code today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorText(null);
  };

  return (
    <section className="bg-transparent border-y border-white/5 py-16 px-4 sm:px-6 lg:px-8" id="virtual-assistant">
      <div className="max-w-4xl mx-auto">
        
        {/* Module Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white font-mono">
            <span>Server-side AI</span>
          </div>
          <h2 className="text-3xl font-sans font-bold text-white tracking-tight">
            Consult Albert's AI Assistant
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm">
            Powered by Google Gemini 3.5. Trained to assist with algorithmic debugging, coding roadmaps, and tutoring info.
          </p>
        </div>

        {/* Chat Widget Base Container */}
        <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[520px] backdrop-blur-md" id="chat-assistant-container">
          
          {/* Chat Header */}
          <div className="bg-white/5 px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse"></span>
                <div className="bg-black/20 p-1.5 rounded-lg border border-white/10">
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="block text-xs font-mono text-emerald-400 font-semibold leading-none">VIRTUAL ASSISTANT</span>
                <span className="block text-sm font-sans font-bold text-white mt-1">Albert's Digital Twin</span>
              </div>
            </div>
            
            <button 
              onClick={clearChatHistory}
              title="Clear Chat History"
              className="p-1.5 bg-white/5 text-slate-400 border border-white/10 rounded hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Chat output feed */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans select-text scrollbar-thin scrollbar-thumb-slate-800" id="chat-message-feed">
            {messages.map((msg) => {
              const isAssistant = msg.role === "model";
              return (
                <div 
                  key={msg.id}
                  className={`flex items-start gap-3 max-w-[85%] ${isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                >
                  <div className={`p-1.5 rounded-lg border text-slate-300 ${isAssistant ? "bg-white/10 border-white/10" : "bg-white/5 border-white/20"}`}>
                    {isAssistant ? <Sparkles className="h-4 w-4 text-emerald-400" /> : <User className="h-4 w-4 text-emerald-400" />}
                  </div>
                  
                  <div className="space-y-1">
                    <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAssistant 
                        ? "bg-black/40 text-slate-350 border border-white/5 rounded-tl-none whitespace-pre-wrap"
                        : "bg-emerald-950/20 text-emerald-100 border border-emerald-500/20 rounded-tr-none"
                    }`}>
                      {msg.text}
                    </div>
                    <span className={`block text-[9px] font-mono text-slate-500 ${isAssistant ? "text-left" : "text-right"}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Pulsing loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-3 mr-auto max-w-[80%] animate-pulse">
                <div className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300">
                  <Sparkles className="h-4 w-4 text-emerald-400 animate-spin" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-400 font-mono">
                  Synthesizing analytical response...
                </div>
              </div>
            )}

            {/* Error notifications */}
            {errorText && (
              <div className="p-3 bg-red-950/30 border border-red-900/60 rounded-xl flex items-start gap-2.5 text-red-200 text-xs font-mono">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Execution Error</p>
                  <p>{errorText}</p>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick suggestions items bar */}
          <div className="bg-black/20 px-5 py-2.5 border-t border-white/5 overflow-x-auto flex gap-2 select-none" id="suggestions-bubbles-bar">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSendMessage(p)}
                disabled={isLoading}
                className="px-3 py-1 bg-white/5 text-slate-300 border border-white/10 text-[10px] rounded-full hover:text-white hover:bg-white/10 transition-all whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input control form bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className="p-3.5 bg-white/5 border-t border-white/10 flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask about Pandas syntax, KNN mechanics, consulting..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-black/40 text-xs sm:text-sm text-slate-200 border border-white/10 px-4 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500 placeholder-slate-500 transition-all disabled:opacity-60 font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl shadow-md active:scale-95 disabled:scale-100 disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
