'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import PillNav from '@/components/reactbits/PillNav';
import styles from './Header.module.css';

const items = [
    { label: 'About me', href: '/' },
    { label: 'Experience', href: '/experience' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
];

// Posts and tag pages live under the blog; project pages under the portfolio.
function sectionOf(pathname: string) {
    if (pathname.startsWith('/experience')) return '/experience';
    if (pathname.startsWith('/portfolio')) return '/portfolio';
    if (pathname.startsWith('/blog') || pathname.startsWith('/posts') || pathname.startsWith('/tag')) return '/blog';
    return '/';
}

export default function Header() {
    const pathname = usePathname();

    return (
        <header className={styles.header} style={{ viewTransitionName: 'site-header' }}>
            <div className="container">
                {/* One glass bar: wordmark, links, search. */}
                <div className={styles.bar}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.mark} aria-hidden="true" />
                        Jaemin Kim
                    </Link>
                    {/* PillNav collapses to a menu when it no longer fits its parent, so give it a slot of its own. */}
                    <div className={styles.navSlot}>
                        <PillNav
                            items={items}
                            activeHref={sectionOf(pathname)}
                            linkComponent={Link}
                            theme="dark"
                            layout="joined"
                            size="md"
                            surface="none"
                            itemStyle="plain"
                            hoverEffect="glide"
                            indicator="dot"
                            highlightColor="rgba(236, 233, 245, 0.1)"
                            highlightTextColor="var(--ink)"
                            textColor="var(--ink)"
                            collapse="auto"
                            intro={false}
                            ariaLabel="Main"
                            className={styles.nav}
                            style={{ '--pn-dot': 'var(--accent)' } as React.CSSProperties}
                        />
                    </div>
                    <span className={styles.divider} aria-hidden="true" />
                    <Link
                        href="/blog#search"
                        className={styles.iconBtn}
                        aria-label="Search posts"
                        onClick={event => {
                            // Already on a page with the search box: just put the cursor in it.
                            const input = document.getElementById('search');
                            if (!input) return;
                            event.preventDefault();
                            input.focus();
                        }}
                    >
                        <Search size={18} strokeWidth={1.75} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
