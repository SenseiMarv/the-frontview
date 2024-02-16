import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';

export function readingTimePlugin() {
  return (tree: Node, { data }: { data: any }) => {
    const {
      frontmatter
    }: { frontmatter: Record<string, unknown> & { readingTime?: number } } =
      data.astro;
    if (frontmatter.readingTime) {
      return;
    }
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    frontmatter.readingTime = readingTime.minutes;
  };
}

interface HintNode extends Node {
  children: { type: string; value: string }[];
  data?: {
    hProperties?: {
      class?: string;
    };
    hName?: string;
  };
}

const classNames = {
  'hint tip': /^!>|!>\s/,
  'hint warn': /^\?>|\?>\s/,
  'hint error': /^x>|x>\s/
};

export function hintPlugin() {
  return (tree: Node) => {
    visit(
      tree,
      'paragraph',
      (node: HintNode, index: number | null, parent: Parent) => {
        if (!parent || !Array.isArray(parent.children) || index === null) {
          return;
        }

        const { children = [] } = node;
        if (
          children.length === 0 ||
          children[0] === undefined ||
          children[0].type !== 'text'
        ) {
          return;
        }

        const textNode = children[0];
        const value = textNode.value;

        if (!Object.values(classNames).some((r) => r.test(value))) {
          return;
        }

        const classNameResult = Object.entries(classNames).find(([, r]) =>
          r.test(value)
        );

        if (!classNameResult) {
          return;
        }

        const [className, r] = classNameResult;
        const data = node.data ?? (node.data = {});
        const hProperties = data.hProperties ?? (data.hProperties = {});

        textNode.value = value.replace(r, '');
        hProperties.class = className;
        parent.children[index] = {
          ...node,
          type: 'div',
          data: {
            ...data,
            hName: 'div'
          }
        };
      }
    );
  };
}
