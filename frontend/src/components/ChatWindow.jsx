import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { Plane, CloudSun, MapPin, Ticket, Sparkles, Loader2, AlertCircle } from 'lucide-react';

export const ChatWindow = ({ messages, isLoading, error, onSelectSuggestion }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const suggestions = [
    {
      title: 'Tamil Nadu Getaway',
      desc: 'Capital, weather & flights on Oct 15, 2026',
      query: 'I want to visit Tamil Nadu on 2026-10-15. Tell me the capital, weather and flights from Delhi.',
      icon: MapPin,
    },
    {
      title: 'Explore France',
      desc: 'Capital city & current weather conditions',
      query: 'I want to travel to France. What is the capital city and the current weather?',
      icon: CloudSun,
    },
    {
      title: 'Flight Search',
      desc: 'Flights to Japan with travel date 2026-11-20',
      query: 'Find the capital of Japan, current weather, and flights from Delhi for 2026-11-20.',
      icon: Ticket,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto py-12 animate-fade-in">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-cyan-400 p-0.5 shadow-2xl shadow-sky-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center">
                <Plane className="w-10 h-10 text-sky-400 transform -rotate-12 hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            ✈️ AI Travel Assistant
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-md font-medium mb-2">
            Plan your trip with AI
          </p>
          <p className="text-sm text-slate-400 max-w-md mb-8">
            Ask me about a destination, weather, capital city, or flights.
          </p>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {suggestions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => onSelectSuggestion(item.query)}
                  className="group p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-sky-500/50 transition-all duration-200 text-slate-200 flex flex-col justify-between hover:shadow-lg hover:shadow-sky-500/10 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 text-sky-400 mb-2">
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-xs tracking-wide uppercase">{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-snug line-clamp-2">{item.desc}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] text-sky-400 font-medium group-hover:translate-x-1 transition-transform">
                    <span>Try prompt</span>
                    <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-slate-300 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 max-w-[80%] sm:max-w-md animate-pulse shadow-md">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-sky-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> AI Travel Assistant is thinking...
                </p>
                <p className="text-xs text-slate-400">✈️ Travel Assistant is planning your trip...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 text-rose-300 bg-rose-950/40 border border-rose-800/60 rounded-2xl p-4 max-w-lg mx-auto shadow-md">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
