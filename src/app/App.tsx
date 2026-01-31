import React, { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { ReportForm } from "@/app/components/ReportForm";
import { TrackIssue } from "@/app/components/TrackIssue";
import { Credits } from "@/app/components/Credits";
import { EmergencyButton } from "@/app/components/EmergencyButton";
import { AIChat } from "@/app/components/AIChat";
import { Login } from "@/app/components/Login";
import { Dashboard } from "@/app/components/Dashboard";
import { About } from "@/app/components/About";
import { Contact } from "@/app/components/Contact";
import { Privacy } from "@/app/components/Privacy";
import { Terms } from "@/app/components/Terms";
import { Sitemap } from "@/app/components/Sitemap";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Github, Twitter, Linkedin, Facebook } from "lucide-react";
import { translations } from "@/app/utils/translations";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const t = translations[language] || translations.en;

  // Handle theme toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Hero onNavigate={setCurrentPage} language={language} />;
      case "report":
        return <ReportForm language={language} />;
      case "dashboard":
        return isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />;
      case "login":
        return <Login onLogin={handleLogin} />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "privacy":
        return <Privacy />;
      case "terms":
        return <Terms />;
      case "sitemap":
        return <Sitemap onNavigate={setCurrentPage} />;
      case "track":
        return <TrackIssue />;
      case "credits":
        return <Credits />;
      default:
        return <Hero onNavigate={setCurrentPage} language={language} />;
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
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <main className="min-h-[70vh]">
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
      <footer className="bg-blue-950 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="w-10 h-10 mr-3 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="text-white" size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-tight leading-none">
                    {t.brand}
                  </span>
                  <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">{t.tagline}</span>
                </div>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                {language === "hi" ? "नागरिकों को बेहतर भविष्य बनाने के लिए डिजिटल उपकरणों के साथ सशक्त बनाना। पारदर्शिता और कुशल नागरिक प्रबंधन के लिए समर्पित।" : "Empowering citizens with digital tools to build a better future. Dedicated to transparency and efficient civic management."}
              </p>
              <div className="flex space-x-4">
                <button className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <Twitter size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <Facebook size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <Linkedin size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <Github size={16} />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-blue-300 mb-6">{language === "hi" ? "प्लेटफॉर्म" : "Platform"}</h4>
              <ul className="space-y-3 text-sm text-blue-100">
                <li><button onClick={() => setCurrentPage("home")} className="hover:text-white hover:translate-x-1 transition-all">{t.home}</button></li>
                <li><button onClick={() => setCurrentPage("about")} className="hover:text-white hover:translate-x-1 transition-all">{t.about}</button></li>
                <li><button onClick={() => setCurrentPage("dashboard")} className="hover:text-white hover:translate-x-1 transition-all">{t.dashboard}</button></li>
                <li><button onClick={() => setCurrentPage("contact")} className="hover:text-white hover:translate-x-1 transition-all">{t.contact}</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-blue-300 mb-6">{language === "hi" ? "कानूनी" : "Legal"}</h4>
              <ul className="space-y-3 text-sm text-blue-100">
                <li><button onClick={() => setCurrentPage("privacy")} className="hover:text-white hover:translate-x-1 transition-all">Privacy Policy</button></li>
                <li><button onClick={() => setCurrentPage("terms")} className="hover:text-white hover:translate-x-1 transition-all">Terms of Service</button></li>
                <li><button onClick={() => setCurrentPage("sitemap")} className="hover:text-white hover:translate-x-1 transition-all">Sitemap</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-blue-300 mb-6">{t.contact}</h4>
              <ul className="space-y-4 text-sm text-blue-100">
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-blue-300">HQ:</span>
                  <span>123, Sansad Marg, New Delhi - 110001</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="font-bold text-blue-300">Call:</span>
                  <span>1800-CIVIC-123</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-blue-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs text-blue-400 font-medium">
              © 2026 {t.brand}. A Government of India Initiative.
            </div>
            <div className="flex items-center space-x-6 opacity-60">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="GoI" className="h-10 brightness-0 invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Digital_India_logo.svg" alt="DI" className="h-10 brightness-0 invert" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
