import Link from "next/link";

import {
  RiWhatsappLine,
  RiLinkedinBoxLine,
  RiInstagramLine,
} from "react-icons/ri";

export const socialData = [
  {
    name: "WhatsApp",
    link: "#", // Overridden by onClick
    Icon: RiWhatsappLine,
    isWhatsapp: true,
  },
  {
    name: "Instagram",
    link: "https://instagram.com/consultora.taynaraleal",
    Icon: RiInstagramLine,
  }
];

export const getWhatsAppLink = () => {
  const hour = new Date().getHours();
  let greeting = "Bom dia";
  if (hour >= 12 && hour < 18) {
    greeting = "Boa tarde";
  } else if (hour >= 18 || hour < 5) {
    greeting = "Boa noite";
  }
  const text = `${greeting}, Taynara Leal! Gostaria de saber mais sobre as películas e os serviços da Evoramaxx. Pode me ajudar?`;
  return `https://wa.me/55119322760897?text=${encodeURIComponent(text)}`;
};

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-xl md:text-3xl">
      {socialData.map((social, i) => (
        <Link
          href={social.isWhatsapp ? "https://wa.me/55119322760897" : social.link}
          key={i}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (social.isWhatsapp) {
              e.preventDefault();
              window.open(getWhatsAppLink(), "_blank");
            }
          }}
          className="hover:text-accent transition-all duration-300"
        >
          <social.Icon />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
