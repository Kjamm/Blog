// Content of the Experience page. Edit this file to update the page.
// Source: the CV that used to live at portfolio/cv.md.

export interface Entry {
    period: string;
    title: string;
    organization?: string;
    location?: string;
    details?: string[];
    /** Internal link, e.g. to the matching portfolio page. */
    href?: string;
    /** External link shown under the entry, e.g. the source repository. */
    external?: { label: string; url: string };
}

export const profile = {
    role: 'Undergraduate Student',
    affiliation: 'Chungnam National University',
};

/** The original CV image, kept as a downloadable reference. */
export const cvImage = 'https://velog.velcdn.com/images/kjamm/post/0ff32922-43cc-423d-b603-cb2dc50bd1c9/image.png';

export const education: Entry[] = [
    {
        period: 'Mar. 2022 – Present',
        title: 'Chungnam National University',
        organization: 'Department of Bioscience and Information',
        location: 'Daejeon, Korea',
        details: ['Bachelor Student', 'GPA 4.0 / 4.5'],
    },
    {
        period: 'Mar. 2022 – Present',
        title: 'Chungnam National University',
        organization: 'Department of Bio AI Convergence',
        location: 'Daejeon, Korea',
        details: ['Bachelor Student', 'GPA 4.5 / 4.5'],
    },
];

export const researchInterests = [
    'Protein design',
    'Deep learning',
    'Machine learning',
    'Bioinformatics software',
    'Drug discovery',
];

export const researchExperience: Entry[] = [
    {
        period: 'Jun. 2025 – Present',
        title: 'Undergraduate research student',
        organization: 'Proteomic Informatics Lab',
        location: 'Korea',
    },
    {
        period: 'Apr. 2024 – Nov. 2024',
        title: 'Research Student',
        organization: 'Kakao Tech Campus',
        location: 'Korea',
    },
];

export const projects: Entry[] = [
    {
        period: 'Jul. 2026',
        title: 'pdb2mcsm',
        organization: 'Open-source project',
        details: ['Automatically preprocesses protein complex PDB files for mCSM-PPI2 analysis'],
        href: '/portfolio/Pdb2Mcsm',
        external: { label: 'GitHub', url: 'https://github.com/Kjamm/pdb2mcsm' },
    },
    {
        period: 'Jul. 2024 – Present',
        title: 'NOTAI',
        organization: 'Kakao Tech Campus',
        location: 'Korea',
        details: ['Create a more powerful college student note-taking application using AI'],
        href: '/portfolio/Kakao_Tech_Campus',
    },
];
