"use client";

import { useState } from 'react';
import PostCard, { PostProps } from './PostCard';
import styles from './PostList.module.css';
import gridStyles from '@/app/page.module.css';

interface PostListProps {
    allPosts: PostProps[];
    allTags: string[];
}

export default function PostList({ allPosts, allTags }: PostListProps) {
    const [selectedTag, setSelectedTag] = useState('All');

    const filteredPosts = selectedTag === 'All'
        ? allPosts
        : allPosts.filter(post => post.tag.toLowerCase() === selectedTag.toLowerCase());

    return (
        <div>
            <div className={styles.filterBar}>
                <button
                    className={`${styles.filterBtn} ${selectedTag === 'All' ? styles.active : ''}`}
                    onClick={() => setSelectedTag('All')}
                >
                    All
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        className={`${styles.filterBtn} ${selectedTag.toLowerCase() === tag.toLowerCase() ? styles.active : ''}`}
                        onClick={() => setSelectedTag(tag)}
                    >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </button>
                ))}
            </div>

            <div className={gridStyles.grid}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <p style={{ color: 'var(--muted)', width: '100%' }}>No posts found.</p>
                )}
            </div>
        </div>
    );
}
