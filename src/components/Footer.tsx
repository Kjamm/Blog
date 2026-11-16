import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import FooterName from './FooterName';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <FooterName />
                <nav className={styles.links} aria-label="Footer">
                    <Link href="/" className={styles.link}>About me</Link>
                    <Link href="/experience" className={styles.link}>Experience</Link>
                    <Link href="/portfolio" className={styles.link}>Portfolio</Link>
                    <Link href="/blog" className={styles.link}>Blog</Link>
                    <a href="https://github.com/Kjamm" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        GitHub <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                </nav>
            </div>
        </footer>
    );
}
