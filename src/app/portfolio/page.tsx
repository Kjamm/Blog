import PostList from "@/components/PostList";
import { getSortedPortfolioData } from "@/lib/posts";
import styles from "@/app/page.module.css";

export const metadata = {
    title: 'Portfolio - Jaemin KIM',
    description: 'My projects and works.',
};

export default function PortfolioPage() {
    const projects = getSortedPortfolioData();

    return (
        <div className={styles.listing}>
          <div className="container">
            <div className={styles.pageHeading}>
                <p className={styles.eyebrow}>Projects & experience</p>
                <h1 className={styles.pageTitle}>
                    Portfolio.
                </h1>
            </div>

            <PostList allPosts={projects} basePath="/portfolio" />
          </div>
        </div>
    );
}
