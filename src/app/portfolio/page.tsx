import ListingHeader from "@/components/ListingHeader";
import PageTransition from "@/components/PageTransition";
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
        <PageTransition>
            <div className={styles.listing}>
                <ListingHeader title="Portfolio." description="Projects & experience" />
                <div className="container">
                    <PostList allPosts={projects} basePath="/portfolio" />
                </div>
            </div>
        </PageTransition>
    );
}
