import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Socials from "../components/Socials";

const Header = () => {
  const router = useRouter();
  
  // Ocultar header na página de catálogo para dar espaço ao menu
  if (router.pathname === "/catalogo") return null;

  return (
    <header className="absolute z-30 w-full items-center px-4 md:px-16 xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-4 py-6 md:py-8">
          {/* logo */}
          <Link href="/">
            <div className="text-3xl font-bold tracking-tight text-white">
              <span className="text-[#CBA135]">T</span>aynara <span className="text-[#CBA135]">L</span><span className="font-light">eal.</span>
            </div>
          </Link>

          {/* socials */}
          <Socials />
        </div>
      </div>
    </header>
  );
};

export default Header;
