/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import MapView from './components/MapView';
import IssueFeed from './components/IssueFeed';
import Profile from './components/Profile';
import ReportFlow from './components/ReportFlow';
import IssueDetails from './components/IssueDetails';
import { AppView, Issue } from './types';
import { MOCK_ISSUES } from './constants';
import { Plus } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('map');
  const [issues, setIssues] = useState<Issue[]>(MOCK_ISSUES);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isReporting, setIsReporting] = useState(false);

  // Handle back button for modals
  useEffect(() => {
    const handlePopState = () => {
      if (isReporting) {
        setIsReporting(false);
      } else if (selectedIssue) {
        setSelectedIssue(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isReporting, selectedIssue]);

  const handleReportSubmit = (newIssueData: Partial<Issue>) => {
    const newIssue: Issue = {
      id: Math.random().toString(36).substr(2, 9),
      category: newIssueData.category!,
      description: newIssueData.description || '',
      location: newIssueData.location!,
      status: 'open',
      votes: 0,
      reportedAt: new Date().toISOString(),
      photoUrl: newIssueData.photoUrl,
      distance: 'Just now'
    };
    
    setIssues([newIssue, ...issues]);
  };

  const isDarkView = false;

  return (
    <div className="min-h-screen bg-white flex flex-col w-full max-w-md mx-auto relative md:shadow-2xl overflow-hidden">
      {activeView !== 'profile' && (
        <div className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 pt-safe bg-white/80 backdrop-blur-md text-slate-900"
        )}>
          <Header isDark={isDarkView} />
        </div>
      )}

      <main className={cn(
        "flex-1 relative overflow-hidden",
        activeView !== 'profile' && activeView !== 'map' && "mt-16"
      )}>
        <AnimatePresence mode="wait">
          {activeView === 'map' && (
            <motion.div 
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <MapView 
                issues={issues} 
                onIssueClick={(issue) => setSelectedIssue(issue)} 
              />
            </motion.div>
          )}

          {activeView === 'feed' && (
            <motion.div 
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-y-auto"
            >
              <IssueFeed 
                issues={issues} 
                onIssueClick={(issue) => setSelectedIssue(issue)} 
              />
            </motion.div>
          )}

          {activeView === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-y-auto no-scrollbar"
            >
              <Profile />
            </motion.div>
          )}

          {(activeView === 'spaces' || activeView === 'notifications') && (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center bg-white"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-black rounded-full animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-slate-900">Coming Soon</h3>
                <p className="text-slate-500 text-sm font-medium max-w-[200px]">We're working hard to bring you {activeView} features!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        {(activeView === 'map' || activeView === 'feed') && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsReporting(true)}
            className="fixed bottom-24 right-6 w-14 h-14 bg-brand-black text-white rounded-full shadow-xl flex items-center justify-center z-30"
          >
            <Plus size={28} strokeWidth={2.5} />
          </motion.button>
        )}
      </main>

      <BottomNav activeView={activeView} onViewChange={setActiveView} />

      {/* Modals */}
      <AnimatePresence>
        {isReporting && (
          <ReportFlow 
            onClose={() => setIsReporting(false)} 
            onSubmit={handleReportSubmit}
          />
        )}
        
        {selectedIssue && (
          <IssueDetails 
            issue={selectedIssue} 
            onClose={() => setSelectedIssue(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
