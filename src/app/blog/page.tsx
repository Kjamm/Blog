import styles from "./page.module.css";
import { getAllTags, getSortedPostsData } from "@/lib/posts";
import PostList from "@/components/PostList";

export const metadata = {
    title: 'Blog - Jaemin KIM',
    description: 'Read our latest tech stories.',
};

export default function BlogPage() {
    const posts = getSortedPostsData();
    const tags = getAllTags();

    return (
        <div className="container">
            <div style={{ marginBottom: '40px', marginTop: '20px' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>
                    Tech <span style={{ color: 'var(--muted-light)' }}>Blog</span>
                </h1>
            </div>

            <PostList allPosts={posts} allTags={tags} />
        </div>
    );
}
