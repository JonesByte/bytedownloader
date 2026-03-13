import React from 'react';
import { FEATURES } from '../constants';
import { Globe, Zap, Image as ImageIcon, RefreshCw, Shield, Video, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
  globe: Video,
  zap: Zap,
  image: Layers,
  refresh: RefreshCw,
  shield: Shield,
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-byte-dark relative overflow-hidden">
       {/* Decorative Lines */}
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-byte-purple to-transparent opacity-50"></div>
       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-byte-cyan to-transparent opacity-50"></div>
       
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-tech font-bold mb-4 text-white">
            RECURSOS <span className="text-byte-purple">MATADORES</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Desenvolvido por quem entende, para quem exige o melhor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <motion.div 
                key={feature.id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
                className="group relative p-6 rounded-2xl bg-byte-surface border border-white/5 hover:border-byte-cyan/50 transition-all duration-300 hover:transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-byte-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-14 h-14 rounded-xl bg-byte-navy border border-white/10 flex items-center justify-center mb-6 group-hover:border-byte-cyan/50 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
                  <Icon className="text-byte-cyan" size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 font-tech group-hover:text-byte-cyan transition-colors">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};