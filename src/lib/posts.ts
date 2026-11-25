import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES } from '../consts';

export type Post = CollectionEntry<'posts'>;

/** Published posts, newest first. Drafts are included only in dev. */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const tagSlug = (tag: string) => tag.trim().toLowerCase().replace(/\s+/g, '-');
export const tagHref = (tag: string) => `/tags/${tagSlug(tag)}/`;
export const postHref = (post: Post) => `/posts/${post.id}/`;

export const formatDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

/** A post's labels: its category first, then its tags (deduplicated). */
export const labels = (p: Post): string[] => [...new Set([p.data.category, ...p.data.tags])];

/** Every label (category or tag) with its posts. A post counts for its category and all of its tags. */
export function postsByTag(posts: Post[]): Map<string, Post[]> {
  const map = new Map<string, Post[]>();
  for (const p of posts) for (const t of labels(p)) map.set(t, [...(map.get(t) ?? []), p]);
  return map;
}

/** Tags in alphabetical order (sidebar). */
export function tagsAlphabetical(posts: Post[]): { tag: string; count: number }[] {
  return [...postsByTag(posts)]
    .map(([tag, list]) => ({ tag, count: list.length }))
    .sort((a, b) => a.tag.localeCompare(b.tag, 'ko', { sensitivity: 'base' }));
}

/** The fixed category list from src/consts.ts. Everything else is a plain tag. */
const CATEGORY_SET = new Set<string>(CATEGORIES);
export const isCategory = (name: string) => CATEGORY_SET.has(name);
/** Display name: categories as-is, tags with a leading #. */
export const labelText = (name: string) => (isCategory(name) ? name : `#${name}`);

/**
 * Home sections: one per category, ordered by the
 * section's most recent post. The featured post is the newest post that lists
 * the tag in `featured`; otherwise the newest post of the section.
 */
export function homeSections(posts: Post[], subCount: number) {
  const byPrimary = new Map<string, Post[]>();
  for (const p of posts) {
    const t = p.data.category;
    byPrimary.set(t, [...(byPrimary.get(t) ?? []), p]);
  }
  const all = postsByTag(posts);
  return [...byPrimary]
    .map(([tag, list]) => {
      const featured = list.find((p) => p.data.featured.includes(tag)) ?? list[0];
      return {
        tag,
        total: all.get(tag)?.length ?? list.length,
        featured,
        rest: list.filter((p) => p !== featured).slice(0, subCount),
        latest: list[0].data.date.valueOf(),
      };
    })
    .sort((a, b) => b.latest - a.latest);
}

export function readingMinutes(body: string | undefined): number {
  const text = (body ?? '').replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_`\[\]()!-]/g, ' ');
  const korean = (text.match(/[가-힣]/g) ?? []).length;
  const words = text.replace(/[가-힣]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(korean / 500 + words / 220));
}
