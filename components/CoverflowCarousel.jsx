import * as React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Image from "next/image";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(200px, 25vw, 320px)",
  gap = 0.05,
  loop = true,
  showNavigation = true,
  className = "",
  cardClassName = "",
  onItemSelect, // callback to open our existing modal
}) {
  const count = slides.length;

  const frameRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const posRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef(null);
  const dragRef = React.useRef(null);

  const [selected, setSelected] = React.useState(0);

  const indexAt = React.useCallback(
    (pos) => ((Math.round(pos) % count) + count) % count,
    [count]
  );

  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = React.useCallback(
    (target) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint]
  );

  const clamp = React.useCallback(
    (pos) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop]
  );

  const goTo = React.useCallback(
    (index) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle]
  );

  const nudge = React.useCallback(
    (by) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle]
  );

  const onPointerDown = (event) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      startX: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const active = slides[selected];

  return (
    <div
      className={`w-full h-full flex flex-col justify-center ${className}`}
      style={{ ["--cf-card"]: cardWidth }}
    >
      <div className="relative w-full">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            } else if (event.key === "Enter") {
              event.preventDefault();
              if (onItemSelect) onItemSelect(active);
            }
          }}
          className="cursor-grab overflow-hidden py-10 outline-none active:cursor-grabbing w-full"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none mx-auto"
            style={{
              height: "calc(var(--cf-card) * 1.2)",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((item, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                onClick={(e) => {
                  // Only trigger click if we didn't drag
                  const drag = dragRef.current;
                  if (drag && Math.abs(e.clientX - drag.startX) > 5) return;
                  
                  if (selected === index && onItemSelect) {
                    onItemSelect(item);
                  } else {
                    goTo(index);
                  }
                }}
                className={`absolute left-1/2 top-0 overflow-hidden rounded-2xl bg-[#1a1a2e] border border-white/10 shadow-2xl will-change-transform cursor-pointer transition-colors ${
                  selected === index ? "ring-2 ring-accent" : ""
                } ${cardClassName}`}
                style={{ width: "var(--cf-card)", height: "calc(var(--cf-card) * 1.2)" }}
              >
                <div className="w-full h-[50%] relative bg-black/50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    draggable={false}
                    className="select-none object-contain p-2"
                  />
                </div>
                <div className="w-full h-[50%] p-4 flex flex-col justify-center bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <p className="text-white font-semibold text-[15px] leading-tight line-clamp-2">{item.title}</p>
                  <p className="text-accent text-sm mt-1 mb-1 font-bold">{item.price}</p>
                  
                  {/* Botão Ver Detalhes (aparece apenas no card selecionado) */}
                  <div className={`mt-2 transition-all duration-300 overflow-hidden ${selected === index ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <button className="text-[11px] uppercase tracking-widest text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 transition-colors w-max">
                      Ver Informações
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => nudge(-1)}
              className="absolute left-4 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/80 backdrop-blur transition hover:bg-accent hover:text-white"
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1)}
              className="absolute right-4 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/80 backdrop-blur transition hover:bg-accent hover:text-white"
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center px-6 transition-all duration-300 min-h-[60px]">
        {active && (
          <p className="text-white/60 text-sm italic mb-2">Clique no card em destaque para ver os detalhes</p>
        )}
      </div>
    </div>
  );
}
