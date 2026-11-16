import styles from '@/app/posts/[id]/page.module.css';
import markdownStyles from '@/components/Markdown.module.css';
import PageTransition from '@/components/PageTransition';
import ReadingProgress from '@/components/ReadingProgress';
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
        <PageTransition>
            <article id="article" className={styles.article}>
                <ReadingProgress target="#article" />
                <header className={styles.header}>
                    <div className={styles.tags}>
                        <span className={styles.tag}>
                            {projectData.tag}
                        </span>
                    </div>
                    <h1 className={styles.title}>{projectData.title}</h1>
                    <div className={styles.meta}>
                        {projectData.date}
                    </div>
                </header>
                <div
                    lang="ko"
                    className={`${styles.content} ${markdownStyles.markdown}`}
                    dangerouslySetInnerHTML={{ __html: projectData.contentHtml || '' }}
                />
            </article>
        </PageTransition>
    );
}
