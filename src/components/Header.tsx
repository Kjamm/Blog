import Link from 'next/link';
import styles from './Header.module.css';
import { Search } from 'lucide-react';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                <Link href="/" className={styles.logo}>
                    Jaemin Kim
                </Link>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.link}>About me</Link>
                    <Link href="/portfolio" className={styles.link}>Portfolio</Link>
                    <Link href="/blog" className={styles.link}>Blog</Link>
                </nav>
                <button className={styles.iconBtn} aria-label="Search">
                    <Search size={24} strokeWidth={2} />
                </button>
            </div>
        </header>
    );
}
