import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  Search, 
  Filter, 
  ExternalLink,
  TrendingUp,
  Users,
  AlertCircle,
  FileText,
  LogOut,
  BrainCircuit,
  ShieldCheck
} from "lucide-react";
import { motion } from "motion/react";
import { translations } from "@/app/utils/translations";

export const Dashboard: React.FC<{ language?: string }> = ({ language = "en" }) => {
  const t = translations[language] || translations.en;
  const [activeTab, setActiveTab] = useState("All");
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    // Load reports from localStorage
    const savedReports = JSON.parse(localStorage.getItem("userReports") || "[]");
    
    // Default reports if none exist
    if (savedReports.length === 0) {
      const defaults = [
        { id: "SB-2026-X102", type: "Pothole", location: "Sector 14, Pune", date: "Jan 28, 2026", status: "Pending", aiClassification: "Minor", description: "Large pothole in the middle of the street." },
        { id: "SB-2026-Y205", type: "Street Light", location: "Baner Road", date: "Jan 29, 2026", status: "In Progress", aiClassification: "Minor", description: "Flickering street light near the park." },
        { id: "SB-2026-Z308", type: "Water Leak", location: "Kothrud", date: "Jan 30, 2026", status: "Completed", aiClassification: "Major", description: "Main pipe burst causing flood." },
      ];
      localStorage.setItem("userReports", JSON.stringify(defaults));
      setReports(defaults);
    } else {
      setReports(savedReports);
    }
    setLoading(false);
  }, []);

  const stats = [
    { label: language === "hi" ? "लंबित" : "Pending", count: reports.filter(r => r.status === "Pending").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-100 dark:border-amber-900/30" },
    { label: language === "hi" ? "प्रगति पर" : "In Progress", count: reports.filter(r => r.status === "In Progress").length, icon: RotateCcw, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-100 dark:border-blue-900/30" },
    { label: language === "hi" ? "पूरा हुआ" : "Completed", count: reports.filter(r => r.status === "Completed").length, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-100 dark:border-green-900/30" },
  ];

  const filteredReports = reports.filter(r => activeTab === "All" || r.status === activeTab);

  if (selectedReport) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={() => setSelectedReport(null)}
          className="mb-8 flex items-center space-x-2 text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors"
        >
          <LayoutDashboard size={18} />
          <span>{language === "hi" ? "मेरी रिपोर्ट पर वापस जाएं" : "Back to My Reports"}</span>
        </button>
        
        <div className="bg-card border border-border rounded-[2rem] shadow-xl overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4 border-b border-border pb-8">
              <div>
                <h3 className="text-3xl font-extrabold text-blue-950 dark:text-white mb-1">{selectedReport.type}</h3>
                <p className="text-blue-700 font-bold text-sm tracking-wide">{language === "hi" ? "संदर्भ आईडी" : "REFERENCE ID"}: {selectedReport.id}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                  selectedReport.status === "Pending" ? "bg-amber-100 text-amber-700" :
                  selectedReport.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                  "bg-green-100 text-green-700"
                }`}>
                  {language === "hi" ? (selectedReport.status === "Pending" ? "लंबित" : selectedReport.status === "In Progress" ? "प्रगति पर" : "पूरा हुआ") : selectedReport.status}
                </span>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg border ${
                  selectedReport.aiClassification === "Major" 
                    ? "bg-red-50 text-red-700 border-red-100" 
                    : "bg-blue-50 text-blue-700 border-blue-100"
                }`}>
                  <BrainCircuit size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">AI {language === "hi" ? (selectedReport.aiClassification === "Major" ? "मुख्य" : "मामूली") : selectedReport.aiClassification} {language === "hi" ? "प्राथमिकता" : "PRIORITY"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">{language === "hi" ? "घटना का स्थान" : "Incident Location"}</label>
                  <p className="text-base font-bold text-blue-950 dark:text-white">{selectedReport.location}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">{language === "hi" ? "जमा करने की तिथि" : "Submission Date"}</label>
                  <p className="text-base font-bold text-blue-950 dark:text-white">{selectedReport.date}</p>
                </div>
              </div>
              <div className="p-6 bg-muted/50 rounded-2xl border border-border">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">{language === "hi" ? "रिपोर्ट किए गए विवरण" : "Reported Details"}</label>
                <p className="text-sm leading-relaxed text-foreground/80 font-medium italic">"{selectedReport.description}"</p>
              </div>
            </div>

            <div className="pt-8 border-t border-border flex justify-end gap-3">
               <button className="px-6 py-3 border border-border rounded-xl text-xs font-bold hover:bg-muted transition-colors">
                {language === "hi" ? "डिजिटल रसीद प्रिंट करें" : "Print Digital Receipt"}
              </button>
              <button className="px-6 py-3 bg-blue-700 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-all">
                {language === "hi" ? "कार्रवाई की स्थिति ट्रैक करें" : "Track Action Status"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="lg:w-64 shrink-0">
        <div className="bg-card border border-border rounded-3xl p-6 sticky top-24 shadow-sm">
          <nav className="space-y-2">
            {[
              { id: "dashboard", label: language === "hi" ? "मेरी रिपोर्ट" : "My Reports", icon: LayoutDashboard },
              { id: "track", label: language === "hi" ? "ट्रैकिंग" : "Tracking", icon: TrendingUp },
              { id: "profile", label: language === "hi" ? "मेरी प्रोफाइल" : "My Profile", icon: Users },
              { id: "logout", label: language === "hi" ? "लॉगआउट" : "Logout", icon: LogOut, color: "text-red-500" },
            ].map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  item.id === "dashboard" 
                    ? "bg-blue-700 text-white shadow-md shadow-blue-100" 
                    : `text-muted-foreground hover:bg-muted ${item.color || ""}`
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="mt-8 pt-8 border-t border-border">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-widest mb-1">{language === "hi" ? "स्थिति अपडेट" : "Status Updates"}</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold">{language === "hi" ? "रियल-टाइम सिंक चालू" : "Real-time sync on"}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-blue-950 dark:text-white">{t.dashboard}</h2>
            <p className="text-muted-foreground font-medium">{language === "hi" ? "स्वावलंबन भारत में आपके योगदान की ट्रैकिंग।" : "Tracking your contributions to Swavlamban Bharat."}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl flex items-center space-x-2">
              <ShieldCheck className="text-green-600" size={20} />
              <span className="text-sm font-bold text-green-700 dark:text-green-300">{language === "hi" ? "सत्यापित नागरिक" : "Verified Citizen"}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className={`p-6 rounded-3xl border-2 shadow-sm ${stat.bg} ${stat.border} flex items-center justify-between`}
            >
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <stat.icon size={18} className={stat.color} />
                  <span className={`text-sm font-bold uppercase tracking-wider ${stat.color}`}>{stat.label}</span>
                </div>
                <div className="text-4xl font-extrabold text-blue-950 dark:text-white">{stat.count}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Legend */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl flex items-center space-x-3">
          <BrainCircuit className="text-blue-700" size={20} />
          <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
            <span className="font-bold">{language === "hi" ? "AI वर्गीकरण प्रणाली" : "AI Classification System"}:</span> {language === "hi" ? "प्रत्येक रिपोर्ट को रिपोर्ट विवरण के AI मूल्यांकन के आधार पर मुख्य (तत्काल ध्यान देने की आवश्यकता) या मामूली (मानक प्रसंस्करण) के रूप में स्वचालित रूप से वर्गीकृत किया जाता है।" : "Every report is automatically classified as Major (Requires Immediate Attention) or Minor (Standard Processing) based on AI assessment of the report details."}
          </p>
        </div>

        {/* Table/List Area */}
        <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden">

          <div className="p-6 border-b border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-1 p-1 bg-muted rounded-xl overflow-x-auto max-w-full">
              {["All", "Pending", "In Progress", "Completed"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab ? "bg-white dark:bg-blue-900 text-blue-700 dark:text-white shadow-md" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {language === "hi" ? (tab === "All" ? "सभी" : tab === "Pending" ? "लंबित" : tab === "In Progress" ? "प्रगति पर" : "पूरा हुआ") : tab}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input 
                  type="text" 
                  placeholder={language === "hi" ? "रिपोर्ट आईडी खोजें..." : "Search report ID..."} 
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
                <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <th className="px-6 py-4">{language === "hi" ? "रिपोर्ट आईडी" : "Report ID"}</th>
                  <th className="px-6 py-4">{language === "hi" ? "श्रेणी" : "Category"}</th>
                  <th className="px-6 py-4">{language === "hi" ? "स्थिति" : "Status"}</th>
                  <th className="px-6 py-4">{language === "hi" ? "AI वर्गीकरण" : "AI Classification"}</th>
                  <th className="px-6 py-4">{language === "hi" ? "रिपोर्ट की तिथि" : "Report Date"}</th>
                  <th className="px-6 py-4">{language === "hi" ? "विवरण" : "Details"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4 font-bold text-blue-700">{report.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold">{report.type}</span>
                        <span className="text-[10px] text-muted-foreground font-medium truncate max-w-[150px]">{report.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                        report.status === "Pending" ? "bg-amber-100 text-amber-700" :
                        report.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {language === "hi" ? (report.status === "Pending" ? "लंबित" : report.status === "In Progress" ? "प्रगति पर" : "पूरा हुआ") : report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg border ${
                        report.aiClassification === "Major" 
                          ? "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:border-red-900" 
                          : "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900"
                      }`}>
                        <BrainCircuit size={12} />
                        <span className="text-xs font-bold uppercase tracking-tight">AI {language === "hi" ? (report.aiClassification === "Major" ? "मुख्य" : "मामूली") : report.aiClassification}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{report.date}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedReport(report)}
                        className="flex items-center space-x-1 text-xs font-bold text-blue-700 hover:underline"
                      >
                        <span>{language === "hi" ? "देखें" : "View"}</span>
                        <ExternalLink size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground italic">
                      {language === "hi" ? "इस श्रेणी में कोई रिपोर्ट नहीं मिली।" : "No reports found in this category."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-muted/20 border-t border-border flex justify-between items-center">
            <span className="text-xs font-bold text-muted-foreground">{language === "hi" ? `${filteredReports.length} रिपोर्ट दिखा रहा है` : `Showing ${filteredReports.length} reports`}</span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-border rounded-lg text-xs font-bold bg-white dark:bg-card">{language === "hi" ? "पिछला" : "Previous"}</button>
              <button className="px-3 py-1 border border-border rounded-lg text-xs font-bold bg-white dark:bg-card">{language === "hi" ? "अगला" : "Next"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

