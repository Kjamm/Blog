'use client';

import dynamic from 'next/dynamic';
import SplitText from '@/components/reactbits/SplitText';
import styles from './ListingHeader.module.css';

// WebGL: client only, and loaded after the heading is already on screen.
const Threads = dynamic(() => import('@/components/reactbits/Threads'), { ssr: false });

export default function ListingHeader({ title, description }: { title: string; description?: string }) {
    return (
        <header className={styles.header}>
            <div className={styles.backdrop} aria-hidden="true">
                <Threads
                    color="#7f6dff"
                    accentColor="#8fd0ff"
                    lineCount={56}
                    amplitude={1.3}
                    speed={0.35}
                    thickness={0.5}
                    opacity={0.75}
                />
            </div>
            <div className={`container ${styles.inner}`}>
                <SplitText
                    key={title}
                    text={title}
                    tag="h1"
                    className={styles.title}
                    splitType="chars"
                    effect="rise"
                    mask
                    trigger="load"
                    delay={26}
                    duration={0.75}
                    textAlign="left"
                />
                {description && <p className={styles.description}>{description}</p>}
            </div>
        </header>
    );
}
