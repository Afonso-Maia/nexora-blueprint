function text(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(text).join('');
}

function isTextDiagram(node) {
  if (node.type !== 'element' || node.tagName !== 'pre') return false;
  const code = node.children?.find((child) => child.type === 'element' && child.tagName === 'code');
  const classes = code?.properties?.className ?? [];
  return classes.includes('language-text');
}

function enhance(parent, state, sectionTitle = 'Blueprint document') {
  if (!parent.children) return;
  let currentSection = sectionTitle;
  parent.children = parent.children.map((child) => {
    if (child.type === 'element' && /^h[1-6]$/.test(child.tagName)) currentSection = text(child).trim() || currentSection;
    if (isTextDiagram(child)) {
      state.count += 1;
      const captionId = `generated-text-diagram-${state.count}`;
      child.properties ??= {};
      child.properties.ariaLabelledBy = captionId;
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['text-diagram'], role: 'group', ariaLabelledBy: captionId },
        children: [
          { type: 'element', tagName: 'p', properties: { id: captionId, className: ['generated-diagram-caption'] }, children: [{ type: 'text', value: `${currentSection} — text diagram` }] },
          child,
        ],
      };
    }
    enhance(child, state, currentSection);
    return child;
  });
}

export default function accessibleTextDiagrams() {
  return (tree) => enhance(tree, { count: 0 });
}
