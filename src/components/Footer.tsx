import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.links}>
                    <Link href="#" className={styles.link}>Recruit</Link>
                    <Link href="#" className={styles.link}>Privacy</Link>
                    <Link href="#" className={styles.link}>Terms</Link>
                </div>
                <p className={styles.copy}>
                </p>
            </div>
        </footer>
    );
}
