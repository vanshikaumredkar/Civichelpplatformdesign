import React from "react";
import { Coins, Gift, ShoppingBag, ArrowRight, Info } from "lucide-react";
import { motion } from "motion/react";

const rewards = [
  { id: 1, title: "Tata Tea Gold (250g)", cost: 150, img: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=300&auto=format&fit=crop" },
  { id: 2, title: "Hand Sanitizer (500ml)", cost: 100, img: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=300&auto=format&fit=crop" },
  { id: 3, title: "Cotton Face Masks (Pack of 3)", cost: 50, img: "https://images.unsplash.com/photo-1586942593568-29361efcd571?q=80&w=300&auto=format&fit=crop" },
  { id: 4, title: "Eco-friendly Pen Set", cost: 30, img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=300&auto=format&fit=crop" },
];

export const Credits: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Balance Card */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-[var(--ashoka-blue)] to-[#000044] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center space-x-2 opacity-80 mb-2">
                <Coins size={20} />
                <span className="font-bold text-sm uppercase tracking-wider">Available Credits</span>
              </div>
              <div className="text-5xl font-extrabold mb-6 flex items-baseline space-x-2">
                <span>340</span>
                <span className="text-xl font-medium opacity-60 text-white/50">Coins</span>
              </div>
              <button className="w-full py-3 bg-white text-[var(--ashoka-blue)] rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2">
                <span>History</span>
                <ArrowRight size={18} />
              </button>
            </div>
            
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Coins size={120} />
            </div>
          </motion.div>

          <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl">
            <div className="flex items-center space-x-2 text-orange-700 font-bold mb-3">
              <Info size={18} />
              <span>How to earn?</span>
            </div>
            <ul className="space-y-3 text-sm text-orange-800 font-medium">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                <span>Report an issue: 10 Coins</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                <span>Verification of fix: 5 Coins</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                <span>Monthly active citizen: 50 Coins</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Rewards Store */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <Gift className="text-[var(--saffron)]" />
              <span>Redeem Rewards</span>
            </h2>
            <div className="text-sm font-bold text-[var(--ashoka-blue)] flex items-center space-x-1 cursor-pointer hover:underline">
              <span>View All</span>
              <ArrowRight size={14} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rewards.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-card border border-border rounded-2xl overflow-hidden flex shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-32 h-full bg-muted">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <div className="flex items-center space-x-1 text-orange-600">
                      <Coins size={14} />
                      <span className="text-xs font-bold">{item.cost} Coins</span>
                    </div>
                  </div>
                  <button className="mt-4 py-2 px-4 border border-[var(--ashoka-blue)] text-[var(--ashoka-blue)] rounded-lg text-xs font-bold hover:bg-[var(--ashoka-blue)] hover:text-white transition-all flex items-center justify-center space-x-2">
                    <ShoppingBag size={14} />
                    <span>Redeem</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
