import React from "react";
import { Play, Shield, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Subtle Flag Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex flex-col h-full">
        <div className="bg-[#FF9933] flex-1"></div>
        <div className="bg-[#FFFFFF] flex-1 flex items-center justify-center">
          <div className="w-1/4 h-1/4 border-[12px] border-[#000080] rounded-full opacity-20"></div>
        </div>
        <div className="bg-[#138808] flex-1"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="Government of India Logo" 
                className="h-12"
              />
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Government of India Initiative</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Swavlamban <span className="text-[var(--saffron)]">Bharat</span> – 
              <br />
              <span className="text-[var(--ashoka-blue)]">Indian Solutions</span> for Civic Problems
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Empowering citizens to build clean, smart, and Atmanirbhar cities. 
              Report issues, track resolutions, and earn rewards for active civic participation.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[var(--ashoka-blue)] text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:-translate-y-1">
                Report an Issue
              </button>
              <button className="px-8 py-4 bg-white border-2 border-[var(--ashoka-blue)] text-[var(--ashoka-blue)] rounded-xl font-bold text-lg hover:bg-muted transition-all">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group">
              {/* YouTube Mockup */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                <div className="w-20 h-20 bg-[var(--saffron)] rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition-transform">
                  <Play fill="white" size={32} className="ml-1" />
                </div>
              </div>
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1558434088-935692b1f7b0?q=80&w=2070&auto=format&fit=crop" 
                alt="Indian Cityscape" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                2:45 / 3:30
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border p-4 rounded-xl shadow-xl hidden md:flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="text-green-600" size={24} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Issues Resolved</div>
                <div className="text-xl font-bold">1.2M+</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              Building Indian solutions that help citizens solve civic problems easily. We aim to bridge the gap between citizens and local governance through technology and transparency.
            </p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-blue-100 text-[var(--ashoka-blue)] rounded-xl flex items-center justify-center mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              Creating clean, smart, Atmanirbhar cities where citizen issues are resolved effectively. A future where every Indian citizen feels empowered and responsible for their city's development.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
