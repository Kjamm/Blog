import { ArrowUpRight } from "lucide-react";
import ListingHeader from "@/components/ListingHeader";
import PageTransition from "@/components/PageTransition";
import Timeline from "@/components/experience/Timeline";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { cvImage, education, profile, projects, researchExperience, researchInterests } from "@/data/experience";
import styles from "./page.module.css";

export const metadata = {
    title: 'Experience - Jaemin KIM',
    description: 'Education, research experience and projects.',
};

export default function ExperiencePage() {
    return (
        <PageTransition>
            <div className={styles.page}>
                <ListingHeader title="Experience." description={`${profile.role}, ${profile.affiliation}`} />
                <div className={`container ${styles.sections}`}>
                    <section className={styles.section} aria-labelledby="education-title">
                        <h2 id="education-title" className={styles.sectionTitle}>Education</h2>
                        <Timeline entries={education} />
                    </section>

                    <section className={styles.section} aria-labelledby="interests-title">
                        <h2 id="interests-title" className={styles.sectionTitle}>Research interests</h2>
                        <AnimatedContent distance={20} duration={0.5} threshold={0.2}>
                            <ul className={styles.interests}>
                                {researchInterests.map(interest => (
                                    <li key={interest} className={styles.interest}>{interest}</li>
                                ))}
                            </ul>
                        </AnimatedContent>
                    </section>

                    <section className={styles.section} aria-labelledby="research-title">
                        <h2 id="research-title" className={styles.sectionTitle}>Research experience</h2>
                        <Timeline entries={researchExperience} />
                    </section>

                    <section className={styles.section} aria-labelledby="projects-title">
                        <h2 id="projects-title" className={styles.sectionTitle}>Projects</h2>
                        <Timeline entries={projects} />
                    </section>

                    <a href={cvImage} target="_blank" rel="noopener noreferrer" className={styles.cvLink}>
                        View the original CV <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </PageTransition>
    );
}
