import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

function routeFor(id: string) {
  if (id === 'index') return '/';
  const route = id.replace(/(?:^|\/)index$/, '');
  return `/${route}${route.endsWith('/') ? '' : '/'}`;
}

function searchableText(body: string) {
  return body
    .replace(/^---[\s\S]*?---/m, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_>#|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const GET: APIRoute = async () => {
  const documents = await getCollection('docs');
  const entries = documents.map((document) => ({
    title: document.data.title,
    route: routeFor(document.id),
    status: document.data.publicationStatus ?? null,
    kind: document.data.publicationKind ?? 'authoritative',
    sourcePath: document.data.sourcePath ?? document.id,
    text: searchableText(document.body ?? ''),
  }));

  entries.push(
    { title: 'Decisions and ADRs', route: '/decisions/', status: null, kind: 'generated', sourcePath: 'Generated from adrs/', text: 'Filter architecture decisions by number title status date and references.' },
    { title: 'Page and Template Coverage', route: '/coverage/', status: null, kind: 'generated', sourcePath: 'Generated from cross-phase mappings', text: 'Filter 89 pages and nine templates by owner design engineering testing and increment.' },
    { title: 'Guided Journeys', route: '/journeys/', status: null, kind: 'orientation', sourcePath: 'Generated from approved journey definitions', text: 'Guided reading paths and the approved portfolio journey.' },
    { title: 'Blueprint History', route: '/history/', status: null, kind: 'generated', sourcePath: 'Generated from changelog and ADR lifecycle', text: 'Changelog decision history supersession and deprecation continuity.' },
  );

  entries.sort((left, right) => left.title.localeCompare(right.title));
  return new Response(JSON.stringify(entries), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=0, must-revalidate' },
  });
};
