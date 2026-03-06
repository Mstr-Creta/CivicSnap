import React from 'react';
import { Heart, Repeat, MessageCircle, Share, MoreHorizontal, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Issue } from '../types';
import { cn } from '../lib/utils';

interface IssueFeedProps {
  issues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

export default function IssueFeed({ issues, onIssueClick }: IssueFeedProps) {
  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return "now";
  };

  return (
    <div className="pb-32 pt-4 sm:pt-6 pt-safe">
      {/* Stories Bar */}
      <div className="px-5 mb-6 overflow-x-auto no-scrollbar flex gap-4">
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <div className="w-16 h-16 rounded-full border-2 border-slate-100 p-0.5 relative">
            <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center overflow-hidden">
              <img src="https://i.pravatar.cc/100?u=me" alt="me" />
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-brand-black rounded-full border-2 border-white flex items-center justify-center text-white">
              <span className="text-xs font-bold leading-none">+</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-400">Your Story</span>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-brand-black p-0.5">
              <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden border border-white">
                <img src={`https://i.pravatar.cc/100?u=user${i}`} alt={`user${i}`} />
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-900">@citizen_{i}</span>
          </div>
        ))}
      </div>

      {/* Feed Header */}
      <div className="px-5 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-lg font-bold">Latest</span>
          <ChevronDown size={20} />
        </div>
        <div className="flex items-center gap-1 text-slate-500 cursor-pointer">
          <SlidersHorizontal size={18} />
          <span className="text-sm font-medium">Filter</span>
        </div>
      </div>
      
      <div className="divide-y divide-slate-100">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="px-5 py-5 space-y-3"
          >
            {/* Header: User Info */}
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                  <img src={`https://i.pravatar.cc/100?u=${issue.id}`} alt="user" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold">@citizen_{issue.id.slice(0, 4)}</span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-slate-400 text-xs">{timeAgo(issue.reportedAt)}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Bhubaneswar</p>
                </div>
              </div>
              <button className="text-slate-400">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <p className="text-[15px] leading-relaxed text-slate-800">
                <span className="font-bold text-brand-black mr-1">#{issue.category.replace(' ', '')}</span>
                {issue.description}
              </p>

              {issue.photoUrl && (
                <div 
                  onClick={() => onIssueClick(issue)}
                  className="w-full rounded-2xl overflow-hidden border border-slate-100 cursor-pointer"
                >
                  <img 
                    src={issue.photoUrl} 
                    alt={issue.category} 
                    className="w-full h-auto object-cover max-h-80" 
                  />
                </div>
              )}
            </div>

            {/* Interaction Row */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-6 text-slate-500">
                <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                  <span className="text-xs font-medium">{issue.votes}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-green-500 transition-colors">
                  <Repeat size={20} />
                  <span className="text-xs font-medium">0</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                  <MessageCircle size={20} />
                  <span className="text-xs font-medium">3 Comments</span>
                </button>
              </div>
              <button className="text-slate-500">
                <Share size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
