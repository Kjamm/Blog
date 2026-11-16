'use client';

import dynamic from 'next/dynamic';
import styles from './StatementBackdrop.module.css';

// WebGL: client only, and only mounted once the page is interactive.
const SoftAurora = dynamic(() => import('@/components/reactbits/SoftAurora'), { ssr: false });

/** A slow aurora in the two brand lights, drifting behind the statement. */
export default function StatementBackdrop() {
    return (
        <div className={styles.backdrop} aria-hidden="true">
            <SoftAurora
                color1="#8fd0ff"
                color2="#7f6dff"
                speed={0.35}
                brightness={1}
                bandHeight={0.42}
                enableMouseInteraction={false}
                clickPulse={false}
            />
        </div>
    );
}
