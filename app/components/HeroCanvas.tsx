"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface HeroCanvasProps {
  currentFrame: number;
  totalFrames: number;
  zoomLevel?: number;
}

const FRAME_PATH = (index: number): string => {
  const num = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${num}.jpg`;
};

export default function HeroCanvas({
  currentFrame,
  totalFrames,
  zoomLevel = 1,
}: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const rafRef = useRef<number>(0);
  const displayedFrame = useRef<number>(-1);
  const [isReady, setIsReady] = useState(false);

  const preloadFrame = useCallback(
    (index: number): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        if (imageCache.current.has(index)) {
          resolve(imageCache.current.get(index)!);
          return;
        }
        const img = new Image();
        img.src = FRAME_PATH(index);
        img.onload = () => { imageCache.current.set(index, img); resolve(img); };
        img.onerror = reject;
      }),
    []
  );

  const preloadBatch = useCallback(
    async (start: number, end: number) => {
      const promises: Promise<HTMLImageElement>[] = [];
      for (let i = start; i <= Math.min(end, totalFrames - 1); i++) {
        if (!imageCache.current.has(i)) promises.push(preloadFrame(i));
      }
      await Promise.allSettled(promises);
    },
    [totalFrames, preloadFrame]
  );

  useEffect(() => {
    const init = async () => {
      await preloadBatch(0, 39);
      setIsReady(true);
      for (let b = 40; b < totalFrames; b += 30) {
        await preloadBatch(b, b + 29);
      }
    };
    init();
  }, [totalFrames, preloadBatch]);

  useEffect(() => {
    const start = Math.max(0, currentFrame - 15);
    const end = Math.min(totalFrames - 1, currentFrame + 15);
    preloadBatch(start, end);
  }, [currentFrame, totalFrames, preloadBatch]);

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = imageCache.current.get(frameIndex);
      if (!img) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (
        canvas.width !== displayWidth * dpr ||
        canvas.height !== displayHeight * dpr
      ) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      if (zoomLevel !== 1) {
        ctx.save();
        ctx.translate(displayWidth / 2, displayHeight / 2);
        ctx.scale(zoomLevel, zoomLevel);
        ctx.translate(-displayWidth / 2, -displayHeight / 2);
      }

      // object-fit: cover
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = displayWidth / displayHeight;
      let dw: number, dh: number, dx: number, dy: number;

      if (imgRatio > canvasRatio) {
        dh = displayHeight; dw = displayHeight * imgRatio;
        dx = (displayWidth - dw) / 2; dy = 0;
      } else {
        dw = displayWidth; dh = displayWidth / imgRatio;
        dx = 0; dy = (displayHeight - dh) / 2;
      }

      ctx.drawImage(img, dx, dy, dw, dh);
      if (zoomLevel !== 1) ctx.restore();

      displayedFrame.current = frameIndex;
    },
    [zoomLevel]
  );

  useEffect(() => {
    if (!isReady) return;
    const animate = () => {
      const target = Math.max(0, Math.min(currentFrame, totalFrames - 1));
      if (displayedFrame.current !== target) {
        const cur = displayedFrame.current;
        let next: number;
        if (cur === -1) {
          next = target;
        } else {
          const diff = target - cur;
          const step = Math.sign(diff) * Math.max(1, Math.abs(diff) * 0.3);
          next = Math.max(0, Math.min(Math.round(cur + step), totalFrames - 1));
        }
        if (imageCache.current.has(next)) drawFrame(next);
        else if (imageCache.current.has(target)) drawFrame(target);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [currentFrame, totalFrames, isReady, drawFrame]);

  useEffect(() => {
    const handleResize = () => {
      if (displayedFrame.current >= 0) drawFrame(displayedFrame.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex: 0,
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 40%, rgba(255,255,255,0.16) 100%)",
        }}
      />
    </>
  );
}
