import React, { useState } from "react";
import { Phone, X, ShieldAlert, HeartPulse, Flame, Siren } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const helplines = [
  { name: "Police", number: "100", icon: Siren, color: "bg-blue-100 text-blue-700" },
  { name: "Fire", number: "101", icon: Flame, color: "bg-orange-100 text-orange-700" },
  { name: "Ambulance", number: "102", icon: HeartPulse, color: "bg-red-100 text-red-700" },
  { name: "Women Helpline", number: "1091", icon: ShieldAlert, color: "bg-purple-100 text-purple-700" },
];

export const EmergencyButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-20 right-4 z-[60]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg font-bold text-sm transition-colors ${
          isOpen ? "bg-white text-red-600 border border-red-100" : "bg-red-600 text-white"
        }`}
      >
        {isOpen ? <X size={18} /> : <Phone size={18} />}
        <span>{isOpen ? "Close" : "Emergency"}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-12 right-0 w-64 bg-card border border-border shadow-2xl rounded-2xl overflow-hidden"
          >
            <div className="p-4 bg-red-50 border-b border-red-100">
              <h4 className="text-red-700 font-bold text-xs uppercase tracking-widest">Emergency Helplines</h4>
            </div>
            <div className="p-2">
              {helplines.map((item) => (
                <a
                  key={item.number}
                  href={`tel:${item.number}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                      <item.icon size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.number}</div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Phone size={14} className="text-red-600" />
                  </div>
                </a>
              ))}
            </div>
            <div className="p-4 bg-muted text-[10px] text-center text-muted-foreground">
              Available 24/7 across India
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
