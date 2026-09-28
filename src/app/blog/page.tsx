import styles from "@/app/page.module.css";
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
        <div className={styles.listing}>
          <div className="container">
            <div className={styles.pageHeading}>
                <p className={styles.eyebrow}>Notes & discoveries</p>
                <h1 className={styles.pageTitle}>
                    Tech <span>Blog.</span>
                </h1>
            </div>

            <PostList allPosts={posts} allTags={tags} />
          </div>
        </div>
    );
}
