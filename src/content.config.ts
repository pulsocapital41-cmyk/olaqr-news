import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notas' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    author: z.string().default('OLAQR News'),
    categories: z.array(z.string()).default([]),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notas };
