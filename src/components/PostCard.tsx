import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import GlareHover from '@/components/reactbits/GlareHover';
import styles from './PostCard.module.css';

export interface PostProps {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    tag: string;
    image?: string;
}

interface PostCardProps {
    post: PostProps;
    basePath?: string;
    /** Use "h2" when the cards sit directly under the page's h1. */
    headingLevel?: 'h2' | 'h3';
}

export default function PostCard({ post, basePath = '/posts', headingLevel: Heading = 'h3' }: PostCardProps) {
    const repoName = '/Blog';
    const rawSrc = post.image || "/images/card-thumb.png";
    const imageSrc = (rawSrc.startsWith('/') && !rawSrc.startsWith(repoName))
        ? `${repoName}${rawSrc}`
        : rawSrc;

    return (
        <GlareHover
            className={styles.card}
            width="100%"
            height="100%"
            background="var(--surface)"
            borderRadius="var(--radius)"
            borderColor="var(--hairline)"
            glareColor="#e4deff"
            glareOpacity={0.22}
            glareSize={260}
            transitionDuration={550}
        >
            <Link href={`${basePath}/${post.id}`} className={styles.link}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={imageSrc}
                        alt=""
                        fill
                        sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1068px) 50vw, 390px"
                        className={styles.image}
                        unoptimized // Force unoptimized for static export just in case
                    />
                </div>
                <div className={styles.content}>
                    <span className={styles.tag}>{post.tag}</span>
                    <Heading className={styles.title}>{post.title}</Heading>
                    {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
                    <div className={styles.meta}>
                        <span>{post.date}</span>
                        <span className={styles.arrow}><ArrowUpRight size={20} aria-hidden="true" /></span>
                    </div>
                </div>
            </Link>
        </GlareHover>
    );
}
