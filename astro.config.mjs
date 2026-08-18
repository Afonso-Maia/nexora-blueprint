import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import repositoryMarkdown from './src/remark/repository-markdown.mjs';

export default defineConfig({
  site: 'https://nexora-blueprint.vercel.app',
  trailingSlash: 'always',
  markdown: {
    processor: unified({ remarkPlugins: [[repositoryMarkdown, { root: process.cwd() }]] }),
  },
  integrations: [
    starlight({
      disable404Route: true,
      pagefind: false,
      title: 'Nexora Product Blueprint',
      description:
        'The authoritative product, design, engineering, quality, and delivery blueprint for Nexora.',
      markdown: { processedDirs: ['.'] },
      customCss: ['./src/styles/nexora.css'],
      components: { PageTitle: './src/components/PageTitle.astro', Search: './src/components/Search.astro' },
      lastUpdated: true,
      pagination: true,
      sidebar: [
        { label: 'Blueprint overview', slug: 'index' },
        {
          label: 'Explore',
          items: [
            { label: 'Decisions and ADRs', link: '/decisions/' },
            { label: 'Page and template coverage', link: '/coverage/' },
            { label: 'Guided journeys', link: '/journeys/' },
            { label: 'Blueprint history', link: '/history/' },
          ],
        },
        { label: 'Phase 1 · Product foundation', items: [{ autogenerate: { directory: '00-overview' } }] },
        { label: 'Phase 1 · Brand', items: [{ autogenerate: { directory: '01-brand' } }] },
        {
          label: 'Phase 2A · Information discovery',
          items: [{ autogenerate: { directory: '02-information-architecture' } }],
        },
        {
          label: 'Phase 2B · Product structure',
          items: [{ autogenerate: { directory: '03-product-structure' } }],
        },
        { label: 'Phase 3 · Design system', items: [{ autogenerate: { directory: '04-design-system' } }] },
        { label: 'Administrative dashboard', items: [{ autogenerate: { directory: '05-admin-dashboard' } }] },
        { label: 'Phase 4 · Engineering', items: [{ autogenerate: { directory: '06-engineering' } }] },
        { label: 'Phase 5 · Testing', items: [{ autogenerate: { directory: '07-testing' } }] },
        { label: 'Phase 6 · Delivery roadmap', items: [{ autogenerate: { directory: '08-roadmap' } }] },
        { label: 'Phase 7 · Publication', items: [{ autogenerate: { directory: '09-publication' } }] },
        { label: 'Architecture decisions', items: [{ autogenerate: { directory: 'adrs' } }] },
        { label: 'Product decisions', items: [{ autogenerate: { directory: 'product-decisions' } }] },
      ],
    }),
  ],
});
