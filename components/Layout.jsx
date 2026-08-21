import { Sora } from "next/font/google";
import Head from "next/head";

import Header from "../components/Header";
import Nav from "../components/Nav";

import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "./Socials";
import ScrollToTop from "./ScrollToTop";

// setup font
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const Layout = ({ children }) => {
  return (
    <main
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      {/* metadata */}
      <Head>
        <title>Taynara Lemes | Consultora Evoramaxx</title>
        <meta
          name="description"
          content="Especialista em proteção e estética automotiva pela Evoramaxx. Catálogo completo de películas e acessórios."
        />
        <meta
          name="keywords"
          content="evoramaxx, peliculas automotivas, ppf, vitrificacao, geely, acessorios automotivos"
        />
        <meta name="author" content="Taynara Leal" />
        <meta name="theme-color" content="#f13024" />
      </Head>


      <Nav />
      <Header />

      {/* main content */}
      {children}

      <a
        href="https://wa.me/55119322760897"
        target="_blank"
        rel="noreferrer"
        onClick={(e) => {
          e.preventDefault();
          window.open(getWhatsAppLink(), "_blank");
        }}
        className="fixed bottom-10 right-6 xl:right-10 xl:bottom-16 z-[200] bg-[#25D366] text-white p-4 xl:p-5 rounded-full shadow-lg hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300 flex items-center justify-center group"
      >
        <FaWhatsapp className="text-3xl xl:text-4xl" />
        <span className="absolute right-full mr-4 bg-black/80 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
          Fale comigo
        </span>
      </a>
      <ScrollToTop />
    </main>
  );
};

export default Layout;
