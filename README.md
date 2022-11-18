# The Frontview

[![Vercel](https://vercelbadge.vercel.app/api/SenseiMarv/the-frontview?style=for-the-badge)](https://vercel.com/senseimarv/the-frontview) [![Checkly](https://api.checklyhq.com/v1/badges/checks/00dcc340-7a1f-4591-8b0f-a0887a26437a?style=for-the-badge&theme=default)](https://app.checklyhq.com/checks/00dcc340-7a1f-4591-8b0f-a0887a26437a/)

> A small personal blog about everything around tech and programming.

[The Frontview](https://the-frontview.dev) | [Google Search Insights](https://search.google.com/search-console/insights/?resource_id=sc-domain%3Athe-frontview.dev&hl=de) | [Plausible](https://analytics.the-frontview.dev/the-frontview.dev) | [Google Search Console](https://search.google.com/search-console?resource_id=sc-domain:the-frontview.dev) | [Ahref Webmaster Tools](https://app.ahrefs.com/dashboard) | [Vercel](https://vercel.com/senseimarv/the-frontview) | [Checkly](https://app.checklyhq.com/checks/00dcc340-7a1f-4591-8b0f-a0887a26437a/) | [DigitalOcean](https://cloud.digitalocean.com/projects/890d1937-03d2-412c-abce-d5207c3d1195/resources?i=defe27) | [Google Domains](https://domains.google.com/registrar/the-frontview.dev?hl=de)

## Requirements

- [Node.js 18](https://nodejs.org/)
- [Yarn 1 (Classic)](https://classic.yarnpkg.com/en/docs/install)

## Getting started

From the root of the project, from a terminal:

1. Run `yarn` to install the required dependencies
2. Run `yarn start` to start a local dev server
3. Access the local dev server at http://localhost:3000

## Commands

All commands are run from the root of the project, from a terminal:

| Command        | Action                                                               |
| :------------- | :------------------------------------------------------------------- |
| `yarn start`   | Starts local dev server at [`localhost:3000`](http://localhost:3000) |
| `yarn lint`    | Runs all linters, showing problems                                   |
| `yarn fixlint` | Runs all linters, trying to fix auto-solvable problems               |
| `yarn build`   | Builds the production site                                           |
| `yarn preview` | Previews the build locally, before deploying                         |
| `yarn prepare` | Installs git hooks                                                   |

## Blog posts

New blog posts can be created by adding a new directory in `./src/pages/posts` and then adding a `index.mdx` inside. The directory name will be the URL path to the new blog post.

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

### Blog components

The following components can be used in MDX files:

````mdx
import { Tweet, YouTube } from "astro-embed";

import Divider from "../../../components/utils/Divider.astro";
import ExternalLink from "../../../components/utils/ExternalLink.astro";
import Icon from "../../../components/utils/Icon.astro";
import Image from "../../../components/utils/Image.astro";

## Table of contents

# List

- Item 1
  - Item 2
- Item 3
- Item 4

# Tasklist

- [x] List item 1
- [x] List item 2
- [ ] List item 3

# Blockquote

> Blockquote

# Panel

!> Here is a tip.

?> And a warning.

x> Or an error.

# Table

| a      |   b    | c      |      d |
| ------ | :----: | :----- | -----: |
| item a | item b | item c | item d |
| item a | item b | item c | item d |
| item a | item b | item c | item d |

# Inline code

Lorem, ipsum `const t = {}` consectetur adipisicing elit.

# Code block

## With language, title and highlighting

```typescript title="examples/index.ts" {1-3,6}
export function absolute(num: number) {
if (num < 0) return num \* -1;
return num;
}
const value = absolute(-1);

export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
const value = absolute(-1);
```

## With language, without title or highlighting

```typescript
export function absolute(num: number) {
if (num < 0) return num \* -1;
return num;
}
const value = absolute(-1);
```

## Without language, title or highlighting

```
export function absolute(num: number) {
if (num < 0) return num \* -1;
return num;
}
const value = absolute(-1);
```

# Footnotes

Note 1[^1]

Note 2[^2]

# Divider

<Divider />

# External link with favicon

<ExternalLink href="https://tailwindcss.com/" favicon>
  TailwindCSS
</ExternalLink>

# Icon

Lorem, ipsum <Icon name="smiling-face-with-smiling-eyes" /> consectetur adipisicing elit.

# Embedded content

## Image

<Image src="https://source.unsplash.com/FCHlYvR5gJI" alt="Programmer">
  Description with support for any `component`
</Image>

## Gif

<Image
  src="https://media.giphy.com/media/oYtVHSxngR3lC/giphy.gif"
  alt="Wow"
  gif
/>

## Youtube

<YouTube id="https://www.youtube.com/watch?v=gxBkghlglTg" />

## Twitter

<Tweet id="https://twitter.com/astrodotbuild/status/1557049466401632256" />

# H1

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo nesciunt ratione, esse odio quaerat praesentium mollitia et rem quidem id temporibus. Sed, in doloremque? Ea ullam voluptates sint est blanditiis.

## H2

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo nesciunt ratione, esse odio quaerat praesentium mollitia et rem quidem id temporibus. Sed, in doloremque? Ea ullam voluptates sint est blanditiis.

### H3

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo nesciunt ratione, esse odio quaerat praesentium mollitia et rem quidem id temporibus. Sed, in doloremque? Ea ullam voluptates sint est blanditiis.

#### H4

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo nesciunt ratione, esse odio quaerat praesentium mollitia et rem quidem id temporibus. Sed, in doloremque? Ea ullam voluptates sint est blanditiis.

##### H5

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo nesciunt ratione, esse odio quaerat praesentium mollitia et rem quidem id temporibus. Sed, in doloremque? Ea ullam voluptates sint est blanditiis.

###### H6

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo nesciunt ratione, esse odio quaerat praesentium mollitia et rem quidem id temporibus. Sed, in doloremque? Ea ullam voluptates sint est blanditiis.

[^1]: Footnote 1
[^2]: Footnote 2
````

## Author

- Marvin Stickel

## Licence

[MIT Licence](/LICENCE)
