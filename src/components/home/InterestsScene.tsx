'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import styles from './InterestsScene.module.css';

/**
 * Research interests as one long line of display type. The section pins and
 * vertical scrolling drives the line sideways; each term lights up as it
 * crosses the middle of the screen. Without motion it is a plain wrapped list.
 */
export default function InterestsScene({ interests }: { interests: string[] }) {
    const root = useRef<HTMLElement>(null);
    const track = useRef<HTMLUListElement>(null);
    const progress = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            const line = track.current;
            if (!line) return;
            const distance = () => Math.max(0, line.scrollWidth - window.innerWidth);
            // The line travels faster than the page scrolls, so the scene does not overstay.
            const scrollLength = () => distance() * 0.4;

            // Linear on purpose: scroll distance and sideways travel must stay 1:1.
            const slide = gsap.to(line, {
                x: () => -distance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: '[data-pin]',
                    start: 'top top',
                    end: () => `+=${scrollLength()}`,
                    pin: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: self => gsap.set(progress.current, { scaleX: self.progress }),
                },
            });

            gsap.utils.toArray<HTMLElement>('[data-word]', line).forEach(word => {
                gsap.fromTo(word, { opacity: 0.16 }, {
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: { containerAnimation: slide, trigger: word, start: 'left 88%', end: 'left 50%', scrub: true },
                });
            });
        });
    }, { scope: root });

    return (
        <section ref={root} className={styles.scene} aria-labelledby="interests-title">
            <div className={styles.pin} data-pin="">
                <div className="container">
                    <h2 id="interests-title" className={styles.heading}>Research interests</h2>
                </div>
                <ul ref={track} className={styles.track}>
                    {interests.map(interest => (
                        <li key={interest} className={styles.item}>
                            <span className={styles.word} data-word="">{interest}</span>
                        </li>
                    ))}
                </ul>
                <div className="container">
                    <span className={styles.rail} aria-hidden="true">
                        <span ref={progress} className={styles.railFill} />
                    </span>
                </div>
            </div>
        </section>
    );
}
