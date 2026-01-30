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
        <p className="text-muted-foreground">Your trust is our priority. Learn how we handle your data.</p>
      </div>

      <div className="space-y-12">
        <section className="bg-card border border-border p-8 rounded-[2rem] shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="text-blue-700" size={24} />
            <h3 className="text-2xl font-bold">Data Protection</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At CivicConnect, we implement industry-standard encryption and security protocols to protect your personal data. This includes your mobile number, email address, and any media uploaded during report filing.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-center space-x-2 text-sm font-bold text-blue-900 dark:text-blue-100">
              <CheckCircle size={14} className="text-green-600" />
              <span>AES-256 Encryption</span>
            </li>
            <li className="flex items-center space-x-2 text-sm font-bold text-blue-900 dark:text-blue-100">
              <CheckCircle size={14} className="text-green-600" />
              <span>Secure Server Infrastructure</span>
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-bold border-l-4 border-blue-700 pl-4">User Data Privacy</h3>
          <p className="text-muted-foreground leading-relaxed">
            Your personal identification information (PII) is only used for verifying reports and communicating resolution status. We do not sell or share your data with unauthorized third parties for marketing or advertising purposes.
          </p>
          <div className="bg-muted/50 p-6 rounded-2xl border border-border">
            <h4 className="font-bold mb-3 flex items-center space-x-2">
              <EyeOff size={18} className="text-red-500" />
              <span>Anonymity Options</span>
            </h4>
            <p className="text-sm text-muted-foreground">
              Users can choose to remain anonymous on public leaderboards, although contact details are required for official verification of civic complaints.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-bold border-l-4 border-blue-700 pl-4">No Third-Party Misuse</h3>
          <p className="text-muted-foreground leading-relaxed">
            We strictly govern data access within municipal departments. Access to citizen data is logged and audited regularly to prevent any internal or external misuse. Data is stored on secure government-authorized servers with restricted access.
          </p>
        </section>
      </div>

      <div className="mt-20 p-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs font-bold text-muted-foreground gap-4">
        <span>LAST UPDATED: JAN 30, 2026</span>
        <div className="flex space-x-6">
          <button className="hover:text-blue-700">Download PDF</button>
          <button className="hover:text-blue-700">Archives</button>
        </div>
      </div>
    </div>
  );
};

const CheckCircle = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
