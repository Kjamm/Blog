import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
const portfolioDirectory = path.join(process.cwd(), 'portfolio');

export interface PostData {
    id: string;
    title: string;
    date: string;
    tag: string;
    excerpt: string;
    contentHtml?: string;
    // Optional image field specifically for portfolio but good to have generally
    image?: string;
}

// Generic function to get sorted data from a directory
function getSortedData(directory: string): PostData[] {
    if (!fs.existsSync(directory)) {
        return [];
    }
    const fileNames = fs.readdirSync(directory);
    const allData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(directory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            ...(matterResult.data as { title: string; date: string; tag: string; excerpt: string; image?: string }),
        };
    });

    return allData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Generic function to get single item data
async function getData(directory: string, id: string): Promise<PostData> {
    const fullPath = path.join(directory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...(matterResult.data as { title: string; date: string; tag: string; excerpt: string; image?: string }),
    };
}

// Blog Posts
export function getSortedPostsData(): PostData[] {
    return getSortedData(postsDirectory);
}

export async function getPostData(id: string): Promise<PostData> {
    return getData(postsDirectory, id);
}

export function getPostsByTag(tag: string): PostData[] {
    const allPosts = getSortedPostsData();
    return allPosts.filter((post) => post.tag.toLowerCase() === tag.toLowerCase());
}

export function getAllTags(): string[] {
    const allPosts = getSortedPostsData();
    const tags = new Set(allPosts.map((post) => post.tag.toLowerCase()));
    return Array.from(tags);
}

// Portfolio Projects
export function getSortedPortfolioData(): PostData[] {
    return getSortedData(portfolioDirectory);
}

export async function getPortfolioData(id: string): Promise<PostData> {
    return getData(portfolioDirectory, id);
}
