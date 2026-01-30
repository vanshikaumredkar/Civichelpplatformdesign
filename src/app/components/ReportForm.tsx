import React, { useState } from "react";
import { 
  FileText, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Upload, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export const ReportForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    hasImage: false,
    hasVideo: false,
  });

  const handleNext = () => {
    if (step === 1 && !formData.issueType) {
      toast.error("Please enter the issue type");
      return;
    }
    if (step === 2 && !formData.description) {
      toast.error("Please provide a description");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    toast.success("Complaint submitted successfully! ID: CC-2026-X12");
    setStep(4);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-900 dark:text-blue-100 flex items-center justify-center space-x-2">
          <FileText className="text-blue-700" />
          <span>Report a Civic Issue</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-md mx-auto mb-8">
          Help us improve your community by detailing the problem below. Our team will review and act promptly.
        </p>
        
        <div className="flex justify-center items-center space-x-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s ? "bg-blue-700 text-white shadow-lg scale-110" : "bg-muted text-muted-foreground"
              }`}>
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-1 transition-colors ${step > s ? "bg-blue-700" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border p-8 rounded-3xl shadow-xl min-h-[450px] flex flex-col relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 flex items-center justify-center text-sm">1</span>
                <span>Issue Category</span>
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">What type of issue are you facing?</label>
                  <input
                    type="text"
                    placeholder="e.g., Pothole, Street Light, Waste Collection..."
                    className="w-full px-5 py-4 bg-muted/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-card transition-all text-lg"
                    value={formData.issueType}
                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                    autoFocus
                  />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Road Repair", "Water Leakage", "Garbage", "Power Cut"].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setFormData({ ...formData, issueType: tag })}
                        className="px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-100 dark:border-blue-800 hover:bg-blue-100 transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
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
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 flex items-center justify-center text-sm">2</span>
                <span>Details & Media</span>
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">Describe the situation</label>
                  <textarea
                    rows={5}
                    placeholder="Provide as much detail as possible (location, time, severity)..."
                    className="w-full px-5 py-4 bg-muted/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-card transition-all"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setFormData({...formData, hasImage: true})}
                    className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                      formData.hasImage ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-border hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    {formData.hasImage ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="text-green-600 mb-2" size={32} />
                        <span className="text-xs font-bold text-green-700">Image Attached</span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="text-muted-foreground mb-2" size={32} />
                        <span className="text-xs font-bold text-muted-foreground uppercase">Upload Image</span>
                      </>
                    )}
                  </div>
                  <div 
                    onClick={() => setFormData({...formData, hasVideo: true})}
                    className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                      formData.hasVideo ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-border hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    {formData.hasVideo ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="text-green-600 mb-2" size={32} />
                        <span className="text-xs font-bold text-green-700">Video Attached</span>
                      </div>
                    ) : (
                      <>
                        <VideoIcon className="text-muted-foreground mb-2" size={32} />
                        <span className="text-xs font-bold text-muted-foreground uppercase">Upload Video</span>
                      </>
                    )}
                  </div>
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
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 flex items-center justify-center text-sm">3</span>
                <span>Review Report</span>
              </h3>
              <div className="bg-muted/50 p-6 rounded-2xl space-y-4 border border-border">
                <div className="flex justify-between items-center border-b border-border/50 pb-3">
                  <span className="text-muted-foreground text-sm font-bold uppercase tracking-tight">Category</span>
                  <span className="font-bold text-blue-900 dark:text-blue-100">{formData.issueType}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground text-sm font-bold uppercase tracking-tight">Description</span>
                  <p className="text-sm leading-relaxed">{formData.description}</p>
                </div>
                <div className="flex space-x-3 mt-4">
                  {formData.hasImage && <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 rounded-full text-xs font-bold border border-green-200">Image Attached</div>}
                  {formData.hasVideo && <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 rounded-full text-xs font-bold border border-green-200">Video Attached</div>}
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-start space-x-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0">
                  <Upload size={16} />
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-300 leading-normal">
                  Your report will be shared with the relevant department. Personal information is handled securely under our privacy policy.
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
              <div className="relative">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 size={56} />
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center border-4 border-card"
                >
                  <CheckCircle2 size={20} />
                </motion.div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Report Submitted Successfully</h3>
                <p className="text-muted-foreground">Your Reference ID is <span className="font-bold text-blue-700">CC-2026-X12</span></p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800">
                <p className="text-sm text-green-800 dark:text-green-300 font-bold">100 Credits Earned! 🪙</p>
              </div>
              <button 
                onClick={() => { setStep(1); setFormData({ issueType: "", description: "", hasImage: false, hasVideo: false }); }}
                className="px-8 py-3 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg active:scale-95"
              >
                File Another Report
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 4 && (
          <div className="mt-auto pt-8 flex justify-between items-center border-t border-border">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-muted-foreground hover:text-blue-700 font-bold transition-colors"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={step === 3 ? handleSubmit : handleNext}
              className={`px-10 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg active:scale-95 transition-all ${
                step === 3 ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-700 text-white hover:bg-blue-800"
              }`}
            >
              <span>{step === 3 ? "Confirm & Submit" : "Continue"}</span>
              {step < 3 && <ChevronRight size={18} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
