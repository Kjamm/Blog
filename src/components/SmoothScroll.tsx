'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, type LenisRef } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, REDUCED_MOTION } from '@/lib/gsap';

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and the
 * scroll position stay on the same frame. Not mounted at all when the visitor
 * prefers reduced motion.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION);
    const sync = () => setEnabled(!media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    const lenis = lenisRef.current?.lenis;
    lenis?.on('scroll', ScrollTrigger.update);
    return () => {
      gsap.ticker.remove(update);
      lenis?.off('scroll', ScrollTrigger.update);
    };
  }, [enabled]);

  // A new page starts at the top; drop any scroll Lenis was still easing toward.
  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  if (!enabled) return null;
  return <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.11, anchors: true }} />;
}
