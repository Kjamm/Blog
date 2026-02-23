"use client";

import { useState } from 'react';
import PostCard, { PostProps } from './PostCard';
import styles from './PostList.module.css';
import gridStyles from '@/app/page.module.css';

interface PostListProps {
    allPosts: PostProps[];
    allTags?: string[];
    basePath?: string;
}

export default function PostList({ allPosts, allTags = [], basePath = '/posts' }: PostListProps) {
    const [selectedTag, setSelectedTag] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = allPosts.filter(post => {
        const postTag = post.tag || '';
        const postTitle = post.title || '';
        const matchesTag = selectedTag === 'All' || postTag.toLowerCase() === selectedTag.toLowerCase();
        const matchesSearch = postTitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTag && matchesSearch;
    });

    return (
        <div>
            <div className={styles.controls}>
                {allTags.length > 0 && (
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
                )}

                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            <div className={gridStyles.grid}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} basePath={basePath} />
                    ))
                ) : (
                    <p style={{ color: 'var(--muted)', width: '100%' }}>No posts found.</p>
                )}
            </div>
        </div>
    );
}
