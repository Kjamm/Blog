import styles from "@/app/page.module.css";
import { getAllTags, getSortedPostsData } from "@/lib/posts";
import ListingHeader from "@/components/ListingHeader";
import PageTransition from "@/components/PageTransition";
import PostList from "@/components/PostList";

export const metadata = {
    title: 'Blog - Jaemin KIM',
    description: 'Read our latest tech stories.',
};

export default function BlogPage() {
    const posts = getSortedPostsData();
    const tags = getAllTags();

    return (
        <PageTransition>
            <div className={styles.listing}>
                <ListingHeader title="Tech Blog." description="Notes & discoveries" />
                <div className="container">
                    <PostList allPosts={posts} allTags={tags} />
                </div>
            </div>
        </PageTransition>
    );
}
