import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you for your message! We will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-blue-950 dark:text-white mb-4">Contact Support</h2>
        <p className="text-muted-foreground font-medium">Need help? Our team is available 24/7 for urgent civic matters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Info Cards */}
        <div className="space-y-6">
          <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-700 rounded-2xl flex items-center justify-center shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-1">Helpline Number</h4>
              <p className="text-xl font-extrabold text-blue-900 dark:text-blue-100">1800-CIVIC-123</p>
              <p className="text-xs font-bold text-green-600 mt-1">Toll-Free Across India</p>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-700 rounded-2xl flex items-center justify-center shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-1">Official Email</h4>
              <p className="text-lg font-bold text-blue-900 dark:text-blue-100">support@civicconnect.gov.in</p>
              <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
            </div>
          </div>

          <div className="bg-muted/50 p-8 rounded-3xl border border-border">
            <h4 className="font-bold mb-4 flex items-center space-x-2">
              <Clock size={18} className="text-blue-700" />
              <span>Office Hours</span>
            </h4>
            <div className="space-y-3 text-sm font-medium">
              <div className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-blue-700">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-blue-700">10:00 - 14:00</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border p-8 rounded-[2.5rem] shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center space-x-2">
              <MessageSquare className="text-blue-700" />
              <span>Send us a Message</span>
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-5 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-5 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Your Message</label>
                <textarea
                  rows={5}
                  placeholder="How can we help you today?"
                  className="w-full px-5 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-10 py-4 bg-blue-700 text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
