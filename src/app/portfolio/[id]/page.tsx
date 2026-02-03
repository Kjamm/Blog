import styles from '@/app/posts/[id]/page.module.css';
import markdownStyles from '@/components/Markdown.module.css';
import { getPortfolioData, getSortedPortfolioData } from '@/lib/posts';

export async function generateStaticParams() {
    const projects = getSortedPortfolioData();
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const projectData = await getPortfolioData(id);

    return (
        <article className={styles.article}>
            <header className={styles.header}>
                <div className={styles.tags}>
                    <span className={styles.tag} style={{ color: 'var(--foreground)', background: 'var(--background-subtle)', padding: '4px 12px', borderRadius: '4px' }}>
                        {projectData.tag}
                    </span>
                </div>
                <h1 className={styles.title}>{projectData.title}</h1>
                <div className={styles.meta} style={{ marginTop: '16px' }}>
                    {projectData.date}
                </div>
            </header>
            <div
                className={`${styles.content} ${markdownStyles.markdown}`}
                dangerouslySetInnerHTML={{ __html: projectData.contentHtml || '' }}
            />
        </article>
    );
}
