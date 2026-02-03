import PostCard from "@/components/PostCard";
import styles from "@/app/page.module.css";
import { getSortedPortfolioData } from "@/lib/posts";

export const metadata = {
    title: 'Portfolio - Jaemin KIM',
    description: 'My projects and works.',
};

export default function PortfolioPage() {
    const projects = getSortedPortfolioData();

    return (
        <div className="container">
            <div style={{ marginBottom: '60px', marginTop: '20px' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>
                    Portfolio
                </h1>
            </div>

            <div className={styles.grid}>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <PostCard key={project.id} post={project} basePath="/portfolio" />
                    ))
                ) : (
                    <p style={{ color: 'var(--muted)' }}>No projects found.</p>
                )}
            </div>
        </div>
    );
}
