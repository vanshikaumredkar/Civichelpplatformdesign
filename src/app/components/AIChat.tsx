import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Cpu, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}

export const AIChat: React.FC<{ language?: string }> = ({ language = "en" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: language === "hi" ? "नमस्ते! मैं आपका स्वावलंबन सहायक हूं। मैं आज आपकी क्या सहायता कर सकता हूं?" : "Namaste! I am your Swavlamban Sahayak. How can I help you today?", sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync initial message if language changes while chat is empty or just started
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === "bot") {
      setMessages([{ id: 1, text: language === "hi" ? "नमस्ते! मैं आपका स्वावलंबन सहायक हूं। मैं आज आपकी क्या सहायता कर सकता हूं?" : "Namaste! I am your Swavlamban Sahayak. How can I help you today?", sender: "bot", time: messages[0].time }]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Mock AI Response
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: getAIResponse(input, language),
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const getAIResponse = (text: string, lang: string) => {
    const t = text.toLowerCase();
    if (t.includes("report") || t.includes("शिकायत")) {
      return lang === "hi" 
        ? "आप मेनू में 'शिकायत दर्ज करें' अनुभाग पर जाकर शिकायत दर्ज कर सकते हैं। आप किस समस्या का सामना कर रहे हैं?" 
        : "You can report an issue by going to the 'Report Issue' section in the menu. What problem are you facing?";
    }
    if (t.includes("track") || t.includes("status")) {
      return lang === "hi" 
        ? "अपनी शिकायत को ट्रैक करने के लिए, कृपया 'ट्रैक इशू' अनुभाग में अपनी शिकायत आईडी या मोबाइल नंबर प्रदान करें।" 
        : "To track your complaint, please provide your Complaint ID or Mobile number in the 'Track Issue' section.";
    }
    if (t.includes("credits") || t.includes("coins")) {
      return lang === "hi" 
        ? "आप अपनी प्रत्येक शिकायत दर्ज करने और सत्यापित करने पर सिक्के कमाते हैं। आप उन्हें दैनिक उत्पादों के लिए 'क्रेडिट' अनुभाग में भुना सकते हैं।" 
        : "You earn coins for every complaint you file and verify. You can redeem them in the 'Credits' section for daily products.";
    }
    return lang === "hi" 
      ? "बिल्कुल! मैं नागरिक मुद्दों की रिपोर्ट करने, उन्हें ट्रैक करने या हमारी इनाम प्रणाली को समझने में आपकी सहायता कर सकता हूं। कृपया मुझे और बताएं।" 
      : "Bilkul! I can help you with reporting civic issues, tracking them, or understanding our reward system. Please tell me more.";
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-card border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-[var(--ashoka-blue)] text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Cpu size={24} />
                </div>
                <div>
                  <div className="font-bold text-sm">{language === "hi" ? "स्वावलंबन सहायक" : "Swavlamban Sahayak"}</div>
                  <div className="text-[10px] opacity-80 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1" />
                    {language === "hi" ? "AI सहायक • ऑनलाइन" : "AI Assistant • Online"}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                    <div className={`p-3 rounded-2xl text-sm font-medium ${
                      msg.sender === "user" 
                        ? "bg-[var(--ashoka-blue)] text-white rounded-tr-none" 
                        : "bg-white border border-border rounded-tl-none shadow-sm"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-card border-t border-border flex items-center space-x-2">
              <input
                type="text"
                placeholder={language === "hi" ? "अंग्रेजी या हिंग्लिश में टाइप करें..." : "Type in English or Hinglish..."}
                className="flex-1 bg-muted px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[var(--ashoka-blue)]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit"
                className="w-10 h-10 bg-[var(--ashoka-blue)] text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[var(--ashoka-blue)] text-white rounded-full shadow-2xl flex items-center justify-center relative group"
      >
        <div className="absolute -top-2 -right-2 bg-[var(--saffron)] text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-background">
          AI
        </div>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-16 bg-card border border-border px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {language === "hi" ? "मैं आपकी कैसे सहायता कर सकता हूँ?" : "How can I help you?"} 👋
          </div>
        )}
      </motion.button>
    </div>
  );
};
