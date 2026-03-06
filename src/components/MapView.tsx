import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Search, Activity, Shield, Users, Zap, AlertCircle, ChevronRight } from 'lucide-react';
import { BHUBANESWAR_CENTER, BHUBANESWAR_BOUNDS } from '../constants';
import { Issue } from '../types';
import { cn } from '../lib/utils';

// Custom DivIcon for a more "tech" look
const createCustomIcon = (status: string) => {
  const color = status === 'resolved' ? '#22c55e' : '#ef4444';
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-6 h-6 rounded-full opacity-20 animate-ping" style="background-color: ${color}"></div>
        <div class="relative w-3 h-3 rounded-full border-2 border-white shadow-lg" style="background-color: ${color}"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface MapViewProps {
  issues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

function MapBounds() {
  const map = useMap();
  useEffect(() => {
    map.setMaxBounds(BHUBANESWAR_BOUNDS);
  }, [map]);
  return null;
}

export default function MapView({ issues, onIssueClick }: MapViewProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-slate-100 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">System Booting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white text-slate-600 font-sans overflow-y-auto no-scrollbar pb-24 pt-16 sm:pt-20">
      {/* Dashboard Header Stats */}
      <div className="grid grid-cols-3 border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="p-3 sm:p-4 border-r border-slate-100 flex flex-col gap-0.5 sm:gap-1">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-mono">Active</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-bold text-slate-900 font-mono">24</span>
            <span className="text-[9px] sm:text-[10px] text-emerald-500 font-mono">+2</span>
          </div>
        </div>
        <div className="p-3 sm:p-4 border-r border-slate-100 flex flex-col gap-0.5 sm:gap-1">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-mono">Resolved</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-bold text-slate-900 font-mono">142</span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono">89%</span>
          </div>
        </div>
        <div className="p-3 sm:p-4 flex flex-col gap-0.5 sm:gap-1">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-mono">Trust</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-bold text-slate-900 font-mono">4.8</span>
            <span className="text-[9px] sm:text-[10px] text-emerald-500 font-mono">★</span>
          </div>
        </div>
      </div>

      {/* Main Map Widget */}
      <div className="p-3 sm:p-4">
        <div className="relative h-[250px] sm:h-[300px] rounded-2xl overflow-hidden border border-slate-200 shadow-xl group">
          <MapContainer
            center={BHUBANESWAR_CENTER}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MapBounds />
            {issues.map((issue) => (
              <Marker
                key={issue.id}
                position={issue.location}
                icon={createCustomIcon(issue.status)}
                eventHandlers={{
                  click: () => onIssueClick(issue),
                }}
              />
            ))}
          </MapContainer>

          {/* Map Overlay Controls */}
          <div className="absolute top-3 right-3 z-[400] flex flex-col gap-2">
            <button className="w-8 h-8 bg-white/90 backdrop-blur border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
              <Zap size={14} />
            </button>
            <button className="w-8 h-8 bg-white/90 backdrop-blur border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
              <Shield size={14} />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 z-[400]">
            <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-mono text-slate-900 uppercase tracking-widest">Live Feed Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions / Tools */}
      <div className="px-4 mb-6">
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {[
            { icon: Activity, label: 'Analytics', color: 'text-slate-900' },
            { icon: Users, label: 'Community', color: 'text-slate-900' },
            { icon: AlertCircle, label: 'Emergency', color: 'text-red-500' },
          ].map((tool) => (
            <button
              key={tool.label}
              className="shrink-0 flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 hover:bg-slate-100 transition-colors"
            >
              <tool.icon size={16} className={tool.color} />
              <span className="text-xs font-medium text-slate-900">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="px-4 space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold">Recent Intelligence</h3>
          <button className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
            VIEW ALL <ChevronRight size={10} />
          </button>
        </div>

        <div className="space-y-2">
          {issues.slice(0, 4).map((issue, idx) => (
            <div 
              key={issue.id}
              onClick={() => onIssueClick(issue)}
              className="group bg-slate-50/50 border border-slate-100 rounded-xl p-4 flex items-center gap-4 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
                {issue.photoUrl ? (
                  <img src={issue.photoUrl} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <Activity size={18} className="text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">#{issue.id.slice(0, 6)}</span>
                  <span className="text-[10px] font-mono text-emerald-500/80">{issue.distance}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate mb-0.5">{issue.category}</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{issue.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className={cn(
                  "px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider",
                  issue.status === 'resolved' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                )}>
                  {issue.status}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Zap size={10} /> {issue.votes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
