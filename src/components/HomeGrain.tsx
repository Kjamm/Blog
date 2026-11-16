'use client';

import { usePathname } from 'next/navigation';
import Noise from '@/components/reactbits/Noise';

/**
 * Film grain over the home page only. Reading pages (blog, portfolio, posts,
 * experience) keep a flat background so body text stays crisp.
 */
export default function HomeGrain() {
    const pathname = usePathname();
    if (pathname !== '/') return null;
    return <Noise fixed fps={0} opacity={0.035} zIndex={90} />;
}
