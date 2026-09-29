import React, { useState } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';

export const ChatInput = ({ onSendMessage, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSendMessage(query.trim());
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2">
      <form
        onSubmit={handleSubmit}
        className="relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 focus-within:border-sky-500/80 rounded-2xl shadow-xl shadow-black/40 transition-all duration-200"
      >
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Where would you like to travel? (e.g. I want to visit Tamil Nadu on 2026-10-15...)"
          disabled={isLoading}
          rows={2}
          className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm sm:text-base p-4 pr-32 focus:outline-none resize-none min-h-[60px] max-h-[140px]"
        />

        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-sky-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-sky-500 disabled:hover:to-indigo-600 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Thinking...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Ask Assistant</span>
              </>
            )}
          </button>
        </div>
      </form>
      <div className="flex justify-between items-center px-2 mt-2 text-[11px] text-slate-400">
        <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">Shift+Enter</kbd> for line break</span>
        <span>Powered by LangChain + FastAPI</span>
      </div>
    </div>
  );
};

export default ChatInput;
