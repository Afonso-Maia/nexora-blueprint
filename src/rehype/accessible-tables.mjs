function text(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(text).join('');
}

function enhance(parent, sectionTitle = 'Blueprint document') {
  if (!parent.children) return;
  let currentSection = sectionTitle;
  for (const child of parent.children) {
    if (child.type === 'element' && /^h[1-6]$/.test(child.tagName)) currentSection = text(child).trim() || currentSection;
    if (child.type === 'element' && child.tagName === 'table') {
      child.children.unshift({ type: 'element', tagName: 'caption', properties: { className: ['generated-table-caption'] }, children: [{ type: 'text', value: `${currentSection} — structured data` }] });
      const head = child.children.find((node) => node.type === 'element' && node.tagName === 'thead');
      for (const row of head?.children ?? []) for (const cell of row.children ?? []) if (cell.type === 'element' && cell.tagName === 'th') cell.properties = { ...cell.properties, scope: 'col' };
    }
    enhance(child, currentSection);
  }
}

export default function accessibleTables() {
  return (tree) => enhance(tree);
}
