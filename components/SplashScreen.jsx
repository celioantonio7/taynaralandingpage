import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="mx-[2px] w-6 h-6 md:w-8 md:h-8">
    {/* Traço Branco (Fixo) \ */}
    <line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" />
    
    {/* Traço Dourado (Enrolando/Desenhando) / */}
    <line 
      x1="18" y1="6" x2="6" y2="18" 
      stroke="#CBA135" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeDasharray="20"
      strokeDashoffset="20"
      className="animate-draw-x"
      style={{ filter: "drop-shadow(0 0 4px rgba(203,161,53,0.8))" }}
    />
  </svg>
);

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Simula o carregamento
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsClosing(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 1800); // tempo exato para a animação das linhas nvg8 terminar
          }, 400); // pequena pausa no 100% antes de explodir as linhas
          return 100;
        }
        return prev + 1;
      });
    }, 25); 

    return () => clearInterval(interval);
  }, [onComplete]);

  // Cores de luxo da Evoramaxx para as linhas
  const lineColors = ["#F13024", "#CBA135", "#FFFFFF", "#F13024", "#CBA135"];

  return (
    <>
      <style>{`
        @keyframes drawX {
          0% { stroke-dashoffset: 20; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 20; }
        }
        .animate-draw-x {
          animation: drawX 1.5s ease-in-out infinite;
        }
      `}</style>
      
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden font-sora">
        
        {/* Fundo Escuro Base (Desaparece quando as linhas terminam de preencher) */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          transition={{ duration: 0.2, delay: 0.7 }}
          className="absolute inset-0 bg-[#131424] pointer-events-none"
        />

        {/* Efeito Inspirado no Nvg8 (Linhas Horizontais Cortando a Tela) */}
        {isClosing && (
          <div className="absolute inset-0 flex flex-col z-20 pointer-events-none">
            {lineColors.map((color, i) => (
              <motion.div
                key={i}
                initial={{ width: 0, x: 0 }}
                animate={{ width: "100vw", x: "100vw" }}
                transition={{
                  width: { duration: 0.5, ease: "easeInOut", delay: i * 0.08 },
                  x: { duration: 0.6, ease: "easeInOut", delay: 0.7 + i * 0.08 }
                }}
                className="flex-1 origin-left"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {/* Conteúdo Central do Loading (Desaparece antes das linhas) */}
        <AnimatePresence>
          {!isClosing && (
            <motion.div 
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none"
            >
              <div className="flex items-center">
                
                {/* Lado Esquerdo: Taynara e Especialista */}
                <div className="flex flex-col items-end mr-4 md:mr-6">
                  <div className="text-2xl md:text-4xl font-bold tracking-widest text-white">
                    <span className="text-accent">T</span>aynara&nbsp;
                    <span className="text-accent">L</span>eal
                  </div>
                  <div className="text-accent text-[10px] md:text-sm tracking-[0.4em] uppercase mt-2">
                    Especialista
                  </div>
                </div>
                
                {/* Separador */}
                <span className="text-white/20 text-4xl md:text-6xl font-light mx-2">|</span>
                
                {/* Lado Direito: Evoramaxx */}
                <div className="flex flex-col items-start ml-4 md:ml-6">
                  <div className="text-2xl md:text-4xl font-bold tracking-widest text-white leading-none mb-1">
                    <span className="text-[#CBA135]">é</span>vora
                  </div>
                  <div className="flex items-center text-2xl md:text-4xl font-bold tracking-widest text-white leading-none">
                    ma
                    <AnimatedX />
                    <AnimatedX />
                  </div>
                </div>
              </div>

              {/* Porcentagem de Carregamento */}
              <div className="absolute bottom-20 text-white/40 text-sm md:text-xl font-light tracking-[0.3em]">
                {progress}%
              </div>

              {/* Linha de progresso no fundo */}
              <div className="absolute bottom-0 left-0 h-1 bg-accent/20 w-full">
                <div 
                  className="h-full bg-accent transition-all duration-75 ease-linear shadow-[0_0_15px_#F13024]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SplashScreen;
