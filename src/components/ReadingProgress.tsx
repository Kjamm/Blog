'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import styles from './ReadingProgress.module.css';

/** A thin bar under the header that fills as the article scrolls past. */
export default function ReadingProgress({ target }: { target: string }) {
    const bar = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const article = document.querySelector(target);
        if (!article) return;

        gsap.fromTo(bar.current, { scaleX: 0 }, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: article, start: 'top top', end: 'bottom bottom', scrub: true },
        });

        // Posts are image-heavy: the article keeps growing as images load, so
        // re-measure (debounced) whenever its height changes.
        const refresh = gsap.delayedCall(0.2, () => ScrollTrigger.refresh()).pause();
        const observer = new ResizeObserver(() => refresh.restart(true));
        observer.observe(article);
        return () => { observer.disconnect(); refresh.kill(); };
    }, { dependencies: [target] });

    return <div ref={bar} className={styles.bar} aria-hidden="true" />;
}
