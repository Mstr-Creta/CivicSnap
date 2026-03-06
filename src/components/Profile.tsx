import React from 'react';
import { ArrowLeft, Search, MoreHorizontal, ChevronDown, SlidersHorizontal, Heart, Repeat, MessageCircle, Share } from 'lucide-react';
import { Issue } from '../types';
import { MOCK_ISSUES } from '../constants';

export default function Profile() {
  const userIssues = MOCK_ISSUES.slice(0, 2);

  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    return "now";
  };

  return (
    <div className="pb-32">
      {/* Profile Header Nav */}
      <div className="px-5 h-14 sm:h-16 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10 pt-safe">
        <button className="text-slate-900">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-5 text-slate-900">
          <Search size={22} />
          <MoreHorizontal size={22} />
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-5 pt-4 space-y-5">
        <div className="flex items-center justify-between">
          <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-100 overflow-hidden">
            <img src="https://i.pravatar.cc/300?u=bhubaneswar" alt="Avatar" />
          </div>
          <div className="flex gap-8 pr-4">
            <div className="text-center">
              <p className="text-lg font-bold leading-none">12</p>
              <p className="text-xs text-slate-400 mt-1">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold leading-none">89</p>
              <p className="text-xs text-slate-400 mt-1">People</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold leading-none text-green-500">4</p>
              <p className="text-xs text-slate-400 mt-1">Online</p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Satyajit Sahoo</h2>
          <p className="text-sm text-slate-400 font-medium">@citizen_satyajit</p>
        </div>

        <p className="text-[15px] text-slate-700 leading-relaxed">
          Active citizen of Bhubaneswar. Working towards a cleaner and safer city for everyone. #BhubaneswarFixIt
        </p>

        <div className="flex gap-3">
          <button className="flex-1 h-11 rounded-full border border-slate-900 font-bold text-sm hover:bg-slate-50 transition-colors">
            Joined
          </button>
          <button className="flex-1 h-11 rounded-full bg-slate-100 font-bold text-sm hover:bg-slate-200 transition-colors">
            Information
          </button>
        </div>
      </div>

      {/* Tabs / Content */}
      <div className="mt-8">
        <div className="px-5 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-lg font-bold">All</span>
            <ChevronDown size={20} />
          </div>
          <div className="flex items-center gap-1 text-slate-500 cursor-pointer">
            <SlidersHorizontal size={18} />
            <span className="text-sm font-medium">Filter</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {userIssues.map((issue) => (
            <div key={issue.id} className="px-5 py-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                    <img src="https://i.pravatar.cc/100?u=bhubaneswar" alt="user" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold">@citizen_satyajit</span>
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-slate-400 text-xs">{timeAgo(issue.reportedAt)}</span>
                    </div>
                  </div>
                </div>
                <button className="text-slate-400">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-[15px] leading-relaxed text-slate-800">
                  <span className="font-bold text-brand-black mr-1">#{issue.category.replace(' ', '')}</span>
                  {issue.description}
                </p>
                {issue.photoUrl && (
                  <div className="w-full rounded-2xl overflow-hidden border border-slate-100">
                    <img src={issue.photoUrl} alt={issue.category} className="w-full h-auto object-cover max-h-60" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-6 text-slate-500">
                  <button className="flex items-center gap-1.5">
                    <Heart size={20} />
                    <span className="text-xs font-medium">{issue.votes}</span>
                  </button>
                  <button className="flex items-center gap-1.5">
                    <Repeat size={20} />
                    <span className="text-xs font-medium">0</span>
                  </button>
                  <button className="flex items-center gap-1.5">
                    <MessageCircle size={20} />
                    <span className="text-xs font-medium">4 Comments</span>
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
    </div>
  );
}
