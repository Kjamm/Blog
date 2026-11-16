"use client";

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import PostCard, { PostProps } from './PostCard';
import styles from './PostList.module.css';
import gridStyles from '@/app/page.module.css';
import { gsap, useGSAP, Flip, REDUCED_MOTION } from '@/lib/gsap';

interface PostListProps {
    allPosts: PostProps[];
    allTags?: string[];
    basePath?: string;
}

export default function PostList({ allPosts, allTags = [], basePath = '/posts' }: PostListProps) {
    const [selectedTag, setSelectedTag] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const gridRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const flipState = useRef<Flip.FlipState | null>(null);

    const filteredPosts = allPosts.filter(post => {
        const postTag = post.tag || '';
        const postTitle = post.title || '';
        const matchesTag = selectedTag === 'All' || postTag.toLowerCase() === selectedTag.toLowerCase();
        const matchesSearch = postTitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTag && matchesSearch;
    });

    // Arriving from the header's search button.
    useEffect(() => {
        if (window.location.hash === '#search') inputRef.current?.focus({ preventScroll: true });
    }, []);

    // Picking a tag records where every card is, so the cards that stay can
    // glide to their new slots. Typing in the search box filters instantly.
    const selectTag = (tag: string) => {
        if (tag === selectedTag) return;
        const grid = gridRef.current;
        if (grid && !window.matchMedia(REDUCED_MOTION).matches) {
            flipState.current = Flip.getState(grid.querySelectorAll('[data-flip-id]'));
        }
        setSelectedTag(tag);
    };

    useGSAP(() => {
        const state = flipState.current;
        flipState.current = null;
        if (!state || !gridRef.current) return;
        Flip.from(state, {
            targets: gridRef.current.querySelectorAll('[data-flip-id]'),
            duration: 0.35,
            ease: 'power3.inOut',
            scale: false,
            onEnter: elements => gsap.fromTo(elements,
                { opacity: 0, scale: 0.96 },
                { opacity: 1, scale: 1, duration: 0.25, ease: 'power3.out', stagger: 0.03, clearProps: 'opacity,scale' }),
        });
    }, { dependencies: [selectedTag], scope: gridRef });

    const isActive = (tag: string) => selectedTag.toLowerCase() === tag.toLowerCase();

    return (
        <div>
            <div className={styles.controls}>
                {allTags.length > 0 && (
                    <div className={styles.filterBar}>
                        {['All', ...allTags].map(tag => (
                            <button
                                key={tag}
                                className={`${styles.filterBtn} ${isActive(tag) ? styles.active : ''}`}
                                onClick={() => selectTag(tag)}
                                aria-pressed={isActive(tag)}
                            >
                                {tag.charAt(0).toUpperCase() + tag.slice(1)}
                            </button>
                        ))}
                    </div>
                )}

                <div className={styles.searchBar}>
                    <Search size={18} className={styles.searchIcon} aria-hidden="true" />
                    <input
                        ref={inputRef}
                        id="search"
                        type="search"
                        aria-label="Search by title"
                        placeholder="Search by title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            <div ref={gridRef} className={gridStyles.grid}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div key={post.id} data-flip-id={post.id} className={styles.cell}>
                            <PostCard post={post} basePath={basePath} headingLevel="h2" />
                        </div>
                    ))
                ) : (
                    <p className={styles.empty}>
                        No posts match. Try another title or pick a different tag.
                    </p>
                )}
            </div>
        </div>
    );
}
