import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";
import { fadeIn } from "../variants";
import { HiChevronDown } from "react-icons/hi2";

const Home = () => {
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e) => {
      if (e.deltaY > 50) {
        // Scroll down threshold
        router.push("/catalogo");
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      // Se o usuário deslizar para cima (scroll down) mais de 50px
      if (touchStartY - touchEndY > 50) {
        router.push("/catalogo");
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [router]);

  return (
    <div ref={containerRef} className="bg-primary/60 h-full overflow-hidden relative">
      {/* text */}
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10 flex items-center relative z-10">
        <div className="text-center flex flex-col justify-center xl:text-left h-full container mx-auto pt-20 xl:pt-0">
          {/* title */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1 mb-6 xl:mt-0"
          >
            Proteção automotiva <br />
            <span className="text-accent">premium e sob medida.</span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 text-white/80 leading-relaxed"
          >
            Sou <span className="font-bold text-white">Taynara Lemes</span>, especialista em proteção e estética automotiva pela Evoramaxx.
            Navegue pelo nosso catálogo e encontre os melhores acessórios e películas para o seu carro,
            com instalação impecável e garantia de qualidade.
          </motion.p>

          {/* btn */}
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden md:flex justify-center xl:justify-start relative z-[100]"
          >
            <ProjectsBtn />
          </motion.div>
        </div>
      </div>

      {/* image & particles */}
      <div className="w-full xl:w-[1280px] h-full absolute right-0 bottom-0 pointer-events-none">
        {/* bg img - deslocado MUITO MAIS para cima e centralizado */}
        <div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-center xl:bg-no-repeat w-full h-[140%] absolute -top-[30%] mix-blend-color-dodge translate-z-0" />

        {/* particles */}
        <ParticlesContainer />

        {/* avatar */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full max-w-[550px] max-h-[500px] absolute top-[25%] -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center"
        >
          {/* Fundo escuro radial apenas atrás dela para destacar a foto do fundo desenhado */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/60 via-black/10 to-transparent blur-2xl scale-110 -z-10" />
          <Avatar />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 md:bottom-8 inset-x-0 mx-auto w-max z-[100] flex flex-col items-center opacity-70 animate-bounce pointer-events-none"
      >
        <span className="text-[10px] md:text-[11px] uppercase tracking-widest mb-1 text-white/80 font-medium md:font-semibold">
          <span className="md:hidden">Catálogo</span>
          <span className="hidden md:inline">Role para baixo</span>
        </span>
        <HiChevronDown className="text-2xl text-accent" />
      </motion.div>
    </div>
  );
};

export default Home;
