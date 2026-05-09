"use client";

import { useEffect, useRef } from "react";

const TRAIL_COLORS = ["#00AEEF", "#EC008C", "#FFD600", "#1A1A1A"];
const TRAIL_LENGTH = 10;

export default function CmykCursor() {
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const positions = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
  );
  const mouse = useRef({ x: -200, y: -200 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    /* Only enable on pointer devices */
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = () => {
      positions.current[0].x += (mouse.current.x - positions.current[0].x) * 0.35;
      positions.current[0].y += (mouse.current.y - positions.current[0].y) * 0.35;
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        positions.current[i].x +=
          (positions.current[i - 1].x - positions.current[i].x) * 0.45;
        positions.current[i].y +=
          (positions.current[i - 1].y - positions.current[i].y) * 0.45;
      }
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const s = 8 - i * 0.5;
        dot.style.left = `${positions.current[i].x - s / 2}px`;
        dot.style.top  = `${positions.current[i].y - s / 2}px`;
        dot.style.opacity = String(1 - i * 0.09);
      });
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) dotsRef.current[i] = el; }}
          style={{
            position: "fixed",
            width: `${8 - i * 0.5}px`,
            height: `${8 - i * 0.5}px`,
            borderRadius: "50%",
            background: TRAIL_COLORS[i % 4],
            mixBlendMode: "multiply",
            pointerEvents: "none",
            zIndex: 9999,
            left: -200,
            top: -200,
          }}
        />
      ))}
    </>
  );
}
