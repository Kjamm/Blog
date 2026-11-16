'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import styles from './Footer.module.css';

/** The closing wordmark. It fills with light, left to right, as the footer scrolls into view. */
export default function FooterName() {
    const root = useRef<HTMLParagraphElement>(null);
    const fill = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            gsap.fromTo(fill.current, { clipPath: 'inset(0% 100% 0% 0%)' }, {
                clipPath: 'inset(0% 0% 0% 0%)',
                ease: 'none',
                // Ends at the very bottom of the page so the fill always completes.
                scrollTrigger: { trigger: root.current, start: 'top 95%', end: 'max', scrub: 0.4 },
            });
        });
    }, { scope: root });

    return (
        <p ref={root} className={styles.name} aria-hidden="true">
            Jaemin Kim
            <span ref={fill} className={styles.nameFill}>Jaemin Kim</span>
        </p>
    );
}
