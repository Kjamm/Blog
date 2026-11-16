import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Code2, Database, Dna, Server } from "lucide-react";
import styles from "./home.module.css";
import PageTransition from "@/components/PageTransition";
import HomeHero from "@/components/home/HomeHero";
import InterestsScene from "@/components/home/InterestsScene";
import PostCard from "@/components/PostCard";
import StatementBackdrop from "@/components/home/StatementBackdrop";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import BorderGlow from "@/components/reactbits/BorderGlow";
import Counter from "@/components/reactbits/Counter";
import LogoLoop from "@/components/reactbits/LogoLoop";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import SplitText from "@/components/reactbits/SplitText";
import { researchInterests } from "@/data/experience";
import { getAllTags, getSortedPortfolioData, getSortedPostsData } from "@/lib/posts";

const technologies = [
  { category: 'Bioinformatics', icon: Dna, items: ['Python', 'R', 'Linux'] },
  { category: 'Front-end', icon: Code2, items: ['Android', 'Kotlin', 'React'] },
  { category: 'Machine & Deep Learning', icon: BrainCircuit, items: ['Python', 'R'] },
  { category: 'Database', icon: Database, items: ['MySQL'] },
  { category: 'Back-end', icon: Server, items: ['Java', 'PHP'] },
];

const tools = Array.from(new Set(technologies.flatMap(({ items }) => items)));

export default function Home() {
  const posts = getSortedPostsData();
  const projects = getSortedPortfolioData();
  const figures = [
    { value: posts.length, label: posts.length === 1 ? 'post' : 'posts', href: '/blog' },
    { value: getAllTags().length, label: 'topics', href: '/blog' },
    { value: projects.length, label: projects.length === 1 ? 'project' : 'projects', href: '/portfolio' },
  ];

  return (
    <PageTransition>
      <div>
        <HomeHero />

        <div className={styles.marquee}>
          <LogoLoop
            logos={tools.map(tool => ({ node: <span className={styles.tool}>{tool}</span>, title: tool }))}
            speed={44}
            direction="right"
            gap={56}
            logoHeight={30}
            scrollBoost={0.5}
            fadeOut
            fadeOutColor="var(--bg)"
            pauseOnHover
            ariaLabel="Tools I work with"
          />
        </div>

        <section className={styles.statement}>
          <StatementBackdrop />
          <div className="container">
            <ScrollReveal
              baseOpacity={0.14}
              baseRotation={0}
              enableBlur={false}
              containerClassName={styles.statementHeading}
              textClassName={styles.statementText}
              rotationEnd="center center"
              wordAnimationEnd="center center"
            >
              From biological data to the applications we build.
            </ScrollReveal>
            <ul className={styles.figures}>
              {figures.map(({ value, label, href }) => (
                <li key={label}>
                  <Link href={href} className={styles.figure}>
                    <Counter value={value} fontSize="clamp(44px, 6vw, 80px)" fontWeight={600} />
                    <span className={styles.figureLabel}>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <InterestsScene interests={researchInterests} />

        <section className={styles.stack} aria-label="Tech stack">
          <div className="container">
            <div className={styles.sectionHeading}>
              <SplitText
                text="Tech stack"
                tag="h2"
                className={styles.sectionTitle}
                splitType="chars"
                effect="rise"
                mask
                delay={28}
                duration={0.7}
                textAlign="left"
              />
              <p className={styles.sectionNote}>Tools I work with.</p>
            </div>
            <AnimatedContent className={styles.techGrid} distance={28} duration={0.6} stagger={0.07} threshold={0.15}>
              {technologies.map(({ category, icon: Icon, items }) => (
                <BorderGlow
                  key={category}
                  className={styles.techCard}
                  backgroundColor="var(--surface)"
                  borderRadius={20}
                  glowColor="249 100 83"
                  glowRadius={36}
                  colors={['#b4a6ff', '#7f6dff', '#8fd0ff']}
                >
                  <div className={styles.techCardBody}>
                    <Icon size={30} strokeWidth={1.25} aria-hidden="true" className={styles.techIcon} />
                    <h3>{category}</h3>
                    <ul className={styles.chips}>
                      {items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </BorderGlow>
              ))}
            </AnimatedContent>
          </div>
        </section>

        <section className={styles.recent} aria-labelledby="recent-title">
          <div className="container">
            <div className={styles.sectionHeading}>
              <h2 id="recent-title" className={styles.sectionTitle}>Latest writing</h2>
              <Link href="/blog" className={styles.moreLink}>
                All posts <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <AnimatedContent className={styles.recentGrid} distance={32} duration={0.6} stagger={0.08} threshold={0.15}>
              {posts.slice(0, 3).map(post => <PostCard key={post.id} post={post} />)}
            </AnimatedContent>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
