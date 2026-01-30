import React from "react";
import { Coins, MessageSquare, Award, AlertCircle, CheckCircle2, Heart } from "lucide-react";

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText size={32} />
        </div>
        <h2 className="text-4xl font-extrabold text-blue-950 dark:text-white mb-4">Terms of Service</h2>
        <p className="text-muted-foreground">The guidelines for using CivicConnect and earning rewards.</p>
      </div>

      <div className="space-y-12">
        {/* Reward System */}
        <section className="bg-card border border-border p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-green-600 opacity-5">
            <Coins size={120} />
          </div>
          <div className="flex items-center space-x-3 mb-6">
            <Award className="text-green-600" size={24} />
            <h3 className="text-2xl font-bold">Reward System (CivicCoins)</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            To encourage active civic participation, CivicConnect implements a reward system where users earn "CivicCoins" for valid and verified issue reporting.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { label: "Valid Report Filing", points: "+50" },
              { label: "First Time User", points: "+100" },
              { label: "Issue Verified by Admin", points: "+200" },
              { label: "Community Helper (Monthly)", points: "+500" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-muted/50 rounded-xl border border-border/50">
                <span className="text-sm font-bold">{item.label}</span>
                <span className="text-sm font-extrabold text-green-600">{item.points} 🪙</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={18} />
            <p className="text-xs text-amber-800 dark:text-amber-400">
              Note: Rewards are only credited after manual verification. False or spam reporting will lead to account suspension and forfeiture of all points.
            </p>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-700 rounded-xl flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-2xl font-bold">Feedback & Suggestions</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            We value your input in improving our city and this platform. Users can provide feedback through the dedicated section in their profile or by contacting our support team directly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-card border border-border rounded-2xl text-center shadow-sm">
              <CheckCircle2 size={32} className="text-blue-700 mx-auto mb-4" />
              <h4 className="font-bold text-sm mb-2">Service Quality</h4>
            </div>
            <div className="p-6 bg-card border border-border rounded-2xl text-center shadow-sm">
              <Heart size={32} className="text-red-500 mx-auto mb-4" />
              <h4 className="font-bold text-sm mb-2">User Experience</h4>
            </div>
            <div className="p-6 bg-card border border-border rounded-2xl text-center shadow-sm">
              <AlertCircle size={32} className="text-amber-500 mx-auto mb-4" />
              <h4 className="font-bold text-sm mb-2">Bug Reporting</h4>
            </div>
          </div>
        </section>

        {/* Structured Text */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold border-l-4 border-blue-700 pl-4">Platform Usage</h3>
          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              1. <strong>Eligibility:</strong> Users must be residents of the covered municipal area and provide valid contact information.
            </p>
            <p>
              2. <strong>Reporting:</strong> All media (images/videos) uploaded must be relevant to the issue. Obscene or irrelevant content is strictly prohibited.
            </p>
            <p>
              3. <strong>Resolution:</strong> CivicConnect acts as a channel. Resolution times depend on the complexity of the issue and the capacity of municipal departments.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const FileText = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
