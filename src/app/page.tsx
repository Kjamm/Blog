
import Link from "next/link";

export default function Home() {

  return (
    <div className="container" style={{ paddingTop: '8vh', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px' }}>
        <p style={{
          color: 'var(--accent)',
          fontWeight: 700,
          fontSize: '1.125rem',
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
        <div style={{ fontSize: '1.25rem', lineHeight: 1.7, color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p>
            I'm majoring in bioinformatics and AI, and now I'm studying computational biology.
          </p>
          <p>
            I believe that great software is not just about code, but about how it affects the people who use it.
            When I'm not coding, I write about my learnings on my <Link href="/blog" style={{ textDecoration: 'underline', color: 'var(--foreground)' }}>blog</Link>.
          </p>
        </div>

        <div style={{ marginTop: '48px', display: 'flex', gap: '20px' }}>
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
      </div>
    </div>
  );
}
