# The Frontview

[![Vercel](https://vercelbadge.vercel.app/api/SenseiMarv/the-frontview?style=for-the-badge)](https://vercel.com/senseimarv/the-frontview) [![Checkly](https://api.checklyhq.com/v1/badges/checks/00dcc340-7a1f-4591-8b0f-a0887a26437a?style=for-the-badge&theme=default)](https://app.checklyhq.com/checks/00dcc340-7a1f-4591-8b0f-a0887a26437a/)

> A small personal blog about everything around tech and programming.

[The Frontview](https://the-frontview.dev) | [Google Search Insights](https://search.google.com/search-console/insights/?resource_id=sc-domain%3Athe-frontview.dev&hl=de) | [Plausible](https://analytics.the-frontview.dev/the-frontview.dev) | [Google Search Console](https://search.google.com/search-console?resource_id=sc-domain:the-frontview.dev) | [Ahref Webmaster Tools](https://app.ahrefs.com/dashboard) | [Vercel](https://vercel.com/senseimarv/the-frontview) | [Checkly](https://app.checklyhq.com/checks/00dcc340-7a1f-4591-8b0f-a0887a26437a/) | [Axiom](https://cloud.axiom.co/the-frontview-njlg) | [DigitalOcean](https://cloud.digitalocean.com/projects/890d1937-03d2-412c-abce-d5207c3d1195/resources?i=defe27) | [Google Domains](https://domains.google.com/registrar/the-frontview.dev?hl=de)

## Requirements

- [Node.js 18](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

## Getting started

From the root of the project, from a terminal:

1. Run `pnpm i` to install the required dependencies
2. Run `pnpm start` to start a local dev server
3. Access the local dev server at http://localhost:3000

To run the test commands, like `pnpm test`, you need to have the correct version of the Playwright browsers installed. You can install them by running `pnpm exec playwright install`.

## Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                                               |
| :------------------ | :------------------------------------------------------------------- |
| `pnpm start`        | Starts local dev server at [`localhost:3000`](http://localhost:3000) |
| `pnpm lint`         | Runs all linters, showing problems                                   |
| `pnpm lint:fix`     | Runs all linters, trying to fix auto-solvable problems               |
| `pnpm test`         | Runs all tests                                                       |
| `pnpm test:ui`      | Runs all tests in interactive UI mode                                |
| `pnpm test:cleanup` | Deletes images in the root folder created by the tests               |
| `pnpm test:quick`   | Runs all tests and performs the cleanup command afterwards           |
| `pnpm build`        | Builds the production site                                           |
| `pnpm preview`      | Previews the build locally, before deploying                         |
| `pnpm prepare`      | Installs git hooks                                                   |

## Blog posts

New blog posts can be created by adding a new file in [`./src/content/posts`](./src/content/posts). The file name will be the URL path to the new blog post.

A blog post requires the following frontmatter:

```mdx
---
title: "The title of the blog post"
description: "A description of the content of the blog post."
pubDate: "The date the blog post was created (in the format YYYY-MM-DD)"
tags: "A comma-separated list of tags that describe the content of the blog post (preferably 3)"
cover: "A URL leading to an image to be used as the cover of the blog post (can also be a local file)"
---
```

When using an image from a third-party source, the `coverAuthor` or `coverAuthor` and `coverAuthorUrl` frontmatter should be added to give credit to the author of the image:

```mdx
coverAuthor: "The name of the author of the image used in the header of the blog post"
coverAuthorUrl: "A URL leading to the source of the image used in the header of the blog post"
```

Local images should be stored in [`./public/images/posts`](./public/images/posts). They can be referenced directly in the frontmatter:

```mdx
cover: "/images/posts/post-example/cover.png"
```

Posts can be set to draft status by adding `draft: true` to the frontmatter. A draft post, or a post with a `pubDate` set to a future date, will not be visible on the site (but can be accessed by calling its URL directly).

When updating a post, the `upDate` frontmatter should be added with the current date (in the format YYYY-MM-DD).

## Today I Learned articles

New Today I Learned articles can be created by adding a new file in [`./src/content/learned`](./src/content/learned). The file name will be the URL path to the new Today I Learned article.

A Today I Learned article requires the following frontmatter:

```mdx
---
title: "The title of the Today I Learned article"
description: "A description of the content of the Today I Learned article."
pubDate: "The date the Today I Learned article was created (in the format YYYY-MM-DD)"
tags: "A comma-separated list of tags that describe the content of the Today I Learned article (preferably 3)"
---
```

Today I Learned articles can be set to draft status by adding `draft: true` to the frontmatter. A draft Today I Learned article, or a Today I Learned article with a `pubDate` set to a future date, will not be visible on the site (but can be accessed by calling its URL directly).

When updating a Today I Learned article, the `upDate` frontmatter should be added with the current date (in the format YYYY-MM-DD).

## My Setup articles

New My Setup articles can be created by adding a new file in [`./src/content/setup`](./src/content/setup). The file name will be the URL path to the new My Setup article.

A My Setup article requires the following frontmatter:

```mdx
---
title: "The title of the My Setup article"
description: "A description of the content of the My Setup article."
pubDate: "The date the My Setup article was created (in the format YYYY-MM-DD)"
---
```

All My Setup articles are sorted with a custom order, defined by the content slug (the file name). The order is defined in [`./src/components/setup/sortSetup.ts`](./src/components/setup/sortSetup.ts). When a new My Setup article is added, the order should be updated. If the order is not updated, the new My Setup article will be added to the beginning of the list.

My Setup articles can be set to draft status by adding `draft: true` to the frontmatter. A draft My Setup article, or a My Setup article with a `pubDate` set to a future date, will not be visible on the site (but can be accessed by calling its URL directly).

When updating a My Setup article, the `upDate` frontmatter should be added with the current date (in the format YYYY-MM-DD).

## Components

To see which components can be used in a blog post, Today I Learned article or My Setup article, open [`./src/content/posts/demo.mdx`](./src/content/posts/demo.mdx). To see those components in action, navigate to `/posts/demo` in the browser on the live website or on the local dev server.

## Author

- Marvin Stickel

## License

[MIT License](/LICENSE)
