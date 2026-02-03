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
    return (
        <Link href={`${basePath}/${post.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={post.image || "/images/card-thumb.png"}
                    alt={post.title}
                    fill
                    className={styles.image}
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
