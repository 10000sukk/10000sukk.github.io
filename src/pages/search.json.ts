import type { APIRoute } from 'astro';
import { formatDate, getPosts, labels, postHref } from '../lib/posts';

// Plain-text index for the client-side search (small blog → one JSON file is enough).
const plain = (md = '') =>
  md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const items = posts.map((p) => ({
    title: p.data.title,
    description: p.data.description,
    tags: labels(p),
    date: formatDate(p.data.date),
    url: postHref(p),
    body: plain(p.body),
  }));
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
