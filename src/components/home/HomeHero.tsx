'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import DnaHelix from '@/components/DnaHelix';
import Magnet from '@/components/reactbits/Magnet';
import { researchInterests } from '@/data/experience';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '@/lib/gsap';
import styles from './HomeHero.module.css';

// A field of nucleotide letters behind the helix. Canvas only, loaded after first paint.
const LetterGlitch = dynamic(() => import('@/components/reactbits/LetterGlitch'), { ssr: false });
// Volumetric light falling across the helix. WebGL, client only.
const LightRays = dynamic(() => import('@/components/reactbits/LightRays'), { ssr: false });

const NAME = 'Jaemin Kim.';

export default function HomeHero() {
    const root = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);
    const focusRef = useRef<HTMLSpanElement>(null);

    // The one orchestrated moment on the site: the name is read out of a
    // nucleotide sequence while the supporting lines settle around it.
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            // A short delay lets hydration and the helix's WebGL setup finish before the first frame.
            const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power3.out' } });
            tl.set(nameRef.current, { opacity: 1 })
                .to('[data-reveal="hello"]', { opacity: 1, duration: 0.5 }, 0)
                .to('[data-reveal="helix"]', { opacity: 1, duration: 1.4, ease: 'power2.out' }, 0)
                .to('[data-reveal="sequence"]', { opacity: 1, duration: 1.8, ease: 'power1.out' }, 0)
                .to('[data-reveal="rays"]', { opacity: 1, duration: 2.2, ease: 'power1.out' }, 0.2)
                .to(nameRef.current, {
                    duration: 1.5,
                    ease: 'none',
                    scrambleText: { text: NAME, chars: 'ATGC', revealDelay: 0.3, speed: 0.55 },
                }, 0.1)
                .fromTo('[data-reveal="intro"]', { y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.95)
                .fromTo('[data-reveal="focus"]', { y: 10 }, { opacity: 1, y: 0, duration: 0.55 }, 1.03)
                .fromTo('[data-reveal="actions"]', { y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, 1.12)
                // Once the name has resolved, a single band of light crosses it.
                .fromTo(nameRef.current, { backgroundPosition: '160% 0, 0 0' }, { backgroundPosition: '-60% 0, 0 0', duration: 1.3, ease: 'power2.inOut' }, 1.5);

            // The line under the intro keeps decoding the next research interest.
            const cycle = gsap.timeline({ repeat: -1, delay: 3.4, paused: true });
            researchInterests.forEach((_, index) => {
                const next = researchInterests[(index + 1) % researchInterests.length];
                cycle.to(focusRef.current, { duration: 0.9, ease: 'none', scrambleText: { text: next, chars: 'ATGC', speed: 0.6 } }, '+=2.3');
            });
            // Only runs while the hero is on screen.
            ScrollTrigger.create({
                trigger: root.current,
                start: 'top bottom',
                end: 'bottom top',
                onToggle: self => { if (self.isActive) cycle.play(); else cycle.pause(); },
                onRefresh: self => { if (self.isActive) cycle.play(); },
            });

            // Leaving the hero: the copy lifts away while the helix swells toward the viewer.
            gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
                .to('[data-depth="copy"]', { yPercent: -14, opacity: 0.1, ease: 'none' }, 0)
                .to('[data-depth="helix"]', { scale: 1.14, yPercent: 6, ease: 'none' }, 0)
                .to('[data-depth="sequence"]', { yPercent: 12, ease: 'none' }, 0);
        });
    }, { scope: root });

    return (
        <section ref={root} className={styles.hero} aria-labelledby="intro-title">
            <div className={styles.sequence} data-reveal="sequence" data-depth="sequence" aria-hidden="true">
                <LetterGlitch
                    characters="ATGC"
                    glitchColors={['#8fd0ff', '#b4a6ff', '#463f7a']}
                    fontSize={15}
                    baseOpacity={0.13}
                    glitchAmount={0.45}
                    speed={0.55}
                    clickEffect="burst"
                />
            </div>
            <div className={styles.rays} data-reveal="rays" aria-hidden="true">
                <LightRays
                    raysOrigin="top-right"
                    raysColor="#9d8cff"
                    raysSpeed={0.6}
                    lightSpread={0.7}
                    rayLength={2.4}
                    fadeDistance={1}
                    clickPulse={false}
                    cursorShadow={false}
                    maxDevicePixelRatio={1}
                />
            </div>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.helix} data-reveal="helix">
                <div className={styles.helixDepth} data-depth="helix">
                    <DnaHelix />
                </div>
            </div>
            <div className={`container ${styles.copy}`} data-depth="copy">
                <h1 id="intro-title" className={styles.heading}>
                    <span className="visually-hidden">Hello, I&apos;m {NAME}</span>
                    <span className={styles.hello} data-reveal="hello" aria-hidden="true">Hello, I&apos;m</span>
                    <span ref={nameRef} className={styles.name} data-reveal="name" aria-hidden="true">{NAME}</span>
                </h1>
                <p className={styles.intro} data-reveal="intro">
                    I&apos;m majoring in bioinformatics and AI, and now I&apos;m studying computational biology.
                </p>
                <p className={styles.focus} data-reveal="focus">
                    <span className="visually-hidden">Research interests: {researchInterests.join(', ')}.</span>
                    <span aria-hidden="true">
                        Interested in <span ref={focusRef} className={styles.focusTerm}>{researchInterests[0]}</span>
                    </span>
                </p>
                <div className={styles.actions} data-reveal="actions">
                    <Magnet padding={48} magnetStrength={3} maxOffset={10}>
                        <Link href="/portfolio" className={styles.primaryButton}>Portfolio</Link>
                    </Magnet>
                    <Magnet padding={48} magnetStrength={3} maxOffset={10}>
                        <Link href="/blog" className={styles.secondaryButton}>Blog</Link>
                    </Magnet>
                    <a href="https://github.com/Kjamm" target="_blank" rel="noopener noreferrer" className={styles.textLink}>
                        GitHub <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    );
}
