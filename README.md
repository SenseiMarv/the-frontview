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

## Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                                               |
| :-------------- | :------------------------------------------------------------------- |
| `pnpm start`    | Starts local dev server at [`localhost:3000`](http://localhost:3000) |
| `pnpm lint`     | Runs all linters, showing problems                                   |
| `pnpm lint:fix` | Runs all linters, trying to fix auto-solvable problems               |
| `pnpm build`    | Builds the production site                                           |
| `pnpm preview`  | Previews the build locally, before deploying                         |
| `pnpm prepare`  | Installs git hooks                                                   |

## Blog posts

New blog posts can be created by adding a new file in `./src/content/posts`. The file name will be the URL path to the new blog post.

A blog post requires the following frontmatter:

```mdx
---
title: "The title of the blog post"
description: "A description of the content of the blog post."
pubDate: "The date the blog post was created (in the format YYYY-MM-DD)"
tags: "A comma-separated list of tags that describe the content of the blog post (preferably 3)"
imgUrl: "A URL leading to an image to be used as the cover of the blog post (can also be a local file)"
imgAuthor: "The name of the author of the image used in the header of the blog post"
imgAuthorUrl: "A URL leading to the source of the image used in the header of the blog post"
---
```

Posts can be set to draft status by adding `draft: true` to the frontmatter. A draft post, or a post with a `pubDate` set to a future date, will not be visible on the site (but can be accessed by calling its URL directly).

Local images should be stored in `./public/images`. They can be referenced directly in the frontmatter:

```mdx
imgUrl: "/images/post-example/cover.png"
```

### Blog components

To see which components can be used in a blog post, open `./src/content/posts/demo.mdx`. To see those components in action, navigate to `/posts/demo` in the browser on the live website or on the local dev server.

<details><summary>How to use Twitter embedded content</summary>

If you want to use the embedded Twitter card, a API token is required:

1. Create a new file `.env` as copy of `.env.example` in the root of the project
2. Add a valid Twitter API token to `SECRET_TWITTER_TOKEN` in the new file:

```
SECRET_TWITTER_TOKEN=bearer-token-for-the-twitter-api
```

</details>

## Author

- Marvin Stickel

## License

[MIT License](/LICENSE)
