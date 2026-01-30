import React, { useState } from "react";
import { 
  Droplets, 
  Route, 
  Lightbulb, 
  Trash2, 
  MapPin, 
  Mic, 
  Camera, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const categories = [
  { id: "drainage", label: "Drainage", icon: Droplets, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "roads", label: "Roads", icon: Route, color: "text-amber-600", bg: "bg-amber-50" },
  { id: "lights", label: "Street Lights", icon: Lightbulb, color: "text-yellow-600", bg: "bg-yellow-50" },
  { id: "garbage", label: "Garbage", icon: Trash2, color: "text-green-600", bg: "bg-green-50" },
];

export const ReportForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    description: "",
    voiceNote: false,
  });

  const handleNext = () => {
    if (step === 1 && !formData.category) {
      toast.error("Please select a category");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    toast.success("Complaint submitted successfully! ID: SB-98234");
    setStep(4);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-4 text-[var(--ashoka-blue)]">Report Civic Issue</h2>
        <div className="flex justify-center items-center space-x-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                step >= s ? "bg-[var(--ashoka-blue)] text-white" : "bg-muted text-muted-foreground"
              }`}>
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-1 ${step > s ? "bg-[var(--ashoka-blue)]" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border p-8 rounded-3xl shadow-sm min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <h3 className="text-xl font-bold mb-6">Select a Category</h3>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    className={`p-6 rounded-2xl border-2 transition-all text-left group ${
                      formData.category === cat.id 
                      ? "border-[var(--ashoka-blue)] bg-blue-50/50" 
                      : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <cat.icon size={24} />
                    </div>
                    <div className="font-bold">{cat.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <h3 className="text-xl font-bold mb-6">Location & Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Issue Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter street or area name"
                      className="w-full px-4 py-3 pl-10 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--ashoka-blue)]"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    <MapPin className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
                    <button className="absolute right-3 top-2.5 px-3 py-1 bg-[var(--ashoka-blue)]/10 text-[var(--ashoka-blue)] rounded-lg text-xs font-bold hover:bg-[var(--ashoka-blue)]/20">
                      Use Current
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe the problem..."
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--ashoka-blue)]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <button className="flex-1 py-3 bg-muted border border-border rounded-xl flex items-center justify-center space-x-2 hover:bg-muted-foreground/10 transition-colors">
                    <Mic size={20} className="text-red-500" />
                    <span>Voice Note</span>
                  </button>
                  <button className="flex-1 py-3 bg-muted border border-border rounded-xl flex items-center justify-center space-x-2 hover:bg-muted-foreground/10 transition-colors">
                    <Camera size={20} className="text-[var(--ashoka-blue)]" />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <h3 className="text-xl font-bold mb-6">Review & Submit</h3>
              <div className="bg-muted/50 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-muted-foreground font-medium">Category</span>
                  <span className="font-bold capitalize">{formData.category}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-muted-foreground font-medium">Location</span>
                  <span className="font-bold">{formData.location || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground font-medium block mb-1">Description</span>
                  <p className="text-sm font-medium">{formData.description || "No description provided."}</p>
                </div>
              </div>
              
              <div className="mt-8 flex items-start space-x-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="p-1 bg-orange-200 rounded text-orange-700 mt-0.5">
                  <span className="text-[10px] font-bold">INFO</span>
                </div>
                <p className="text-xs text-orange-800">
                  By submitting, you agree that the information provided is accurate. False reporting may lead to penalization.
                </p>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Complaint Submitted!</h3>
                <p className="text-muted-foreground">Your Complaint ID is <span className="font-bold text-foreground">SB-98234</span></p>
              </div>
              <div className="p-4 bg-[var(--ashoka-blue)]/5 rounded-2xl">
                <p className="text-sm text-[var(--ashoka-blue)] font-bold">You earned 10 Credits! 🪙</p>
              </div>
              <button 
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-[var(--ashoka-blue)] text-white rounded-xl font-bold"
              >
                Report Another Issue
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 4 && (
          <div className="mt-auto pt-8 flex justify-between items-center">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground font-bold"
              >
                <ChevronLeft size={20} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={step === 3 ? handleSubmit : handleNext}
              className="px-8 py-3 bg-[var(--ashoka-blue)] text-white rounded-xl font-bold flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <span>{step === 3 ? "Submit Complaint" : "Next Step"}</span>
              {step < 3 && <ChevronRight size={18} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
