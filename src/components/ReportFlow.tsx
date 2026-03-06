import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, MapPin, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { IssueCategory, Issue } from '../types';
import { cn } from '../lib/utils';

interface ReportFlowProps {
  onClose: () => void;
  onSubmit: (data: Partial<Issue>) => void;
}

type Step = 'location' | 'photo' | 'details' | 'success';

const CATEGORIES: IssueCategory[] = ['Pothole', 'Garbage Dump', 'Streetlight', 'Water Logging', 'Other'];

export default function ReportFlow({ onClose, onSubmit }: ReportFlowProps) {
  const [step, setStep] = useState<Step>('location');
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [category, setCategory] = useState<IssueCategory | null>(null);
  const [description, setDescription] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation([position.coords.latitude, position.coords.longitude]);
          setIsLocating(false);
          setStep('photo');
        },
        (error) => {
          console.error("Error getting location", error);
          setIsLocating(false);
          alert("Could not get your location. Please enable GPS.");
        }
      );
    } else {
      setIsLocating(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        setStep('details');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!category || !location) return;
    
    onSubmit({
      category,
      description,
      location,
      photoUrl: photo || undefined,
      status: 'open',
      votes: 0,
      reportedAt: new Date().toISOString(),
    });
    setStep('success');
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white z-[60] flex flex-col"
    >
      {/* Header */}
      <div className="h-14 sm:h-16 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 pt-safe">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-500">
          <X size={24} />
        </button>
        <span className="font-bold text-slate-900">Report Issue</span>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-slate-100 w-full">
        <motion.div 
          className="h-full bg-brand-black"
          initial={{ width: '0%' }}
          animate={{ 
            width: step === 'location' ? '25%' : 
                   step === 'photo' ? '50%' : 
                   step === 'details' ? '75%' : '100%' 
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-safe">
        <AnimatePresence mode="wait">
          {step === 'location' && (
            <motion.div 
              key="location"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-slate-100 text-brand-black rounded-full flex items-center justify-center mx-auto">
                  <MapPin size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Where is the issue?</h2>
                <p className="text-slate-500">We need to know the exact spot to fix it.</p>
              </div>

              <button 
                onClick={handleUseCurrentLocation}
                disabled={isLocating}
                className="w-full h-16 bg-brand-black text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95 transition-transform disabled:opacity-70"
              >
                {isLocating ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <MapPin size={24} />
                    Use My Current Location
                  </>
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-400">OR</span>
                </div>
              </div>

              <button 
                onClick={() => setStep('photo')}
                className="w-full h-14 bg-slate-100 text-slate-600 rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                Pick on Map Manually
              </button>
            </motion.div>
          )}

          {step === 'photo' && (
            <motion.div 
              key="photo"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-orange-50 text-safety-orange rounded-full flex items-center justify-center mx-auto">
                  <Camera size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Take a Photo</h2>
                <p className="text-slate-500">A photo helps us understand the problem better.</p>
              </div>

              <label className="block w-full aspect-square border-4 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer overflow-hidden relative">
                {photo ? (
                  <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera size={48} className="text-slate-300" />
                    <span className="font-bold text-slate-400 text-lg">Tap to Open Camera</span>
                  </>
                )}
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoUpload} />
              </label>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep('location')}
                  className="flex-1 h-14 bg-slate-100 text-slate-600 rounded-2xl font-semibold"
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep('details')}
                  className="flex-[2] h-14 bg-brand-black text-white rounded-2xl font-bold shadow-lg shadow-slate-100"
                >
                  Skip Photo
                </button>
              </div>
            </motion.div>
          )}

          {step === 'details' && (
            <motion.div 
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">What's the issue?</h2>
                <p className="text-slate-500">Select a category and add details.</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "h-14 px-4 rounded-2xl border-2 flex items-center justify-between font-bold transition-all",
                      category === cat 
                        ? "border-brand-black bg-slate-50 text-brand-black" 
                        : "border-slate-100 bg-white text-slate-600"
                    )}
                  >
                    {cat}
                    {category === cat && <CheckCircle2 size={20} />}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Description (Optional)</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 100))}
                  placeholder="Tell us more about it..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-24 focus:ring-2 focus:ring-brand-black outline-none resize-none"
                />
                <div className="text-right text-xs text-slate-400">{description.length}/100</div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!category}
                className="w-full h-16 bg-brand-black text-white rounded-2xl font-bold text-lg shadow-lg shadow-slate-200 disabled:opacity-50"
              >
                Submit Report
              </button>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
            >
              <div className="w-24 h-24 bg-green-100 text-success-green rounded-full flex items-center justify-center">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">Thank You!</h2>
                <p className="text-slate-500 text-lg">Your report has been submitted to BMC. We'll keep you updated.</p>
              </div>
              <button 
                onClick={onClose}
                className="w-full h-16 bg-brand-black text-white rounded-2xl font-bold text-lg"
              >
                Back to Map
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
