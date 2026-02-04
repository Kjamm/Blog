
import Link from "next/link";

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
          Hello, I'm <br />
          <span style={{ color: 'var(--muted-light)' }}>Jaemin Kim</span>
        </h1>
        <div style={{ fontSize: '1.25rem', lineHeight: 1.7, color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          <p>
            I'm majoring in bioinformatics and AI, and now I'm studying computational biology.
          </p>
          <p>
            I believe that great software is not just about code, but about how it affects the people who use it.
            When I'm not coding, I write about my learnings on my <Link href="/blog" style={{ textDecoration: 'underline', color: 'var(--foreground)' }}>blog</Link>.
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
            View Portfolio
          </Link>
          <a href="https://github.com/Kjamm" target="_blank" style={{
            background: 'var(--background-subtle)',
            color: 'var(--foreground)',
            padding: '16px 32px',
            borderRadius: '50px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
          }}>
            GitHub
          </a>
        </div>

        <div style={{ marginTop: '24px', width: '100%' }}>
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
          <div style={{ display: 'grid', gap: '32px' }}>
            {[
              { category: 'Bioinformatics', items: ['Python', 'R', 'Linux'] },
              { category: 'Front-end', items: ['Android', 'Kotlin', 'React'] },
              { category: 'Machine learning & Deep learning', items: ['Python', 'R'] },
              { category: 'Database', items: ['MySQL'] },
              { category: 'Back-end', items: ['Java', 'PHP'] }
            ].map((section) => (
              <div key={section.category}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>
                  {section.category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                  {section.items.map((item) => (
                    <span key={item} style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      background: 'var(--background-subtle)',
                      border: '1px solid var(--border)',
                      fontSize: '1rem',
                      fontWeight: 500
                    }}>
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
