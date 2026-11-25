import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './consts';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // One of CATEGORIES (src/consts.ts). Decides the home section.
    category: z.enum(CATEGORIES),
    // Free-form tags, e.g. the project name. A tag that equals a category name links to that category.
    tags: z.array(z.string()).default([]),
    // Tags this post represents as the big "featured" post on the home page.
    featured: z.array(z.string()).default([]),
    // Path under /public, e.g. /covers/my-post.png
    cover: z.string().optional(),
    // Drafts are visible in `npm run dev` only.
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
