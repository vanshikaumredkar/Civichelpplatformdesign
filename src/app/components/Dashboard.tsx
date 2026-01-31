import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Users,
  AlertCircle,
  FileText,
  LogOut
} from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "Pending", count: 124, icon: Clock, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-100 dark:border-amber-900/30" },
  { label: "In Progress", count: 85, icon: RotateCcw, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-100 dark:border-blue-900/30" },
  { label: "Completed", count: 432, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-100 dark:border-green-900/30" },
];

const mockComplaints = [
  { id: "CC-102", type: "Pothole", location: "Sector 14, Pune", date: "Jan 28, 2026", status: "Pending", priority: "High" },
  { id: "CC-105", type: "Street Light", location: "Baner Road", date: "Jan 29, 2026", status: "In Progress", priority: "Medium" },
  { id: "CC-108", type: "Waste Pile", location: "Viman Nagar", date: "Jan 30, 2026", status: "Completed", priority: "Low" },
  { id: "CC-112", type: "Water Leak", location: "Kothrud", date: "Jan 30, 2026", status: "In Progress", priority: "High" },
  { id: "CC-115", type: "Broken Pipe", location: "Aundh", date: "Jan 30, 2026", status: "Pending", priority: "Medium" },
];

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="lg:w-64 shrink-0">
        <div className="bg-card border border-border rounded-3xl p-6 sticky top-24 shadow-sm">
          <nav className="space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "home", label: "Home", icon: TrendingUp },
              { id: "report", label: "Report Issue", icon: FileText },
              { id: "about", label: "Profile", icon: Users },
              { id: "logout", label: "Logout", icon: LogOut, color: "text-red-500" },
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
              <p className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-widest mb-1">System Health</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold">All nodes active</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-blue-950 dark:text-white">Admin Dashboard</h2>
            <p className="text-muted-foreground font-medium">Monitoring civic health and resolution metrics.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="Admin" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-sm font-bold text-muted-foreground">+5 Admins Online</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-3xl border-2 shadow-sm ${stat.bg} ${stat.border} flex items-center justify-between`}
            >
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <stat.icon size={18} className={stat.color} />
                  <span className={`text-sm font-bold uppercase tracking-wider ${stat.color}`}>{stat.label}</span>
                </div>
                <div className="text-4xl font-extrabold text-blue-950 dark:text-white">{stat.count}</div>
              </div>
              <div className="w-12 h-12 bg-white/50 dark:bg-black/20 rounded-2xl flex items-center justify-center">
                <TrendingUp size={24} className={stat.color} />
              </div>
            </motion.div>
          ))}
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
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input 
                  type="text" 
                  placeholder="Search report ID..." 
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
                  <th className="px-6 py-4">Report ID</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockComplaints
                  .filter(c => activeTab === "All" || c.status === activeTab)
                  .map((report) => (
                  <tr key={report.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4 font-bold text-blue-700">{report.id}</td>
                    <td className="px-6 py-4 font-medium">{report.type}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{report.location}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                        report.status === "Pending" ? "bg-amber-100 text-amber-700" :
                        report.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${
                          report.priority === "High" ? "bg-red-500" :
                          report.priority === "Medium" ? "bg-amber-500" : "bg-blue-500"
                        }`} />
                        <span className="text-xs font-bold">{report.priority}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-muted/20 border-t border-border flex justify-between items-center">
            <span className="text-xs font-bold text-muted-foreground">Showing 5 of 124 results</span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-border rounded-lg text-xs font-bold bg-white dark:bg-card">Previous</button>
              <button className="px-3 py-1 border border-border rounded-lg text-xs font-bold bg-white dark:bg-card">Next</button>
            </div>
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-card border border-border rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <Users size={18} className="text-blue-700" />
              <span>Community Contributors</span>
            </h3>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">A{i}</div>
                    <div>
                      <div className="text-sm font-bold">Amit Sharma {i}</div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase">Silver Contributor</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-green-600">+{200 * i} 🪙</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <AlertCircle size={18} className="text-red-500" />
              <span>Urgent Attentions Required</span>
            </h3>
            <div className="space-y-4">
              <div className="p-4 border border-red-100 bg-red-50 dark:bg-red-950/20 rounded-2xl flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse" />
                <div>
                  <div className="text-sm font-bold text-red-950 dark:text-red-200">Main Pipeline Burst at Sector 5</div>
                  <p className="text-xs text-red-700 dark:text-red-400 mt-1">Reported 2 hours ago. Affecting 200+ households. Urgent action needed.</p>
                </div>
              </div>
              <button className="w-full py-3 bg-white dark:bg-muted border border-border rounded-xl text-sm font-bold hover:bg-muted transition-colors">
                View All Critical Issues
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
