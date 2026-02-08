import React, { useState, useRef } from "react";
import { 
  FileText, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Upload, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { translations } from "@/app/utils/translations";

export const ReportForm: React.FC<{ language?: string }> = ({ language = "en" }) => {
  const t = translations[language] || translations.en;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    imageFile: null as File | null,
    videoFile: null as File | null,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    if (step === 1 && !formData.issueType) {
      toast.error(language === "hi" ? "कृपया समस्या का प्रकार चुनें" : "Please enter the issue type");
      return;
    }
    if (step === 2 && !formData.description) {
      toast.error(language === "hi" ? "कृपया विवरण प्रदान करें" : "Please provide a description");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    // Simulated AI Classification
    const criticalKeywords = ["accident", "burst", "fire", "flood", "collapse", "broken", "massive", "danger"];
    const isMajor = criticalKeywords.some(key => 
      formData.issueType.toLowerCase().includes(key) || 
      formData.description.toLowerCase().includes(key)
    );
    
    const aiLabel = isMajor ? "Major" : "Minor";
    
    const newReport = {
      id: `SB-2026-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      type: formData.issueType,
      location: "Current Location", // Placeholder
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Pending",
      aiClassification: aiLabel,
      description: formData.description
    };

    // Save to localStorage for demo persistence
    const existingReports = JSON.parse(localStorage.getItem("userReports") || "[]");
    localStorage.setItem("userReports", JSON.stringify([newReport, ...existingReports]));

    toast.success(language === "hi" ? `शिकायत सफलतापूर्वक दर्ज की गई! आईडी: ${newReport.id}` : `Complaint submitted successfully! ID: ${newReport.id}`);
    setStep(4);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'image') setFormData({ ...formData, imageFile: file });
      else setFormData({ ...formData, videoFile: file });
      toast.success(`${file.name} uploaded!`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Hidden Inputs */}
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={imageInputRef} 
        onChange={(e) => handleFileChange(e, 'image')}
      />
      <input 
        type="file" 
        accept="video/*" 
        className="hidden" 
        ref={videoInputRef} 
        onChange={(e) => handleFileChange(e, 'video')}
      />

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-900 dark:text-blue-100 flex items-center justify-center space-x-2">
          <FileText className="text-blue-700" />
          <span>{t.reportIssue}</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-md mx-auto mb-8">
          {language === "hi" ? "समस्या का विवरण नीचे देकर हमारे समुदाय को बेहतर बनाने में मदद करें।" : "Help us improve your community by detailing the problem below."}
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
                <span>{t.issueCategory}</span>
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">
                    {language === "hi" ? "आप किस प्रकार की समस्या का सामना कर रहे हैं?" : "What type of issue are you facing?"}
                  </label>
                  <input
                    type="text"
                    placeholder={language === "hi" ? "उदा., गड्ढा, स्ट्रीट लाइट..." : "e.g., Pothole, Street Light..."}
                    className="w-full px-5 py-4 bg-muted/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all text-lg"
                    value={formData.issueType}
                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
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
                <span>{t.detailsMedia}</span>
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">{language === "hi" ? "स्थिति का वर्णन करें" : "Describe the situation"}</label>
                  <textarea
                    rows={4}
                    placeholder={language === "hi" ? "जितना संभव हो उतना विवरण प्रदान करें..." : "Provide as much detail as possible..."}
                    className="w-full px-5 py-4 bg-muted/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => imageInputRef.current?.click()}
                    className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                      formData.imageFile ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-border hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    {formData.imageFile ? (
                      <div className="flex flex-col items-center relative w-full">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setFormData({...formData, imageFile: null}); }}
                          className="absolute -top-4 -right-4 p-1 bg-red-500 text-white rounded-full"
                        >
                          <X size={12} />
                        </button>
                        <CheckCircle2 className="text-green-600 mb-2" size={32} />
                        <span className="text-xs font-bold text-green-700 truncate max-w-full">{formData.imageFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="text-muted-foreground mb-2" size={32} />
                        <span className="text-xs font-bold text-muted-foreground uppercase">{t.uploadPhoto}</span>
                      </>
                    )}
                  </div>
                  <div 
                    onClick={() => videoInputRef.current?.click()}
                    className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                      formData.videoFile ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-border hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    {formData.videoFile ? (
                      <div className="flex flex-col items-center relative w-full">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setFormData({...formData, videoFile: null}); }}
                          className="absolute -top-4 -right-4 p-1 bg-red-500 text-white rounded-full"
                        >
                          <X size={12} />
                        </button>
                        <CheckCircle2 className="text-green-600 mb-2" size={32} />
                        <span className="text-xs font-bold text-green-700 truncate max-w-full">{formData.videoFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <VideoIcon className="text-muted-foreground mb-2" size={32} />
                        <span className="text-xs font-bold text-muted-foreground uppercase">{t.uploadVideo}</span>
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
                <span>{t.review}</span>
              </h3>
              <div className="bg-muted/50 p-6 rounded-2xl space-y-4 border border-border">
                <div className="flex justify-between items-center border-b border-border/50 pb-3">
                  <span className="text-muted-foreground text-sm font-bold uppercase tracking-tight">{language === "hi" ? "श्रेणी" : "Category"}</span>
                  <span className="font-bold text-blue-900 dark:text-blue-100">{formData.issueType}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground text-sm font-bold uppercase tracking-tight">{language === "hi" ? "विवरण" : "Description"}</span>
                  <p className="text-sm leading-relaxed">{formData.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.imageFile && <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 rounded-full text-xs font-bold border border-green-200">Photo: {formData.imageFile.name}</div>}
                  {formData.videoFile && <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 rounded-full text-xs font-bold border border-green-200">Video: {formData.videoFile.name}</div>}
                </div>
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
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 size={56} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{language === "hi" ? "शिकायत सफलतापूर्वक दर्ज की गई" : "Report Submitted Successfully"}</h3>
                <p className="text-muted-foreground">{language === "hi" ? "आपकी संदर्भ आईडी है" : "Your Reference ID is"} <span className="font-bold text-blue-700">SB-2026-X12</span></p>
              </div>
              <button 
                onClick={() => { setStep(1); setFormData({ issueType: "", description: "", imageFile: null, videoFile: null }); }}
                className="px-8 py-3 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg active:scale-95"
              >
                {language === "hi" ? "एक और शिकायत दर्ज करें" : "File Another Report"}
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
                <span>{language === "hi" ? "पीछे" : "Previous"}</span>
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={step === 3 ? handleSubmit : handleNext}
              className={`px-10 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg transition-all ${
                step === 3 ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-700 text-white hover:bg-blue-800"
              }`}
            >
              <span>{step === 3 ? t.submit : (language === "hi" ? "आगे बढ़ें" : "Continue")}</span>
              {step < 3 && <ChevronRight size={18} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
