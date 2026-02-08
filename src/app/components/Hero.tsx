import React from "react";
import { ArrowRight, FileText, Info, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { translations } from "@/app/utils/translations";

interface HeroProps {
  onNavigate: (page: string) => void;
  language?: string;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, language = "en" }) => {
  const t = translations[language] || translations.en;
  
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Tiranga Watermark for Hero */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col opacity-[0.05] dark:opacity-[0.08]">
        <div className="h-[20%] w-full bg-[#FF9933]"></div>
        <div className="h-[60%] w-full bg-white dark:bg-slate-900 flex items-center justify-center">
          <div className="w-[500px] h-[500px] border-[16px] border-blue-900 rounded-full flex items-center justify-center relative">
            {[...Array(24)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full h-1.5 bg-blue-900" 
                style={{ transform: `rotate(${i * 15}deg)` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="h-[20%] w-full bg-[#128807]"></div>
      </div>

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
              <span className="text-xs font-bold text-blue-800 dark:text-blue-200 uppercase tracking-widest">
                {language === "hi" ? "नागरिकों का सशक्तिकरण" : "Empowering Citizens"}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-blue-950 dark:text-white">
              {t.heroTitle.split('Better')[0]} <br />
              <span className="text-blue-700">{t.heroTitle.split('Better')[1] || "Better Governance"}</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              {t.heroSub}
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate("report")}
                className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg transition-all flex items-center space-x-2 group"
              >
                <FileText size={20} />
                <span>{t.reportIssue}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate("about")}
                className="px-8 py-4 bg-white dark:bg-muted border-2 border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300 rounded-xl font-bold text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center space-x-2"
              >
                <Info size={20} />
                <span>{t.learnMore}</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
<div className="relative w-full flex justify-center">
  <div className="relative w-full max-w-2xl aspect-video">
    <iframe
      src="https://www.youtube.com/embed/_EKFkMGeZks"
      title="Swavlamban Bharat"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="absolute inset-0 w-full h-full rounded-2xl"
    />
  </div>
</div>


            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -right-6 bg-white dark:bg-card p-4 rounded-2xl shadow-xl border border-blue-50 dark:border-blue-900 flex items-center space-x-3 max-w-[200px]"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <Zap size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase">{language === "hi" ? "त्वरित प्रतिक्रिया" : "Fast Response"}</div>
                <div className="text-sm font-bold">{language === "hi" ? "24 घंटे में समाधान" : "Verified in 24h"}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
