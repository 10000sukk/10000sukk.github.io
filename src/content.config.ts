import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // The first tag decides which home section the post appears in.
    tags: z.array(z.string()).min(1),
    // Tags this post represents as the big "featured" post on the home page.
    featured: z.array(z.string()).default([]),
    // Path under /public, e.g. /covers/my-post.png
    cover: z.string().optional(),
    // Drafts are visible in `npm run dev` only.
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
