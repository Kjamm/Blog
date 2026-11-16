'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Entry } from '@/data/experience';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import styles from './Timeline.module.css';

/**
 * A list of dated entries on a rail. The rail fills as the list scrolls
 * through the viewport and each entry's node lights up when the fill reaches it.
 */
export default function Timeline({ entries }: { entries: Entry[] }) {
    const root = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            gsap.fromTo('[data-rail-fill]', { scaleY: 0 }, {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: { trigger: root.current, start: 'top 72%', end: 'bottom 60%', scrub: 0.4 },
            });
            gsap.utils.toArray<HTMLElement>('[data-entry]', root.current).forEach(entry => {
                gsap.fromTo(entry, { opacity: 0.35 }, {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: entry, start: 'top 74%', toggleActions: 'play none none reverse' },
                });
            });
        });
    }, { scope: root });

    return (
        <div ref={root} className={styles.timeline}>
            <span className={styles.rail} aria-hidden="true">
                <span className={styles.railFill} data-rail-fill="" />
            </span>
            <ol className={styles.list}>
            {entries.map(entry => (
                <li key={`${entry.period}-${entry.title}-${entry.organization}`} className={styles.entry} data-entry="">
                    <span className={styles.node} aria-hidden="true" />
                    <p className={styles.period}>{entry.period}</p>
                    <div className={styles.body}>
                        <h3 className={styles.title}>
                            {entry.href ? (
                                <Link href={entry.href} className={styles.titleLink}>
                                    {entry.title} <ArrowUpRight size={20} aria-hidden="true" />
                                </Link>
                            ) : entry.title}
                        </h3>
                        {(entry.organization || entry.location) && (
                            <p className={styles.organization}>
                                {[entry.organization, entry.location].filter(Boolean).join(', ')}
                            </p>
                        )}
                        {entry.details && (
                            <ul className={styles.details}>
                                {entry.details.map(detail => <li key={detail}>{detail}</li>)}
                            </ul>
                        )}
                        {entry.external && (
                            <a href={entry.external.url} target="_blank" rel="noopener noreferrer" className={styles.external}>
                                {entry.external.label} <ArrowUpRight size={15} aria-hidden="true" />
                            </a>
                        )}
                    </div>
                </li>
            ))}
            </ol>
        </div>
    );
}
