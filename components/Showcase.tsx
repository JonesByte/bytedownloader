import React, { useState, useEffect, useRef } from 'react';
import { THEMES } from '../constants';
import { ChevronLeft, ChevronRight, Maximize2, Monitor, Download, Play, Image as ImageIcon, Cpu, Settings, Search, CheckCircle2, X, Palette } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useAppVersion } from '../hooks/useAppVersion';

const UISimulation: React.FC<{ index: number }> = ({ index }) => {
  const appVersion = useAppVersion();  
  const renderContent = () => {
    switch(index) {
      case 0:
        return (
          <div className="p-8 space-y-6 min-h-[500px]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 w-full max-w-xl">
                <Search size={18} className="text-gray-500" />
                <span className="text-gray-400 text-sm">https://youtube.com/watch?v=8K_VIDEO_DEMO...</span>
              </div>
              <div className="px-6 py-3 bg-byte-cyan text-byte-navy font-black rounded-xl text-xs">ANALISAR LINK</div>
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-panel p-4 rounded-xl flex items-center gap-4 border-l-4 border-byte-cyan">
                <div className="w-24 h-14 bg-gray-800 rounded-lg flex items-center justify-center"><Play size={20} className="text-byte-cyan" /></div>
                <div className="flex-1">
                  <div className="h-3 w-48 bg-white/10 rounded mb-2"></div>
                  <div className="flex gap-2">
                    <div className="h-2 w-16 bg-byte-cyan/30 rounded"></div>
                    <div className="h-2 w-12 bg-white/5 rounded"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-byte-cyan font-bold text-xs mb-1">8K HDR</div>
                  <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{width: 0}} animate={{width: i === 1 ? '75%' : '100%'}} className="h-full bg-byte-cyan shadow-[0_0_10px_#00F0FF]"></motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="p-8 grid grid-cols-4 gap-4 min-h-[500px]">
             {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="aspect-square glass-panel rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-byte-cyan/50">
                  <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                    <ImageIcon size={24} className="text-gray-700 group-hover:text-byte-cyan transition-colors" />
                  </div>
               </div>
             ))}
          </div>
        );
      case 2:
        return (
          <div className="p-8 space-y-6 min-h-[500px]">
             <div className="grid grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className="glass-panel rounded-2xl overflow-hidden border border-white/5">
                     <div className="aspect-video bg-gray-800 flex items-center justify-center">
                        <ImageIcon size={32} className="text-white/10" />
                     </div>
                     <div className="p-4 flex justify-between items-center">
                        <div className="h-2 w-24 bg-white/10 rounded"></div>
                        <div className="px-3 py-1 bg-byte-cyan/20 text-byte-cyan text-[10px] rounded">MAX RES</div>
                     </div>
                  </div>
                ))}
             </div>
             <div className="flex justify-center pt-8">
                <div className="px-10 py-4 bg-byte-cyan text-byte-navy font-black rounded-2xl">BAIXAR TODAS AS CAPAS</div>
             </div>
          </div>
        );
      case 3:
        return (
          <div className="p-8 flex flex-col items-center justify-center h-full gap-8">
             <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-byte-cyan/30">
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                   <div className="flex gap-12 items-center">
                      <div className="text-center">
                         <div className="text-[10px] font-tech text-gray-500 mb-2">ORIGINAL (480P)</div>
                         <div className="w-32 h-32 bg-white/5 blur-sm rounded-lg flex items-center justify-center"><ImageIcon className="opacity-20" /></div>
                      </div>
                      <motion.div animate={{scale: [1, 1.1, 1]}} transition={{repeat: Infinity}} className="text-byte-cyan"><Cpu size={32} /></motion.div>
                      <div className="text-center">
                         <div className="text-[10px] font-tech text-byte-cyan mb-2">BYTE-AI (4K HDR)</div>
                         <div className="w-32 h-32 bg-byte-cyan/10 border border-byte-cyan/30 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.2)]"><ImageIcon className="text-byte-cyan" /></div>
                      </div>
                   </div>
                </div>
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-byte-cyan shadow-[0_0_15px_#00F0FF]"></div>
             </div>
             <div className="flex gap-4">
                <div className="px-8 py-3 bg-byte-purple text-white rounded-xl font-bold text-sm">INICIAR PROCESSAMENTO GPU</div>
                <div className="px-8 py-3 border border-white/10 text-gray-400 rounded-xl font-bold text-sm">CONFIGURAR MODELO IA</div>
             </div>
          </div>
        );
      case 4:
        return (
          <div className="p-8 space-y-6 min-h-[500px]">
             <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-byte-cyan/10 rounded-full flex items-center justify-center border border-byte-cyan/30">
                   <Palette size={40} className="text-byte-cyan" />
                </div>
                <div className="text-center">
                   <h4 className="text-white font-bold text-lg">Conversor FFmpeg Integrado</h4>
                   <p className="text-gray-500 text-sm">Arraste arquivos para converter para MP4, MKV, MP3 ou WAV.</p>
                </div>
                <div className="w-full max-w-md p-4 bg-white/5 border border-dashed border-white/20 rounded-2xl text-center text-gray-600 text-xs">
                   DROP FILES HERE
                </div>
                <div className="flex gap-3">
                   <div className="px-4 py-2 bg-white/5 rounded-lg text-white text-xs">H.264</div>
                   <div className="px-4 py-2 bg-white/5 rounded-lg text-white text-xs">H.265</div>
                   <div className="px-4 py-2 bg-byte-cyan/20 text-byte-cyan rounded-lg text-xs">PRO PRESET</div>
                </div>
             </div>
          </div>
        );
      case 5:
        return (
          <div className="p-12 space-y-8 min-h-[500px]">
             <div className="flex items-center gap-6 pb-6 border-b border-white/5">
                <div className="w-16 h-16 rounded-2xl bg-byte-purple/20 flex items-center justify-center border border-byte-purple/40">
                   <Settings size={32} className="text-byte-purple" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl font-tech uppercase tracking-widest">Painel de Preferências</h4>
                  <p className="text-gray-500 text-sm">Ajustes finos para máxima performance de hardware.</p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-8">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="flex justify-between items-center p-4 glass-panel rounded-xl">
                    <div className="h-3 w-40 bg-white/10 rounded"></div>
                    <div className="w-10 h-5 bg-byte-cyan/20 rounded-full border border-byte-cyan/40 relative">
                       <div className="absolute right-1 top-1 w-3 h-3 bg-byte-cyan rounded-full"></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-[#050C16] relative overflow-hidden font-sans">
       <div className="absolute left-0 top-10 bottom-0 w-16 md:w-20 bg-black/40 border-r border-white/5 flex flex-col items-center py-8 gap-6 z-10">
          <div className={`p-3 rounded-xl ${index === 0 ? 'bg-byte-cyan text-byte-navy shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'text-gray-600'}`}><Download size={20} /></div>
          <div className={`p-3 rounded-xl ${index === 1 ? 'bg-byte-cyan text-byte-navy shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'text-gray-600'}`}><ImageIcon size={20} /></div>
          <div className={`p-3 rounded-xl ${index === 2 ? 'bg-byte-cyan text-byte-navy shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'text-gray-600'}`}><Monitor size={20} /></div>
          <div className={`p-3 rounded-xl ${index === 3 ? 'bg-byte-cyan text-byte-navy shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'text-gray-600'}`}><Cpu size={20} /></div>
          <div className={`p-3 rounded-xl ${index === 4 ? 'bg-byte-cyan text-byte-navy shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'text-gray-600'}`}><Palette size={20} /></div>
          <div className="mt-auto mb-4">
            <div className={`p-3 rounded-xl ${index === 5 ? 'bg-byte-cyan text-byte-navy shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'text-gray-600'}`}><Settings size={20} /></div>
          </div>
       </div>
       
       <div className="pl-20 pt-10 h-full w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              className="h-full w-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
       </div>

       <div className="absolute top-14 right-8 flex gap-2">
          <div className="px-3 py-1 bg-green-500/20 text-green-400 text-[9px] font-black font-tech border border-green-500/30 rounded uppercase tracking-tighter flex items-center gap-1">
             <CheckCircle2 size={10} /> CORE V{appVersion.toUpperCase()} ESTÁVEL
          </div>
          <div className="px-3 py-1 bg-byte-cyan/20 text-byte-cyan text-[9px] font-black font-tech border border-byte-cyan/30 rounded uppercase tracking-tighter">
             GPU ACCEL: ON
          </div>
       </div>
    </div>
  );
};

export const Showcase: React.FC<{ currentThemeIndex: number, setCurrentThemeIndex: (index: number) => void }> = ({ currentThemeIndex, setCurrentThemeIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const currentTheme = THEMES[currentThemeIndex];
  const currentScreenshots = currentTheme.screenshots;

  useEffect(() => {
    if (isFullScreen) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentScreenshots.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isFullScreen, currentScreenshots.length]);

  useEffect(() => {
    const activeThumb = thumbnailRefs.current[currentIndex];
    const container = thumbnailsContainerRef.current;
    if (activeThumb && container) {
      const containerWidth = container.offsetWidth;
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      
      const scrollPos = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
      
      container.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % currentScreenshots.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + currentScreenshots.length) % currentScreenshots.length);
  };

  const handleImageError = (index: number) => {
    const screenshotId = currentScreenshots[index].id;
    console.warn(`Asset ${currentScreenshots[index].url} não carregado. Ativando Modo Simulação para o usuário.`);
    setImageErrors(prev => ({ ...prev, [screenshotId]: true }));
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleThemeChange = (index: number) => {
    setCurrentThemeIndex(index);
    setCurrentIndex(0);
  };

  return (
