import Image from "next/image";
import Link from "next/link";

import { HiArrowRight } from "react-icons/hi2";

const ProjectsBtn = () => {
  return (
    <div className="mx-auto xl:mx-0 z-10">
      <Link
        href="/catalogo"
        className="relative w-[185px] h-[185px] flex justify-center items-center group"
      >
        {/* Background Spinning Star */}
        <div className="absolute inset-0 bg-circleStar bg-cover bg-center bg-no-repeat animate-spin-slow [animation-direction:reverse] opacity-80" />

        <svg
          viewBox="0 0 100 100"
          className="hidden md:block animate-spin-slow w-full h-full max-w-[141px] max-h-[148px] pointer-events-none select-none z-10"
        >
          <path
            id="textPath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="transparent"
          />
          <text className="text-[12px] font-semibold uppercase tracking-[0.25em] fill-white">
            <textPath href="#textPath" startOffset="0%">
              CATÁLOGO · CATÁLOGO ·
            </textPath>
          </text>
        </svg>
        <HiArrowRight
          className="absolute text-4xl group-hover:translate-x-2 transition-all duration-300 z-10"
          aria-hidden
        />
      </Link>
    </div>
  );
};

export default ProjectsBtn;
