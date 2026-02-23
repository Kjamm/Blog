import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {

  return (
    <div className="container" style={{ paddingTop: '8vh', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{
          color: 'var(--accent)',
          fontWeight: 700,
          fontSize: '1.5rem',
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          About Me
        </p>
        <h1 style={{
          fontSize: 'clamp(3rem, 5vw, 4.5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '32px',
          letterSpacing: '-0.02em'
        }}>
          <span style={{ color: 'var(--muted-light)' }}>Hello, I'm</span> <br />
          Jaemin Kim
        </h1>
        <div style={{ fontSize: '1.25rem', lineHeight: 1.7, color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          <p>
            I'm majoring in bioinformatics and AI, and now I'm studying computational biology.
          </p>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link href="/portfolio" style={{
            background: 'var(--foreground)',
            color: 'var(--background)',
            padding: '16px 32px',
            borderRadius: '50px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
          }}>
            Portfolio
          </Link>
          <Link href="/blog" style={{
            background: 'var(--foreground)',
            color: 'var(--background)',
            padding: '16px 32px',
            borderRadius: '50px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
          }}>
            Blog
          </Link>
          <a href="https://github.com/Kjamm" target="_blank" style={{
            background: 'var(--foreground)',
            color: 'var(--background)',
            padding: '16px 32px',
            borderRadius: '50px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
          }}>
            GitHub
          </a>
        </div>

        <div style={{ marginTop: '40px', width: '100%' }}>
          <p style={{
            color: 'var(--accent)',
            fontWeight: 700,
            fontSize: '1.3rem',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Tech Stack
          </p>
          <div className={styles.techGrid}>
            {[
              { category: 'Bioinformatics', icon: '🧬', items: ['Python', 'R', 'Linux'] },
              { category: 'Front-end', icon: '💻', items: ['Android', 'Kotlin', 'React'] },
              { category: 'Machine & Deep Learning', icon: '🤖', items: ['Python', 'R'] },
              { category: 'Database', icon: '🗄️', items: ['MySQL'] },
              { category: 'Back-end', icon: '⚙️', items: ['Java', 'PHP'] }
            ].map((section) => (
              <div key={section.category} className={styles.techCard}>
                <div className={styles.techCategoryHeader}>
                  <div className={styles.techIcon}>{section.icon}</div>
                  {section.category}
                </div>
                <div className={styles.techTags}>
                  {section.items.map((item) => (
                    <span key={item} className={styles.techTag}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
