import path from 'node:path';

function visit(node, visitor) {
  visitor(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) visit(child, visitor);
  }
}

function canonicalRoute(sourcePath) {
  const withoutExtension = sourcePath.replace(/\.md$/i, '');
  if (withoutExtension === 'README') return '/';
  return `/${withoutExtension.replace(/(^|\/)README$/i, '')}/`.replace(/\/+/g, '/');
}

export default function repositoryMarkdown({ root }) {
  const repositoryRoot = path.resolve(root);

  return (tree, file) => {
    const firstTitle = tree.children.findIndex((node) => node.type === 'heading' && node.depth === 1);
    if (firstTitle >= 0) tree.children.splice(firstTitle, 1);

    visit(tree, (node) => {
      if (node.type !== 'link' || typeof node.url !== 'string') return;
      if (/^(?:[a-z]+:|\/|#)/i.test(node.url)) return;

      const [pathname, fragment] = node.url.split('#', 2);
      if (!pathname.toLowerCase().endsWith('.md')) return;

      const absoluteTarget = path.resolve(path.dirname(file.path), decodeURIComponent(pathname));
      const relativeTarget = path.relative(repositoryRoot, absoluteTarget).split(path.sep).join('/');
      node.url = `${canonicalRoute(relativeTarget)}${fragment ? `#${fragment}` : ''}`;
    });
  };
}
