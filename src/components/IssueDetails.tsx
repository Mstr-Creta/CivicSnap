import React from 'react';
import { Heart, Repeat, MessageCircle, Share, MapPin, Clock, X, MoreHorizontal } from 'lucide-react';
import { Issue } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface IssueDetailsProps {
  issue: Issue;
  onClose: () => void;
}

export default function IssueDetails({ issue, onClose }: IssueDetailsProps) {
  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    return "just now";
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-white rounded-t-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
      >
        {/* Header */}
        <div className="px-5 h-14 flex items-center justify-between border-b border-slate-50 shrink-0">
          <button onClick={onClose} className="text-slate-900">
            <X size={24} />
          </button>
          <span className="font-bold">Post</span>
          <button className="text-slate-900">
            <MoreHorizontal size={22} />
          </button>
        </div>

        <div className="overflow-y-auto pb-10 pb-safe">
          {/* User Info */}
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-slate-100 overflow-hidden border border-slate-100">
              <img src={`https://i.pravatar.cc/100?u=${issue.id}`} alt="user" />
            </div>
            <div>
              <p className="text-[15px] font-bold">@citizen_{issue.id.slice(0, 4)}</p>
              <p className="text-xs text-slate-400">Bhubaneswar</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 space-y-4">
            <p className="text-lg leading-relaxed text-slate-900">
              <span className="font-bold mr-1">#{issue.category.replace(' ', '')}</span>
              {issue.description}
            </p>

            {issue.photoUrl && (
              <div className="w-full rounded-2xl overflow-hidden border border-slate-100">
                <img src={issue.photoUrl} alt={issue.category} className="w-full h-auto" />
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-slate-400 py-1">
              <span>{new Date(issue.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>•</span>
              <span>{new Date(issue.reportedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <div className="border-y border-slate-50 py-3 flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900">{issue.votes}</span>
                <span className="text-slate-400">Likes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900">0</span>
                <span className="text-slate-400">Reposts</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-around py-1 text-slate-500">
              <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <Heart size={22} />
              </button>
              <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                <Repeat size={22} />
              </button>
              <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                <MessageCircle size={22} />
              </button>
              <button className="flex items-center gap-2">
                <Share size={22} />
              </button>
            </div>
          </div>

          {/* Replies Placeholder */}
          <div className="mt-4 border-t border-slate-50">
            <div className="px-5 py-4 flex items-center gap-3 opacity-50">
              <div className="w-9 h-9 rounded-full bg-slate-100" />
              <div className="flex-1 h-10 bg-slate-50 rounded-full px-4 flex items-center text-slate-400 text-sm">
                Post your reply
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
