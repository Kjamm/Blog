import styles from './page.module.css';
import markdownStyles from '@/components/Markdown.module.css';
import { getPostData, getSortedPostsData } from '@/lib/posts';

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        id: post.id,
    }));
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const postData = await getPostData(id);

    return (
        <article className={styles.article}>
            <header className={styles.header}>
                <div className={styles.tags}>
                    <span className={styles.tag}>#{postData.tag}</span>
                </div>
                <h1 className={styles.title}>{postData.title}</h1>
                <div className={styles.meta}>
                    {postData.date}
                </div>
            </header>
            <div
                className={`${styles.content} ${markdownStyles.markdown}`}
                dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
            />
        </article>
    );
}
