import React from 'react';
import { Search, MoreHorizontal, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  isDark?: boolean;
}

export default function Header({ isDark }: HeaderProps) {
  return (
    <header className={cn(
      "h-16 flex items-center justify-between px-5 transition-colors duration-300",
      isDark ? "text-white" : "text-slate-900"
    )}>
      <div className="flex items-center gap-2 cursor-pointer">
        {isDark ? (
          <div className="flex flex-col">
            <h1 className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-500">System.Home</h1>
            <span className="text-[10px] font-mono text-slate-500">Bhubaneswar / Sector 7</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-black tracking-tight">Home</h1>
            <ChevronDown size={20} className="mt-0.5" />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-5">
        <Search size={22} className={cn(isDark && "text-slate-400")} />
        <MoreHorizontal size={22} className={cn(isDark && "text-slate-400")} />
      </div>
    </header>
  );
}
