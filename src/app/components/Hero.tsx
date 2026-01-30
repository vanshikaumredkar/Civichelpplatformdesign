import React from "react";
import { ArrowRight, FileText, Info, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-green-100 dark:bg-green-900/10 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-6">
              <ShieldCheck className="text-blue-700" size={16} />
              <span className="text-xs font-bold text-blue-800 dark:text-blue-200 uppercase tracking-widest">Empowering Citizens</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-blue-950 dark:text-white">
              Smarter Solutions for <br />
              <span className="text-blue-700">Better Governance</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              CivicConnect is your direct link to local authorities. Report public infrastructure issues, track resolutions in real-time, and help us build a cleaner, safer community together.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate("report")}
                className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-200 dark:shadow-none transition-all flex items-center space-x-2 group"
              >
                <FileText size={20} />
                <span>Report an Issue</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate("about")}
                className="px-8 py-4 bg-white dark:bg-muted border-2 border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300 rounded-xl font-bold text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center space-x-2"
              >
                <Info size={20} />
                <span>Learn More</span>
              </button>
            </div>

            <div className="mt-12 flex items-center space-x-8 opacity-60">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-950 dark:text-white">50k+</span>
                <span className="text-xs font-semibold uppercase">Reports Fixed</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-950 dark:text-white">120+</span>
                <span className="text-xs font-semibold uppercase">Areas Covered</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-950 dark:text-white">4.8/5</span>
                <span className="text-xs font-semibold uppercase">User Rating</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-muted">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                alt="Modern Civic Office" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 to-transparent" />
            </div>
            
            {/* Floating Card 1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -right-6 bg-white dark:bg-card p-4 rounded-2xl shadow-xl border border-blue-50 dark:border-blue-900 flex items-center space-x-3 max-w-[200px]"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <Zap size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase">Fast Response</div>
                <div className="text-sm font-bold">Verified in 24h</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
