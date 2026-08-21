import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling a bit
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Touch handling for mobile devices
  const handleTouch = (e) => {
    e.preventDefault();
    scrollToTop();
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      onTouchStart={handleTouch}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
      aria-label="Voltar ao topo"
    >
      ↑
    </button>
  );
}
