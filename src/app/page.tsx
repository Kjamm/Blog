import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Code2, Database, Dna, Server } from "lucide-react";
import styles from "./home.module.css";

const technologies = [
  { category: 'Bioinformatics', icon: Dna, items: ['Python', 'R', 'Linux'] },
  { category: 'Front-end', icon: Code2, items: ['Android', 'Kotlin', 'React'] },
  { category: 'Machine & Deep Learning', icon: BrainCircuit, items: ['Python', 'R'] },
  { category: 'Database', icon: Database, items: ['MySQL'] },
  { category: 'Back-end', icon: Server, items: ['Java', 'PHP'] },
];

export default function Home() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="intro-title">
        <div className="container">
          <p className={styles.eyebrow}>About me</p>
          <h1 id="intro-title" className={styles.title}>
            <span>Hello, I&apos;m</span><br />Jaemin Kim.
          </h1>
          <p className={styles.intro}>
            I&apos;m majoring in bioinformatics and AI, and now I&apos;m studying computational biology.
          </p>
          <div className={styles.actions}>
            <Link href="/portfolio" className={styles.primaryButton}>Portfolio</Link>
            <Link href="/blog" className={styles.secondaryButton}>Blog</Link>
            <a href="https://github.com/Kjamm" target="_blank" rel="noopener noreferrer" className={styles.textLink}>
              GitHub <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section className={styles.stack} aria-labelledby="stack-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <h2 id="stack-title">Tech Stack.<br /><span>Tools I work with.</span></h2>
            <p>From biological data<br />to the applications we build.</p>
          </div>
          <div className={styles.techGrid}>
            {technologies.map(({ category, icon: Icon, items }, index) => (
              <div key={category} className={styles.techCard}>
                <div className={styles.cardTop}>
                  <Icon size={32} strokeWidth={1.25} aria-hidden="true" />
                  <span className={styles.index}>0{index + 1}</span>
                </div>
                <h3>{category}</h3>
                <p className={styles.techTags}>{items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
