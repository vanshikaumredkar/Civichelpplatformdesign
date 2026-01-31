import React from "react";
import { ShieldCheck, Lock, EyeOff, FileText, Globe, Server } from "lucide-react";

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-4xl font-extrabold text-blue-950 dark:text-white mb-4">Privacy Policy</h2>
        <p className="text-muted-foreground">Your trust is our priority. Learn how Swavlamban Bharat handles your data.</p>
      </div>

      <div className="space-y-12">
        <section className="bg-card border border-border p-8 rounded-[2rem] shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="text-blue-700" size={24} />
            <h3 className="text-2xl font-bold">Data Protection</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At Swavlamban Bharat, we implement industry-standard encryption and security protocols to protect your personal data.
          </p>
        </section>
      </div>
    </div>
  );
};
