import Image from 'next/image';
import Link from 'next/link';
import styles from './PostCard.module.css';

export interface PostProps {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    tag: string;
    image?: string;
}

export default function PostCard({ post, basePath = '/posts' }: { post: PostProps, basePath?: string }) {
    // GitHub Pages repository name (basePath) handling
    const isProd = process.env.NODE_ENV === 'production';
    const repoName = '/Blog'; // Your repository name
    const imagePrefix = isProd ? repoName : '';

    const rawSrc = post.image || "/images/card-thumb.png";
    const imageSrc = rawSrc.startsWith('/') ? `${imagePrefix}${rawSrc}` : rawSrc;

    return (
        <Link href={`${basePath}/${post.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={imageSrc}
                    alt={post.title}
                    fill
                    className={styles.image}
                    unoptimized // Force unoptimized for static export just in case
                />
            </div>
            <div className={styles.content}>
                <div className={styles.tags}>
                    <span className={styles.tag}>{post.tag}</span>
                </div>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div className={styles.meta}>{post.date}</div>
            </div>
        </Link>
    );
}
