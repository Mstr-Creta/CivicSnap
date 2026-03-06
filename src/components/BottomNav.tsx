import React from 'react';
import { Home, CheckSquare, Users, Bell, User } from 'lucide-react';
import { AppView } from '../types';
import { cn } from '../lib/utils';

interface BottomNavProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

export default function BottomNav({ activeView, onViewChange }: BottomNavProps) {
  const isDark = false;
  
  const tabs = [
    { id: 'map', label: 'Home', icon: Home },
    { id: 'feed', label: 'Following', icon: CheckSquare },
    { id: 'spaces', label: 'Spaces', icon: Users },
    { id: 'notifications', label: 'Notification', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 border-t pb-safe z-50 transition-colors duration-300",
      isDark ? "bg-slate-950 border-white/5" : "bg-white border-slate-100"
    )}>
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id as AppView)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive 
                  ? (isDark ? "text-emerald-500" : "text-brand-black") 
                  : (isDark ? "text-slate-600" : "text-slate-400")
              )}
              aria-label={tab.label}
            >
              <Icon size={22} className={cn("mb-1", isActive && "stroke-[2.5px]")} />
              <span className="text-[9px] font-bold tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
