import React from "react";
import { Map as MapIcon, Link as LinkIcon, MapPin, Globe, Compass, Layout } from "lucide-react";

export const Sitemap: React.FC<{ language?: string, onNavigate: (page: string) => void }> = ({ language = "en", onNavigate }) => {
  const sections = [
    {
      title: language === "hi" ? "प्राथमिक पृष्ठ" : "Primary Pages",
      links: [
        { label: language === "hi" ? "मुख्य पृष्ठ" : "Home Page", id: "home" },
        { label: language === "hi" ? "हमारे बारे में" : "About Platform", id: "about" },
        { label: language === "hi" ? "शिकायत दर्ज करें" : "Report an Issue", id: "report" },
        { label: language === "hi" ? "नागरिक डैशबोर्ड" : "Citizen Dashboard", id: "dashboard" },
        { label: language === "hi" ? "संपर्क करें" : "Contact Us", id: "contact" },
      ]
    },
    {
      title: language === "hi" ? "उपयोगकर्ता खाता" : "User Account",
      links: [
        { label: language === "hi" ? "लॉगिन पोर्टल" : "Login Portal", id: "login" },
        { label: language === "hi" ? "रजिस्टर (जल्द आ रहा है)" : "Register (Coming Soon)", id: "home" },
        { label: language === "hi" ? "मेरी प्रोफाइल" : "My Profile", id: "dashboard" },
      ]
    },
    {
      title: language === "hi" ? "कानूनी और जानकारी" : "Legal & Info",
      links: [
        { label: language === "hi" ? "गोपनीयता नीति" : "Privacy Policy", id: "privacy" },
        { label: language === "hi" ? "सेवा की शर्तें" : "Terms of Service", id: "terms" },
        { label: language === "hi" ? "इनाम दिशानिर्देश" : "Reward Guidelines", id: "terms" },
        { label: language === "hi" ? "साइटमैप" : "Sitemap", id: "sitemap" },
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-blue-950 dark:text-white mb-2 flex items-center gap-3">
            <Compass className="text-blue-700" size={32} />
            <span>{language === "hi" ? "साइटमैप" : "Sitemap"}</span>
          </h2>
          <p className="text-muted-foreground font-medium">{language === "hi" ? "त्वरित लिंक और क्षेत्रीय कवरेज मानचित्र।" : "Quick links and regional coverage map."}</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold border border-blue-100">
          <Globe size={14} />
          <span>v2.0 Stable Release</span>
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-16">
        <div className="bg-card border border-border rounded-[2.5rem] shadow-xl overflow-hidden relative">
          <div className="p-8 border-b border-border bg-muted/30">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <MapIcon className="text-blue-700" size={24} />
              <span>{language === "hi" ? "कवरेज मानचित्र" : "Coverage Map"}</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{language === "hi" ? "हमारा प्लेटफॉर्म वर्तमान में महानगरीय क्षेत्र के 12 प्रमुख क्षेत्रों को कवर करता है।" : "Our platform currently covers 12 major zones across the metropolitan region."}</p>
          </div>
          
          <div className="aspect-[21/9] bg-blue-50 dark:bg-blue-900/10 relative overflow-hidden flex items-center justify-center">
            {/* Mock Map UI */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop')] bg-cover" />
            </div>
            
            {/* Map Markers */}
            <div className="relative w-full h-full">
              {[
                { top: "20%", left: "30%", label: language === "hi" ? "क्षेत्र अ" : "Zone A" },
                { top: "45%", left: "60%", label: language === "hi" ? "क्षेत्र ब" : "Zone B" },
                { top: "70%", left: "40%", label: language === "hi" ? "क्षेत्र स" : "Zone C" },
                { top: "30%", left: "80%", label: language === "hi" ? "क्षेत्र द" : "Zone D" },
              ].map((m, i) => (
                <div 
                  key={i}
                  className="absolute flex flex-col items-center group cursor-pointer"
                  style={{ top: m.top, left: m.left }}
                >
                  <div className="w-4 h-4 bg-blue-700 rounded-full border-2 border-white shadow-lg animate-ping absolute" />
                  <div className="w-4 h-4 bg-blue-700 rounded-full border-2 border-white shadow-lg relative z-10" />
                  <div className="mt-2 bg-white dark:bg-card px-2 py-1 rounded-md shadow-md text-[10px] font-bold border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-6 right-6 bg-white dark:bg-card p-4 rounded-2xl shadow-xl border border-border flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-muted-foreground">{language === "hi" ? "सक्रिय क्षेत्र" : "Active Zones"}</div>
                <div className="text-lg font-bold">{language === "hi" ? "12 क्षेत्र लाइव हैं" : "12 Areas Live"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 text-blue-950 dark:text-white border-b border-blue-100 dark:border-blue-900 pb-2">
              <Layout className="text-blue-700" size={18} />
              <span>{section.title}</span>
            </h3>
            <ul className="space-y-4">
              {section.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <button 
                    onClick={() => onNavigate(link.id)}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-blue-700 font-medium transition-colors group"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full group-hover:bg-blue-700 transition-colors" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
