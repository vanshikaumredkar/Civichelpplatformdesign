import React, { useState } from "react";
import { Sun, Moon, Globe, User, LayoutDashboard, FileText, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { translations } from "@/app/utils/translations";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
];

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  language,
  setLanguage,
  onNavigate,
  currentPage,
  isLoggedIn,
  onLogout,
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const t = translations[language] || translations.en;

  const navItems = [
    { id: "home", label: t.home, icon: null },
    { id: "dashboard", label: t.dashboard, icon: <LayoutDashboard size={16} />, auth: true },
    { id: "about", label: t.about, icon: null },
    { id: "contact", label: t.contact, icon: null },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Swavlamban Bharat */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => onNavigate("home")}
          >
            <div className="w-10 h-10 mr-3 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-blue-800 transition-colors">
              <FileText className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-none text-blue-900 dark:text-blue-100">
                {t.brand.split(' ')[0]}<span className="text-green-600">{t.brand.split(' ')[1] || ""}</span>
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.tagline}</span>
            </div>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.filter(item => !item.auth || isLoggedIn).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 ${
                  currentPage === item.id 
                    ? "text-blue-700 bg-blue-50 dark:bg-blue-900/20" 
                    : "text-muted-foreground hover:text-blue-700 hover:bg-muted"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors flex items-center space-x-2 border border-transparent hover:border-border"
              >
                <Globe size={18} className="text-blue-700" />
                <span className="text-xs font-bold uppercase hidden sm:inline">{language === "en" ? "EN" : "HI"}</span>
                <ChevronDown size={12} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 rounded-xl shadow-xl bg-card border border-border overflow-hidden py-1"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between px-4 py-2 text-sm w-full text-left hover:bg-muted ${
                          language === lang.code ? "text-blue-700 font-bold bg-blue-50/50" : ""
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
              className="p-2 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border"
            >
              {darkMode ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-blue-700" />}
            </button>

            {/* Report Issue Button */}
            <button
              onClick={() => onNavigate("report")}
              className={`hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95 ${
                currentPage === "report" 
                  ? "bg-green-700 text-white" 
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <FileText size={16} />
              <span>{t.reportIssue}</span>
            </button>

            {/* Profile / Auth */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800 overflow-hidden"
                >
                  <User size={20} className="text-blue-700" />
                </button>
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-card border border-border overflow-hidden py-1"
                    >
                      <button
                        onClick={() => { onNavigate("dashboard"); setIsProfileDropdownOpen(false); }}
                        className="flex items-center space-x-2 px-4 py-2 text-sm w-full text-left hover:bg-muted"
                      >
                        <LayoutDashboard size={16} />
                        <span>{t.dashboard}</span>
                      </button>
                      <button
                        onClick={() => { onLogout(); setIsProfileDropdownOpen(false); }}
                        className="flex items-center space-x-2 px-4 py-2 text-sm w-full text-left hover:bg-muted text-red-600"
                      >
                        <LogOut size={16} />
                        <span>{t.logout}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => onNavigate("login")}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-bold hover:bg-blue-800 transition-colors shadow-md active:scale-95"
              >
                {t.login}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
