import React from "react";
import { Target, Eye, ShieldCheck, Users, Globe, Building } from "lucide-react";
import { motion } from "motion/react";

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Intro */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-950 dark:text-white mb-6">About CivicConnect</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We are building the bridge between digital technology and civic responsibility. Our platform empowers every citizen to contribute to their city's well-being with transparency and accountability.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-card border-2 border-blue-50 dark:border-blue-900/30 p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors" />
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-2xl flex items-center justify-center mb-8">
            <Eye size={32} />
          </div>
          <h3 className="text-3xl font-extrabold text-blue-950 dark:text-white mb-6">Our Vision</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            To create fully transparent, automated, and citizen-centric cities where every reported issue is resolved with maximum efficiency. We envision a future where technology eliminates bureaucratic delays and puts power directly in the hands of the people.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-card border-2 border-green-50 dark:border-green-900/30 p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 dark:bg-green-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-100 transition-colors" />
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-2xl flex items-center justify-center mb-8">
            <Target size={32} />
          </div>
          <h3 className="text-3xl font-extrabold text-blue-950 dark:text-white mb-6">Our Mission</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Building intuitive digital solutions that simplify civic engagement. Our mission is to provide a reliable channel for citizens to communicate with local governance, ensuring that public infrastructure is maintained and improved through collective oversight.
          </p>
        </motion.div>
      </div>

      {/* Core Values */}
      <div className="bg-muted/30 rounded-[3rem] p-12">
        <h3 className="text-2xl font-bold text-center mb-12">Our Core Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Accountability", text: "Every report is tracked and time-stamped for absolute transparency." },
            { icon: Users, title: "Inclusivity", text: "Designed for all citizens, regardless of their technical expertise." },
            { icon: Globe, title: "Sustainability", text: "Promoting green initiatives and waste management tracking." },
            { icon: Building, title: "Smart Governance", text: "Integration with modern municipal management systems." },
          ].map((item, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-12 h-12 bg-white dark:bg-card rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
                <item.icon className="text-blue-700" size={24} />
              </div>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
