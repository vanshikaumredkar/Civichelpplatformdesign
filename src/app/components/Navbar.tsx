import React, { useState } from "react";
import { Sun, Moon, Globe, Phone, User, ChevronDown, MessageSquare, Mic } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "mr", label: "मराठी" },
  { code: "hg", label: "Hinglish" },
];

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  language,
  setLanguage,
  onNavigate,
  currentPage,
}) => {
  const [isReportDropdownOpen, setIsReportDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "report", label: "Report Issue", hasDropdown: true },
    { id: "track", label: "Track Issue" },
    { id: "credits", label: "Credits" },
    { id: "about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate("home")}
          >
            <div className="w-8 h-8 mr-2 bg-[var(--ashoka-blue)] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">SB</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">
              Swavlamban <span className="text-[var(--saffron)]">Bharat</span>
            </span>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.hasDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsReportDropdownOpen(true)}
                    onMouseLeave={() => setIsReportDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentPage === "report" ? "text-[var(--ashoka-blue)] font-bold" : "hover:text-[var(--ashoka-blue)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={14} />
                    </button>
                    <AnimatePresence>
                      {isReportDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-card border border-border overflow-hidden"
                        >
                          <div className="py-1">
                            <button
                              onClick={() => {
                                onNavigate("report-letter");
                                setIsReportDropdownOpen(false);
                              }}
                              className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-muted"
                            >
                              <MessageSquare size={16} className="mr-2" />
                              ✍️ Type a Letter
                            </button>
                            <button
                              onClick={() => {
                                onNavigate("report-voice");
                                setIsReportDropdownOpen(false);
                              }}
                              className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-muted"
                            >
                              <Mic size={16} className="mr-2" />
                              🎤 Voice Complaint
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === item.id ? "text-[var(--ashoka-blue)] font-bold underline decoration-2 underline-offset-4" : "hover:text-[var(--ashoka-blue)]"
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2 rounded-full hover:bg-muted transition-colors flex items-center space-x-1"
              >
                <Globe size={20} />
                <span className="text-xs font-semibold uppercase hidden sm:inline">{language}</span>
              </button>
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-card border border-border overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left hover:bg-muted ${
                          language === lang.code ? "bg-muted font-bold" : ""
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Night Mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Login */}
            <button
              onClick={() => onNavigate("login")}
              className="flex items-center space-x-1 px-4 py-2 bg-[var(--ashoka-blue)] text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
            >
              <User size={16} />
              <span className="hidden sm:inline">Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
