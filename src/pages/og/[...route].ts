// eslint-disable-next-line import/no-unresolved
import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import defaultTheme from 'tailwindcss/defaultTheme';

import { sortTagsByUsage } from '../../components/tags/sortTags';
import type {
  LearnedCollection,
  PostsCollection,
  SetupCollection
} from '../../content/config';

const postsEntries = await getCollection('posts');
const learnedEntries = await getCollection('learned');
const setupEntries = await getCollection('setup');

const postPages = Object.fromEntries(
  postsEntries.map(({ slug, data }) => [`posts/${slug}`, data])
);
const learnedPages = Object.fromEntries(
  learnedEntries.map(({ slug, data }) => [`learned/${slug}`, data])
);
const setupPages = Object.fromEntries(
  setupEntries.map(({ slug, data }) => [`setup/${slug}`, data])
);

const sortedTags = sortTagsByUsage(postsEntries, learnedEntries);
const tagPages = Object.fromEntries(
  sortedTags.map(([tag, _]) => [
    `tags/${tag}`,
    { title: 'The Frontview', description: `Tag ${tag}` }
  ])
);

type Page = Pick<
  PostsCollection['data'] | LearnedCollection['data'] | SetupCollection['data'],
  'title' | 'description'
>;
type Pages = Record<string, Page>;
const pages: Pages = {
  ...postPages,
  ...learnedPages,
  ...setupPages,
  ...tagPages,
  index: {
    title: 'The Frontview',
    description: ''
  },
  learned: {
    title: 'The Frontview',
    description: 'Today I Learned'
  },
  posts: {
    title: 'The Frontview',
    description: 'Posts'
  },
  privacy: {
    title: 'The Frontview',
    description: 'Privacy Policy'
  },
  setup: {
    title: 'The Frontview',
    description: 'My Setup'
  },
  tags: {
    title: 'The Frontview',
    description: 'Tags'
  }
};

export const prerender = true;
export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page: Page) => {
    const title = truncateString(page.title);
    const description = truncateString(page.description, 80);

    return {
      title,
      description,
      logo: {
        path: './src/assets/icons/TheFrontview-Icon.png',
        size: [200]
      },
      bgGradient: [[31, 41, 55]],
      border: {
        color: [20, 184, 166],
        width: 10,
        side: 'block-end'
      },
      font: {
        title: {
          families: ['Quicksand', 'Geneva', ...defaultTheme.fontFamily.sans]
        },
        description: {
          families: ['Inter', 'Geneva', ...defaultTheme.fontFamily.sans]
        }
      },
      fonts: ['./fonts/Quicksand.woff2', './fonts/Inter.woff2']
    };
  }
});

function truncateString(string: string, maxLength = 50) {
  return string.length > maxLength
    ? `${string.substring(0, maxLength)}...`
    : string;
}
