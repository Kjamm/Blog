import ListingHeader from "@/components/ListingHeader";
import PageTransition from "@/components/PageTransition";
import PostCard from "@/components/PostCard";
import styles from "@/app/page.module.css";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export async function generateStaticParams() {
    const tags = getAllTags();
    return tags.map((tag) => ({
        tag: tag,
    }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const posts = getPostsByTag(decodedTag);

    // Capitalize first letter for display
    const displayTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

    return (
        <PageTransition>
            <div className={styles.listing}>
                <ListingHeader
                    title={displayTag}
                    description={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'} with this tag`}
                />
                <div className="container">
                    <div className={styles.grid}>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <PostCard key={post.id} post={post} headingLevel="h2" />
                            ))
                        ) : (
                            <p style={{ color: 'var(--muted)' }}>No posts found for this tag.</p>
                        )}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
