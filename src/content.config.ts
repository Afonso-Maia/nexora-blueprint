import { defineCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { glob, type Loader } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';
import { allowedStatuses, extractStatus, statusVariant } from './lib/blueprint-data.mjs';

const sourcePatterns = [
  'README.md',
  'CONTRIBUTING.md',
  'CHANGELOG.md',
  '00-overview/**/*.md',
  '01-brand/**/*.md',
  '02-information-architecture/**/*.md',
  '03-product-structure/**/*.md',
  '04-design-system/**/*.md',
  '05-admin-dashboard/**/*.md',
  '06-engineering/**/*.md',
  '07-testing/**/*.md',
  '08-roadmap/**/*.md',
  '09-publication/**/*.md',
  'adrs/**/*.md',
  'assets/README.md',
  'product-decisions/**/*.md',
];

function canonicalId(entry: string): string {
  const path = entry.replace(/\.md$/i, '');
  return path === 'README' ? 'index' : path.replace(/(^|\/)README$/i, '$1index');
}

function repositoryDocsLoader(): Loader {
  const sourceLoader = glob({
    base: '.',
    pattern: sourcePatterns,
    generateId: ({ entry }) => canonicalId(entry),
  });

  return {
    name: 'nexora-repository-docs-loader',
    load: async (context) => {
      const parseData = context.parseData;

      await sourceLoader.load({
        ...context,
        parseData: async ({ id, data, filePath }) => {
          if (!filePath) throw new Error(`Authoritative Markdown is missing a source path: ${id}`);
          const source = await readFile(filePath, 'utf8');
          const heading = source.match(/^#\s+(.+)$/m)?.[1]?.trim();

          if (!heading) {
            throw new Error(`Authoritative Markdown must contain one level-one title: ${filePath}`);
          }

          const publicationStatus = extractStatus(source);
          if (data.status && data.status !== publicationStatus) {
            throw new Error(`Frontmatter and body status conflict: ${filePath}`);
          }

          return parseData({
            id,
            filePath,
            data: {
              ...data,
              title: data.title ?? heading,
              status: data.status ?? publicationStatus ?? undefined,
              publicationStatus: publicationStatus ?? undefined,
              publicationStatusVariant: publicationStatus
                ? statusVariant(publicationStatus)
                : undefined,
              publicationKind: 'authoritative',
              sourcePath: path.relative(process.cwd(), filePath).split(path.sep).join('/'),
            },
          });
        },
      });
    },
  };
}

export const collections = {
  docs: defineCollection({
    loader: repositoryDocsLoader(),
    schema: docsSchema({
      extend: z.object({
        status: z.enum(allowedStatuses).optional(),
        publicationStatus: z.enum(allowedStatuses).optional(),
        publicationStatusVariant: z
          .enum(['note', 'danger', 'success', 'caution', 'tip', 'default'])
          .optional(),
        publicationKind: z.enum(['authoritative', 'generated', 'orientation']).optional(),
        sourcePath: z.string().optional(),
      }),
    }),
  }),
};
