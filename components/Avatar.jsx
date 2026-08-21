import Image from "next/image";

const Avatar = ({ src = "/taynara-no-bg.png" }) => {
  return (
    <div className="hidden xl:flex pointer-events-none select-none relative flex-col items-center">
      {/* Moldura Glassmorphism Circular */}
      <div className="w-[450px] h-[450px] rounded-full overflow-hidden border-[2px] border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] relative flex items-end justify-center">
        
        {/* Fundo escuro/colorido sutil dentro da moldura para dar contraste à foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0" />

        <Image
          src={src}
          alt="Taynara Leal – Consultora Evoramaxx"
          width={737}
          height={678}
          className="translate-z-0 w-[90%] h-auto object-contain relative z-10 translate-y-6"
        />
      </div>

      {/* Etiqueta Flutuante Premium */}
      <div className="absolute -bottom-3 bg-[#131424] border border-white/20 px-6 py-2 rounded-full shadow-2xl backdrop-blur-md z-20">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
          Especialista
        </p>
      </div>
    </div>
  );
};

export default Avatar;
