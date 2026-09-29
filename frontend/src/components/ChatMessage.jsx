import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Compass, Sparkles } from 'lucide-react';

export const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      {!isUser && (
        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 border border-white/20">
          <Compass className="w-5 h-5 animate-pulse" />
        </div>
      )}

      <div
        className={`relative max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 shadow-sm text-sm sm:text-base leading-relaxed ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-blue-500/10'
            : 'bg-slate-800/80 backdrop-blur-md text-slate-100 border border-slate-700/60 rounded-tl-none shadow-black/20'
        }`}
      >
        <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold opacity-75">
          {isUser ? (
            <span>You</span>
          ) : (
            <span className="flex items-center gap-1.5 text-sky-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> AI Travel Assistant
            </span>
          )}
          <span className="text-[10px] opacity-60 ml-auto">
            {message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="prose prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 text-slate-100">
          {isUser ? (
            <p className="whitespace-pre-wrap font-normal">{message.content}</p>
          ) : (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-700 flex items-center justify-center text-slate-200 border border-slate-600">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
