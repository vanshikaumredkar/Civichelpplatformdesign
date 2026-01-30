import React, { useState } from "react";
import { Search, MapPin, Calendar, Clock, CheckCircle2, Circle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const mockStatus = [
  { id: 1, label: "Submitted", date: "Jan 28, 2026", time: "10:30 AM", completed: true },
  { id: 2, label: "Under Review", date: "Jan 29, 2026", time: "02:15 PM", completed: true },
  { id: 3, label: "In Progress", date: "Jan 30, 2026", time: "09:00 AM", completed: true, current: true },
  { id: 4, label: "Resolved", date: "--", time: "--", completed: false },
];

export const TrackIssue: React.FC = () => {
  const [complaintId, setComplaintId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<null | any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintId) return;
    
    setIsSearching(true);
    // Mock API call
    setTimeout(() => {
      setResult({
        id: complaintId.toUpperCase(),
        category: "Garbage Management",
        location: "MG Road, Pune, Maharashtra",
        description: "Large pile of waste accumulation near the main junction causing odor and traffic issues.",
        status: "In Progress",
      });
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[var(--ashoka-blue)] mb-4">Track Your Complaint</h2>
        <p className="text-muted-foreground">Enter your Complaint ID or Mobile Number to see the latest status.</p>
      </div>

      <div className="bg-card border border-border p-4 sm:p-8 rounded-3xl shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="e.g. SB-98234 or 9876543210"
              className="w-full px-4 py-4 pl-12 bg-muted border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--ashoka-blue)]"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
            />
            <Search className="absolute left-4 top-4.5 text-muted-foreground" size={20} />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-8 py-4 bg-[var(--ashoka-blue)] text-white rounded-2xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSearching ? "Searching..." : "Track Status"}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-muted/50 rounded-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Complaint ID</div>
                      <div className="text-xl font-bold">{result.id}</div>
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                      {result.category}
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-[var(--ashoka-blue)] shrink-0 mt-1" size={18} />
                    <span className="text-sm font-medium">{result.location}</span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Description</div>
                    <p className="text-sm leading-relaxed">{result.description}</p>
                  </div>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h3 className="text-lg font-bold mb-6">Status Timeline</h3>
                  <div className="space-y-0">
                    {mockStatus.map((status, index) => (
                      <div key={status.id} className="relative flex pb-8 last:pb-0">
                        {index < mockStatus.length - 1 && (
                          <div className={`absolute left-4 top-8 w-0.5 h-full ${status.completed && mockStatus[index+1].completed ? "bg-green-500" : "bg-border"}`} />
                        )}
                        <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          status.completed 
                            ? "bg-green-500 text-white" 
                            : status.current 
                              ? "bg-[var(--ashoka-blue)] text-white" 
                              : "bg-muted text-muted-foreground"
                        }`}>
                          {status.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-bold ${status.current ? "text-[var(--ashoka-blue)]" : ""}`}>
                            {status.label}
                          </div>
                          <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Calendar size={12} />
                              <span>{status.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock size={12} />
                              <span>{status.time}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button className="text-[var(--ashoka-blue)] font-bold text-sm hover:underline">
                  Download Receipt (PDF)
                </button>
              </div>
            </motion.div>
          ) : !isSearching && complaintId ? (
             <div className="text-center py-12 text-muted-foreground italic">
               Click "Track Status" to view complaint details.
             </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Search size={48} className="mx-auto mb-4 opacity-20" />
              <p>Search for a complaint to see details</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
