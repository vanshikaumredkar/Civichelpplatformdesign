import React, { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { ReportForm } from "@/app/components/ReportForm";
import { TrackIssue } from "@/app/components/TrackIssue";
import { Credits } from "@/app/components/Credits";
import { EmergencyButton } from "@/app/components/EmergencyButton";
import { AIChat } from "@/app/components/AIChat";
import { motion, AnimatePresence } from "motion/react";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [currentPage, setCurrentPage] = useState("home");

  // Handle theme toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Hero />;
      case "report":
      case "report-letter":
      case "report-voice":
        return <ReportForm />;
      case "track":
        return <TrackIssue />;
      case "credits":
        return <Credits />;
      case "about":
        return (
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h2 className="text-4xl font-bold mb-6 text-[var(--ashoka-blue)]">About Swavlamban Bharat</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Swavlamban Bharat is a digital gateway for Indian citizens to actively participate in urban governance. 
              Our platform simplifies the process of reporting civic issues and ensures transparent tracking until resolution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
              <div className="p-6 border border-border rounded-2xl">
                <h4 className="font-bold mb-2">Citizen-First</h4>
                <p className="text-sm text-muted-foreground">Designed for ease of use by common citizens with multi-language support.</p>
              </div>
              <div className="p-6 border border-border rounded-2xl">
                <h4 className="font-bold mb-2">AI Powered</h4>
                <p className="text-sm text-muted-foreground">Smart assistant to help you navigate services and file complaints faster.</p>
              </div>
              <div className="p-6 border border-border rounded-2xl">
                <h4 className="font-bold mb-2">Incentivized</h4>
                <p className="text-sm text-muted-foreground">Earn credits for your contributions and redeem them for daily utility products.</p>
              </div>
            </div>
          </div>
        );
      case "login":
        return (
          <div className="max-w-md mx-auto px-4 py-20">
            <div className="bg-card border border-border p-8 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Login to your account</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Mobile Number</label>
                  <input type="text" placeholder="+91 98765 43210" className="w-full px-4 py-3 bg-muted border border-border rounded-xl" />
                </div>
                <button 
                  onClick={() => setCurrentPage("home")}
                  className="w-full py-3 bg-[var(--ashoka-blue)] text-white rounded-xl font-bold"
                >
                  Send OTP
                </button>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account? <span className="text-[var(--ashoka-blue)] font-bold cursor-pointer">Register</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Toaster position="top-right" expand={false} richColors />
      
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        language={language} 
        setLanguage={setLanguage}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Elements */}
      <EmergencyButton />
      <AIChat />

      {/* Footer */}
      <footer className="border-t border-border mt-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--ashoka-blue)] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <div>
                <div className="font-bold">Swavlamban Bharat</div>
                <div className="text-xs text-muted-foreground">© 2026 Government of India Initiative</div>
              </div>
            </div>
            
            <div className="flex space-x-8 text-sm font-medium text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
              <a href="#" className="hover:text-foreground">Contact Us</a>
              <a href="#" className="hover:text-foreground">Sitemap</a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last Updated</div>
                <div className="text-xs font-bold">Jan 30, 2026</div>
              </div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/9/93/Digital_India_logo.svg" 
                alt="Digital India" 
                className="h-10 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
