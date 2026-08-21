import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import { BsArrowRight } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { HiChevronRight } from "react-icons/hi2";
import ParticlesContainer from "../../components/ParticlesContainer";
import dynamic from "next/dynamic";

const CoverflowCarousel = dynamic(
  () => import("../../components/CoverflowCarousel").then((mod) => mod.CoverflowCarousel),
  { ssr: false }
);

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

const workData = [
  {
    category: "Geely EX2",
    subtitle: "16 acessórios disponíveis",
    items: [
      {
        image: "/geely-ex2/ex2-soleira.jpg",
        tag: "Proteção & Estética",
        title: "Soleira Resinada Premium Elegance",
        price: "R$ 890,00",
        fullDesc: "Soleira em resina de alta espessura com logo do modelo, protege a pintura da entrada das portas contra riscos do uso diário.",
        specs: [
          "Jogo com aplicação nas 4 portas",
          "Resina 3D de alta durabilidade, resistente a UV",
          "Instalação por adesivação, sem furos no veículo",
          "Acabamento premium com identificação do modelo",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-carregador.jpg",
        tag: "Tecnologia",
        title: "Carregador por Indução",
        price: "R$ 1.990,00",
        fullDesc: "Carregador por indução integrado ao console, carrega o celular sem cabos com padrão Qi.",
        specs: [
          "Padrão Qi compatível com iPhone e Android",
          "Base antiderrapante integrada ao console",
          "Proteção contra superaquecimento",
          "Instalação com plug original, sem cortes na fiação",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-bandeja.jpg",
        tag: "Organização",
        title: "Bandeja Porta Malas",
        price: "R$ 1.190,00",
        fullDesc: "Bandeja protetora para o porta-malas em material resistente, ideal para evitar sujeira e líquidos no carpete original.",
        specs: [
          "Material impermeável e de alta resistência",
          "Encaixe perfeito no porta-malas do Geely EX2",
          "Fácil remoção para limpeza",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-organizador.jpg",
        tag: "Organização",
        title: "Organizador Apoio de Braço",
        price: "R$ 350,00",
        fullDesc: "Bandeja organizadora para o apoio de braço, aproveita melhor o espaço interno do console.",
        specs: [
          "Divisórias para celular, chaves e cartões",
          "Encaixe exato no console do modelo",
          "Material rígido com revestimento antirruído",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-friso.jpg",
        tag: "Proteção & Estética",
        title: "Friso Premium",
        price: "R$ 990,00",
        fullDesc: "Friso lateral premium que protege as portas de batidas e valoriza o visual do veículo.",
        specs: [
          "Jogo com 4 peças (portas dianteiras e traseiras)",
          "Adesivo automotivo 3M de alta fixação",
          "Acabamento em preto com identificação da marca",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-trava.jpg",
        tag: "Segurança",
        title: "Trava Anti Furto",
        price: "R$ 1.250,00",
        fullDesc: "Jogo de travas antifurto para rodas, dificulta o roubo do conjunto roda/pneu.",
        specs: [
          "4 parafusos antifurto + chave codificada exclusiva",
          "Aço tratado de alta resistência",
          "Torque conforme especificação da montadora",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-streaming-octa.jpg",
        tag: "Multimídia",
        title: "Streaming Box Processador Octacore",
        price: "R$ 6.290,00",
        fullDesc: "Streaming Box com processador Octacore: transforma a multimídia original em Android completo.",
        specs: [
          "Processador Octacore — navegação fluida",
          "Android com Play Store: Netflix, YouTube, Spotify, Waze",
          "Espelhamento sem fio e GPS integrado",
          "Plug and play, sem alterar a central original",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-streaming-quad.jpg",
        tag: "Multimídia",
        title: "Streaming Box Processador Quadcore",
        price: "R$ 5.100,00",
        fullDesc: "Streaming Box com processador Quadcore: apps de vídeo e navegação direto na tela original.",
        specs: [
          "Processador Quadcore, ótimo custo-benefício",
          "Android com Play Store e espelhamento",
          "Instalação plug and play",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-sub68.jpg",
        tag: "Som",
        title: "Subwoofer Slim 6x8\" 140W RMS (embaixo banco)",
        price: "R$ 4.250,00",
        fullDesc: "Subwoofer slim 6x8\" 140W RMS instalado sob o banco: mais grave sem perder espaço.",
        specs: [
          "Potência 140W RMS com módulo integrado",
          "Perfil slim para instalação sob o banco",
          "Ajuste fino de ganho e corte de frequência",
          "Não ocupa o porta-malas",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-sub79.jpg",
        tag: "Som",
        title: "Subwoofer Slim 7x9\" 220W RMS (embaixo banco)",
        price: "R$ 5.600,00",
        fullDesc: "Subwoofer slim 7x9\" 220W RMS sob o banco: grave encorpado com instalação discreta.",
        specs: [
          "Potência 220W RMS com amplificador integrado",
          "Perfil slim, instalação sob o banco",
          "Controle remoto de nível de grave (opcional)",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-sub-hertz.jpg",
        tag: "Som",
        title: "Subwoofer Slim Hertz 8\" 220W RMS (porta malas)",
        price: "R$ 10.550,00",
        fullDesc: "Subwoofer Slim Hertz 8\" 220W RMS no porta-malas: referência em qualidade sonora.",
        specs: [
          "Linha Hertz — qualidade de áudio premium",
          "220W RMS, resposta grave precisa",
          "Instalação no porta-malas com fixação segura",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-capa-pet.jpg",
        tag: "Conforto",
        title: "Capa para Pet",
        price: "R$ 1.450,00",
        fullDesc: "Capa protetora para transporte de pets, cobre bancos traseiros e laterais.",
        specs: [
          "Tecido impermeável e resistente a arranhões",
          "Formato rede: protege bancos e assoalho",
          "Fixação por alças ajustáveis, remoção rápida",
          "Lavável",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-bagageiro.jpg",
        tag: "Aventura & Carga",
        title: "Bagageiro Jet Bag 450 Lts (preta ou cinza)",
        price: "R$ 5.700,00",
        fullDesc: "Bagageiro Jet Bag 450 litros, disponível em preto ou cinza, para ampliar a capacidade de carga.",
        specs: [
          "Capacidade de 450 litros",
          "Abertura bilateral com travamento por chave",
          "Requer travessas de teto",
          "Cores: preto ou cinza",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-travessa.jpg",
        tag: "Aventura & Carga",
        title: "Travessa p/ Longarina (preto ou prata)",
        price: "R$ 6.290,00",
        fullDesc: "Travessa para longarina em preto ou prata, base para bagageiro e suporte de bike.",
        specs: [
          "Par de travessas em alumínio",
          "Fixação na longarina original",
          "Cores: preto ou prata",
          "Base para bagageiro, bike e caiaque",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-tapete.jpg",
        tag: "Proteção & Estética",
        title: "Tapete Interno Carpete",
        price: "R$ 650,00",
        fullDesc: "Jogo de tapetes internos em carpete, com recorte exclusivo para o modelo.",
        specs: [
          "Jogo completo (dianteiro e traseiro)",
          "Carpete de alta gramatura com base antiderrapante",
          "Recorte sob medida com fixadores originais",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex2/ex2-bike.jpg",
        tag: "Aventura & Carga",
        title: "Suporte de Bike (preto ou prata)",
        price: "R$ 4.290,00",
        fullDesc: "Suporte de bike de teto em preto ou prata, transporte seguro sem tirar a roda dianteira.",
        specs: [
          "Transporte de 1 bicicleta por suporte",
          "Travamento por chave no quadro e nas rodas",
          "Requer travessas de teto",
          "Cores: preto ou prata",
        ],
        priceLabel: "Valor instalado",
      },
    ],
  },
  {
    category: "Geely EX5",
    subtitle: "15 acessórios disponíveis",
    items: [
      {
        image: "/geely-ex5/ex5-soleira.jpg",
        tag: "Proteção & Estética",
        title: "Soleira Resinada Premium Elegance",
        price: "R$ 890,00",
        fullDesc: "Soleira em resina de alta espessura com logo do modelo, protege a pintura da entrada das portas contra riscos do uso diário.",
        specs: [
          "Jogo com aplicação nas 4 portas",
          "Resina 3D de alta durabilidade, resistente a UV",
          "Instalação por adesivação, sem furos no veículo",
          "Acabamento premium com identificação do modelo",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-friso.jpg",
        tag: "Proteção & Estética",
        title: "Friso Premium",
        price: "R$ 990,00",
        fullDesc: "Friso lateral premium que protege as portas de batidas e valoriza o visual do veículo.",
        specs: [
          "Jogo com 4 peças (portas dianteiras e traseiras)",
          "Adesivo automotivo 3M de alta fixação",
          "Acabamento em preto com identificação da marca",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-bandeja.jpg",
        tag: "Proteção & Organização",
        title: "Bandeja Porta Malas",
        price: "R$ 1.190,00",
        fullDesc: "Bandeja rígida sob medida para o porta-malas, evita sujeira, líquidos e desgaste do carpete original.",
        specs: [
          "Molde exclusivo do modelo, encaixe perfeito",
          "Bordas elevadas que retêm líquidos",
          "Material antiderrapante, fácil de lavar",
          "Logo do modelo em relevo",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-organizador.jpg",
        tag: "Organização",
        title: "Organizador Apoio de Braço",
        price: "R$ 350,00",
        fullDesc: "Bandeja organizadora para o apoio de braço, aproveita melhor o espaço interno do console.",
        specs: [
          "Divisórias para celular, chaves e cartões",
          "Encaixe exato no console do modelo",
          "Material rígido com revestimento antirruído",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-trava.jpg",
        tag: "Segurança",
        title: "Trava Anti Furto",
        price: "R$ 1.250,00",
        fullDesc: "Jogo de travas antifurto para rodas, dificulta o roubo do conjunto roda/pneu.",
        specs: [
          "4 parafusos antifurto + chave codificada exclusiva",
          "Aço tratado de alta resistência",
          "Torque conforme especificação da montadora",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-streaming-octa.jpg",
        tag: "Multimídia",
        title: "Streaming Box Processador Octacore",
        price: "R$ 6.290,00",
        fullDesc: "Streaming Box com processador Octacore: transforma a multimídia original em Android completo.",
        specs: [
          "Processador Octacore — navegação fluida",
          "Android com Play Store: Netflix, YouTube, Spotify, Waze",
          "Espelhamento sem fio e GPS integrado",
          "Plug and play, sem alterar a central original",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-streaming-quad.jpg",
        tag: "Multimídia",
        title: "Streaming Box Processador Quadcore",
        price: "R$ 5.100,00",
        fullDesc: "Streaming Box com processador Quadcore: apps de vídeo e navegação direto na tela original.",
        specs: [
          "Processador Quadcore, ótimo custo-benefício",
          "Android com Play Store e espelhamento",
          "Instalação plug and play",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-sub68.jpg",
        tag: "Som",
        title: "Subwoofer Slim 6x8\" 140W RMS (embaixo banco)",
        price: "R$ 4.250,00",
        fullDesc: "Subwoofer slim 6x8\" 140W RMS instalado sob o banco: mais grave sem perder espaço.",
        specs: [
          "Potência 140W RMS com módulo integrado",
          "Perfil slim para instalação sob o banco",
          "Ajuste fino de ganho e corte de frequência",
          "Não ocupa o porta-malas",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-sub79.jpg",
        tag: "Som",
        title: "Subwoofer Slim 7x9\" 220W RMS (embaixo banco)",
        price: "R$ 5.600,00",
        fullDesc: "Subwoofer slim 7x9\" 220W RMS sob o banco: grave encorpado com instalação discreta.",
        specs: [
          "Potência 220W RMS com amplificador integrado",
          "Perfil slim, instalação sob o banco",
          "Controle remoto de nível de grave (opcional)",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-sub-hertz.jpg",
        tag: "Som",
        title: "Subwoofer Slim Hertz 8\" 220W RMS (porta malas)",
        price: "R$ 10.550,00",
        fullDesc: "Subwoofer Slim Hertz 8\" 220W RMS no porta-malas: referência em qualidade sonora.",
        specs: [
          "Linha Hertz — qualidade de áudio premium",
          "220W RMS, resposta grave precisa",
          "Instalação no porta-malas com fixação segura",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-capa-pet.jpg",
        tag: "Conforto",
        title: "Capa para Pet",
        price: "R$ 1.450,00",
        fullDesc: "Capa protetora para transporte de pets, cobre bancos traseiros e laterais.",
        specs: [
          "Tecido impermeável e resistente a arranhões",
          "Formato rede: protege bancos e assoalho",
          "Fixação por alças ajustáveis, remoção rápida",
          "Lavável",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-bagageiro.jpg",
        tag: "Aventura & Carga",
        title: "Bagageiro Jet Bag 450 Lts (preta ou cinza)",
        price: "R$ 5.700,00",
        fullDesc: "Bagageiro Jet Bag 450 litros, disponível em preto ou cinza, para ampliar a capacidade de carga.",
        specs: [
          "Capacidade de 450 litros",
          "Abertura bilateral com travamento por chave",
          "Requer travessas de teto",
          "Cores: preto ou cinza",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-travessa.jpg",
        tag: "Aventura & Carga",
        title: "Travessa p/ Longarina (preto ou prata)",
        price: "R$ 6.290,00",
        fullDesc: "Travessa para longarina em preto ou prata, base para bagageiro e suporte de bike.",
        specs: [
          "Par de travessas em alumínio",
          "Fixação na longarina original",
          "Cores: preto ou prata",
          "Base para bagageiro, bike e caiaque",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-bike.jpg",
        tag: "Aventura & Carga",
        title: "Suporte de Bike (preto ou prata)",
        price: "R$ 4.290,00",
        fullDesc: "Suporte de bike de teto em preto ou prata, transporte seguro sem tirar a roda dianteira.",
        specs: [
          "Transporte de 1 bicicleta por suporte",
          "Travamento por chave no quadro e nas rodas",
          "Requer travessas de teto",
          "Cores: preto ou prata",
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/geely-ex5/ex5-tapete.jpg",
        tag: "Proteção & Estética",
        title: "Tapete Interno Carpete",
        price: "R$ 690,00",
        fullDesc: "Jogo de tapetes internos em carpete, com recorte exclusivo para o modelo.",
        specs: [
          "Jogo completo (dianteiro e traseiro)",
          "Carpete de alta gramatura com base antiderrapante",
          "Recorte sob medida com fixadores originais",
        ],
        priceLabel: "Valor instalado",
      },
    ],
  },
  {
    category: "EVO SKIN",
    subtitle: "PPF — Película de Proteção de Pintura",
    description: "10 anos de garantia. Protege contra riscos, impactos e manchas. Tecnologia auto regenerativa mantém aspecto de novo.",
    items: [
      {
        image: "/evoramaxx.png", // placeholder
        tag: "EVO SKIN",
        title: "Start",
        price: "R$ 1.590,00",
        fullDesc: "Proteção nos pontos de maior contato do dia a dia.",
        specs: [
          "Concha da maçaneta",
          "Quina de porta"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "EVO SKIN",
        title: "Basic",
        price: "R$ 4.890,00",
        fullDesc: "Cobertura das áreas mais expostas na frente do veículo.",
        specs: [
          "Concha da maçaneta",
          "Quina de porta",
          "Soleiras de porta",
          "Retrovisores",
          "Para-choque dianteiro"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "EVO SKIN",
        title: "Plus",
        price: "R$ 8.990,00",
        fullDesc: "Inclui o capô, principal alvo de detritos de estrada.",
        specs: [
          "Concha da maçaneta",
          "Quina de porta",
          "Soleiras de porta",
          "Retrovisores",
          "Capô",
          "Para-choque dianteiro"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "EVO SKIN",
        title: "Advanced",
        price: "R$ 11.900,00",
        fullDesc: "Frente completa com para-lama dianteiro protegido.",
        specs: [
          "Concha da maçaneta",
          "Quina de porta",
          "Soleiras de porta",
          "Retrovisores",
          "Capô",
          "Para-choque dianteiro",
          "Para-lama dianteiro"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "EVO SKIN",
        title: "Elite",
        price: "R$ 15.990,00",
        fullDesc: "Para-lamas e para-choques dianteiro e traseiro.",
        specs: [
          "Concha da maçaneta",
          "Quina de porta",
          "Soleiras de porta",
          "Retrovisores",
          "Capô",
          "Para-lamas",
          "Para-choques"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "Carro completo",
        title: "Full SUV",
        price: "R$ 28.990,00",
        fullDesc: "Proteção integral da pintura para SUVs.",
        specs: [
          "Aplicação em todas as peças pintadas do veículo"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "Carro completo",
        title: "Full Carro Médio",
        price: "R$ 25.990,00",
        fullDesc: "Proteção integral da pintura para carros médios.",
        specs: [
          "Aplicação em todas as peças pintadas do veículo"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "Carro completo",
        title: "Full Fosco",
        price: "R$ 28.990,00",
        fullDesc: "Proteção integral com acabamento fosco premium.",
        specs: [
          "Aplicação em todas as peças pintadas do veículo"
        ],
        priceLabel: "Valor instalado",
      },
    ],
  },
  {
    category: "EVO SAFE",
    subtitle: "Antivandalismo e Películas de Segurança",
    description: "Linha de películas de segurança com certificação Falcão Bauer. Tecnologia de fibras entrelaçadas que reforça o vidro e entrega proteção muito superior aos filmes antivandalismo convencionais.",
    items: [
      {
        image: "/evoramaxx.png", // placeholder
        tag: "5 ANOS DE GARANTIA",
        title: "EVO PS8",
        price: "R$ 2.190,00",
        fullDesc: "Proteção de alto desempenho para vidros automotivos.",
        specs: [
          "Reforça o vidro em até 20 vezes",
          "Resistência a impactos de até 80 kg",
          "Tecnologia de fibras entrelaçadas",
          "Certificado Falcão Bauer"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "7 ANOS DE GARANTIA",
        title: "EVO SAFE",
        price: "R$ 3.890,00",
        fullDesc: "Máxima proteção para vidros automotivos.",
        specs: [
          "Reforça o vidro em até 30 vezes",
          "Suporta impactos de até 100 kg",
          "Tecnologia exclusiva de fibras entrelaçadas",
          "Certificado Falcão Bauer"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "10 ANOS DE GARANTIA",
        title: "EVO SAFE + BLOQUEIO SOLAR",
        price: "R$ 4.590,00",
        fullDesc: "Toda a proteção EvoSafe com tecnologia avançada de bloqueio solar.",
        specs: [
          "Reforça o vidro em até 30 vezes",
          "Máximo bloqueio solar e conforto térmico",
          "Discrição e acabamento sofisticado"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "2 ANOS DE GARANTIA",
        title: "EVO IMPACT",
        price: "Sob Consulta",
        fullDesc: "Proteção do para-brisa contra pedras e detritos.",
        specs: [
          "Auxilia na proteção contra impactos de pedras e detritos",
          "Preserva a integridade do para-brisa",
          "Não compromete a visibilidade"
        ],
        priceLabel: "Valor instalado",
      },
    ],
  },
  {
    category: "EVO FILM · CARBON · CERAMIC",
    subtitle: "Películas — Conforto Térmico e Privacidade",
    description: "10 anos de garantia. Linha completa de películas com redução de calor, conforto térmico e mais privacidade, garantindo proteção e elegância para qualquer veículo.",
    items: [
      {
        image: "/evoramaxx.png", // placeholder
        tag: "EVO FILM",
        title: "EVO FILM",
        price: "R$ 690,00",
        fullDesc: "Tecnologia, privacidade e alta performance com excelente custo-benefício.",
        specs: [
          "Tingimento em profundidade: preto intenso e uniforme",
          "Resistente ao desbotamento",
          "Ótima visibilidade interna e alta durabilidade",
          "Adicionais: Para-brisa R$ 690,00 / Teto R$ 690,00"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "EVOCARBON",
        title: "EVOCARBON",
        price: "R$ 1.150,00",
        fullDesc: "Película com nanopartículas de carbono e alto conforto térmico.",
        specs: [
          "Até 72% de rejeição do calor infravermelho",
          "Bloqueio de 99% dos raios UV",
          "Alta transparência e coloração estável",
          "Adicionais: Para-brisa R$ 790,00 / Teto R$ 790,00"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "EVO NANO CERAMIC",
        title: "EVO NANO CERAMIC",
        price: "R$ 1.990,00",
        fullDesc: "Nanopartículas cerâmicas com revestimento de Nitrato de Titânio.",
        specs: [
          "Elevada rejeição do calor infravermelho",
          "Estrutura multicamadas de maior durabilidade",
          "Alta nitidez e estabilidade da coloração",
          "Adicionais: Para-brisa R$ 990,00 / Teto R$ 990,00"
        ],
        priceLabel: "Valor instalado",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "TABELA TÉCNICA",
        title: "TABELA TÉCNICA — EVO IMPACT / EVO ALM",
        price: "Sob Consulta",
        fullDesc: "Transmissão de luz visível, rejeição infravermelho e bloqueio UV por tonalidade.",
        specs: [
          "Película 05 — TLV 4% - IR 10% - UV 99%",
          "Película 20 — TLV 20% - IR 10% - UV 99%",
          "Película 35 — TLV 35% - IR 10% - UV 99%"
        ],
        priceLabel: "Consulte condições",
      }
    ],
  },
  {
    category: "EVO SHINE",
    subtitle: "Estética Automotiva e Vitrificação",
    description: "Estética automotiva e proteção premium. Na parte externa, descontaminação e polimento técnico; na interna, higienização completa que elimina impurezas, manchas e odores, trazendo mais saúde e conforto.",
    items: [
      {
        image: "/evoramaxx.png", // placeholder
        tag: "ESTÉTICA AUTOMOTIVA",
        title: "CRYSTAL",
        price: "R$ 990,00",
        fullDesc: "Recupere a sensação de dirigir um carro novo.",
        specs: [
          "Higienização Premium — limpeza profunda de bancos, carpetes e forros",
          "Higienização Premium — limpeza detalhada de painéis, console, portas",
          "Higienização Premium — higienização do teto (quando aplicável)"
        ],
        priceLabel: "Valor do pacote",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "ESTÉTICA AUTOMOTIVA",
        title: "SILVER",
        price: "R$ 1.990,00",
        fullDesc: "Polimento técnico com nano cerâmica de 1 ano.",
        specs: [
          "Polimento Técnico",
          "Vitrificação e impermeabilização dos bancos",
          "Proteção de pintura Nano Cerâmica — 1 ano de durabilidade"
        ],
        priceLabel: "Valor do pacote",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "ESTÉTICA AUTOMOTIVA",
        title: "GOLD",
        price: "R$ 2.990,00",
        fullDesc: "Nano cerâmica de 3 anos e cristalização dos vidros.",
        specs: [
          "Polimento Técnico",
          "Vitrificação e impermeabilização dos bancos",
          "Proteção de pintura Nano Cerâmica — 3 anos de durabilidade"
        ],
        priceLabel: "Valor do pacote",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "ESTÉTICA AUTOMOTIVA",
        title: "PLATINUM",
        price: "R$ 4.990,00",
        fullDesc: "Vitrificação Full e nano cerâmica de 5 anos.",
        specs: [
          "Polimento Técnico",
          "Proteção de pintura Nano Cerâmica — 5 anos de durabilidade",
          "Vitrificação Full: faróis, rodas, vidros e bancos"
        ],
        priceLabel: "Valor do pacote",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "EXCLUSIVO PARA SUPER ESPORTIVOS",
        title: "BLACK",
        price: "R$ 6.990,00",
        fullDesc: "O protocolo mais completo, para carros super esportivos.",
        specs: [
          "Polimento Técnico",
          "Proteção de pintura Nano Cerâmica — 5 anos de durabilidade",
          "Vitrificação Full: faróis, rodas, vidros e bancos"
        ],
        priceLabel: "Valor do pacote",
      },
      {
        image: "/evoramaxx.png", // placeholder
        tag: "EXCLUSIVO PARA PPF",
        title: "REVIVAL",
        price: "R$ 2.990,00",
        fullDesc: "Manutenção e proteção para veículos já com PPF aplicado.",
        specs: [
          "Descontaminação",
          "Vitrificação de PPF",
          "Consulte garantia com nossa equipe"
        ],
        priceLabel: "Valor do pacote",
      }
    ],
  },
];

const Work = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY < -50) {
        router.push("/");
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [router]);

  return (
    <div ref={containerRef} className="h-full bg-primary/30 py-32 flex flex-col items-center overflow-hidden relative">
      
      {/* background image (explosion pulsing) */}
      <div className="w-full xl:w-[1280px] h-full absolute right-0 bottom-0 z-[1] pointer-events-none opacity-40 xl:opacity-80 mix-blend-color-dodge animate-pulse">
        <div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute translate-z-0" />
      </div>

      {/* particles background (efeito geométrico) */}
      <div className="fixed inset-0 z-[2] pointer-events-none">
        <ParticlesContainer />
      </div>

      <Circles />
      <div className="container mx-auto h-full flex flex-col justify-start relative z-10 pt-16 xl:pt-16">
        <div className="flex flex-col w-full flex-1 pb-4">
          {/* Scrollable Tabs Menu Fixed at Top */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl cursor-grab active:cursor-grabbing bg-white/10 backdrop-blur-lg rounded-full px-4 py-3 xl:px-8 xl:py-4 border border-white/20 shadow-2xl z-50 shrink-0">
              <Swiper
                slidesPerView="auto"
                spaceBetween={24}
                freeMode={true}
                loop={true}
                modules={[FreeMode]}
                className="w-full"
              >
                {workData.map((tab, idx) => (
                  <SwiperSlide key={idx} style={{ width: 'auto' }}>
                    <div
                      className={`cursor-pointer flex flex-col items-center xl:items-start transition-all duration-300 relative px-2 pb-2 ${
                        tabIndex === idx ? "text-accent" : "text-white/60 hover:text-white"
                      }`}
                      onClick={() => setTabIndex(idx)}
                    >
                      <div className="text-lg md:text-xl font-medium whitespace-nowrap">
                        {tab.category}
                      </div>
                      {tab.subtitle && (
                        <div className="text-xs tracking-widest mt-1 uppercase font-light whitespace-nowrap">
                          {tab.subtitle}
                        </div>
                      )}
                      
                      {/* Animated Smooth Underline */}
                      {tabIndex === idx && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Right Arrow Indicator */}
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#131424]/80 to-transparent flex items-center justify-end pr-4 pointer-events-none rounded-r-full z-10 backdrop-blur-sm">
                <HiChevronRight className="text-white text-2xl animate-pulse" />
              </div>
            </div>

            {/* Slider Content */}
            <div className="flex-1 w-full relative z-10 h-full flex flex-col items-center justify-start pt-2 xl:pt-4">
              
              {/* Category Description (if exists) */}
              {workData[tabIndex].description && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={tabIndex}
                  className="w-full max-w-5xl mx-auto px-6 mb-4 xl:mb-8 text-center"
                >
                  <p className="text-white/80 text-[13px] md:text-[15px] leading-relaxed italic">
                    {workData[tabIndex].description}
                  </p>
                </motion.div>
              )}

              {workData[tabIndex].items.length > 0 ? (
                  <div className="w-full h-[60vh] sm:h-[70vh] max-w-5xl mx-auto flex items-center justify-center mt-4">
                    <CoverflowCarousel
                      slides={workData[tabIndex].items}
                      onItemSelect={(item) => setSelectedItem(item)}
                      cardWidth="clamp(250px, 30vw, 350px)"
                    />
                  </div>
              ) : (
                <div className="flex items-center justify-center h-full border border-white/10 rounded-lg text-white/50 bg-white/5">
                  Itens serão adicionados em breve...
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#131424] border border-white/10 w-full max-w-3xl rounded-2xl overflow-hidden relative max-h-[90vh] flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 bg-black/50 p-2 rounded-full text-xl text-white/80 hover:text-accent transition-colors"
              >
                <RiCloseLine />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-5/12 h-56 md:h-auto relative bg-black/50 p-4">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-contain opacity-90 drop-shadow-xl"
                />
              </div>

              {/* Modal Content */}
              <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col overflow-y-auto">
                <div className="text-accent text-sm tracking-widest uppercase mb-2">
                  {workData[tabIndex].category} · {selectedItem.tag}
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{selectedItem.title}</h3>
                
                <p className="text-white/70 leading-relaxed mb-6">
                  {selectedItem.fullDesc}
                </p>

                {selectedItem.specs && selectedItem.specs.length > 0 && (
                  <ul className="mb-8 space-y-2">
                    {selectedItem.specs.map((spec, i) => (
                      <li key={i} className="flex items-start text-white/80">
                        <span className="text-accent mr-2 mt-1">•</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto border-t border-white/10 pt-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-center sm:text-left">
                      <div className="text-white/50 text-sm">{selectedItem.priceLabel}</div>
                      <div className="text-3xl font-bold text-accent">{selectedItem.price}</div>
                    </div>
                    
                    <a
                      href="https://wa.me/5511999999999"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white/10 hover:bg-accent hover:text-white border border-white/20 hover:border-transparent px-6 py-3 rounded-full font-medium transition-all duration-300 w-full sm:w-auto text-center"
                    >
                      Solicitar Orçamento
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Work;
