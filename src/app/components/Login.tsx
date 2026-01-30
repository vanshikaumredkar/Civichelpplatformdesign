import React, { useState } from "react";
import { Mail, Lock, LogIn, Shield } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      onLogin();
      toast.success("Welcome back! Logged in successfully.");
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-card border border-border p-8 rounded-[2rem] shadow-2xl relative"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 dark:shadow-none">
            <Shield className="text-white" size={32} />
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-center mb-2 text-blue-950 dark:text-white">Admin Login</h2>
        <p className="text-center text-muted-foreground mb-8">Enter your credentials to access the management portal.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="admin@civicconnect.gov"
                className="w-full px-5 py-4 pl-12 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute left-4 top-4.5 text-muted-foreground" size={18} />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Password</label>
              <button type="button" className="text-xs font-bold text-blue-700 hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 pl-12 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute left-4 top-4.5 text-muted-foreground" size={18} />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-700 text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-200 dark:shadow-none active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-border flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">Authorized access only.</p>
          <div className="flex space-x-4 grayscale opacity-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="GoI" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Digital_India_logo.svg" alt="DI" className="h-8" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
