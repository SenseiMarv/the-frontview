import { expect, test } from "@playwright/test";

const targetUrl =
  process.env.ENVIRONMENT_URL ?? "https://www.the-frontview.dev";

const checkHeader = async (page) => {
  await expect(
    page
      .getByRole("banner")
      .getByRole("img", { name: "The Frontview Icon", exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("banner")
      .getByRole("heading", { name: "The Frontview", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Home", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Posts", exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("banner")
      .getByRole("link", { name: "Today I Learned", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Tags", exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("banner")
      .getByRole("link", { name: "My Setup", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("banner").getByRole("button", {
      name: "Toggle light/dark theme",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("banner")
      .getByRole("link", { name: "RSS feed", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("banner").getByRole("link").filter({ hasText: "GitHub" }),
  ).toBeVisible();
};

const checkFooter = async (page) => {
  await expect(
    page
      .getByRole("contentinfo")
      .getByText("Copyright (c) 2022 Marvin Stickel. MIT License."),
  ).toBeVisible();
  await expect(
    page.getByRole("contentinfo").getByRole("link", {
      name: "Buy Me a Coffee Icon Buy Me a Coffee",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Privacy policy", exact: true }),
  ).toBeVisible();
};

test("home page", async ({ page }) => {
  await page.goto(targetUrl, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "home.png", fullPage: true });

  await checkHeader(page);
  await checkFooter(page);

  /* Home page content */
  // Profile
  await expect(
    page.getByRole("img", { name: "Profile picture" }),
  ).toBeVisible();
  await expect(page.getByText("More about me:")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Favicon GitHub" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Favicon LinkedIn" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Favicon Xing" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Favicon Instagram" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Favicon Spotify" }),
  ).toBeVisible();

  // Recent posts
  await expect(
    page.getByRole("heading", { name: "Recent posts" }),
  ).toBeVisible();
  await expect(page.getByRole("list").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "See all posts" })).toBeVisible();

  // Recent Today I Learned articles
  await expect(
    page.getByRole("heading", { name: "Recent Today I Learned articles" }),
  ).toBeVisible();
  await expect(page.getByRole("list").nth(1)).toBeVisible();
  await expect(
    page.getByRole("link", { name: "See all Today I Learned articles" }),
  ).toBeVisible();

  // My Setup articles
  await expect(page.getByRole("heading", { name: "My Setup" })).toBeVisible();
  await expect(page.getByRole("list").nth(2)).toBeVisible();
});

test("posts page", async ({ page }) => {
  await page.goto(`${targetUrl}/posts`, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "posts.png", fullPage: true });

  await checkHeader(page);
  await checkFooter(page);

  /* All posts page content */
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
  await expect(page.getByRole("list")).toBeVisible();
});

test("first post page", async ({ page }) => {
  await page.goto(targetUrl, {
    waitUntil: "load",
  });

  const firstPostTitle = await page
    .getByRole("listitem")
    .first()
    .getByRole("heading")
    .nth(1)
    .innerText();
  await page.getByRole("listitem").first().click();
  await page.waitForURL(`${targetUrl}/posts/**`, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "postFirst.png", fullPage: true });

  await checkHeader(page);
  await checkFooter(page);

  // Scroll progress
  await expect(page.locator("#scroll-progress")).toHaveClass(/fixed/);

  /* First post page content */
  // Header
  await expect(
    page.getByRole("heading", { name: firstPostTitle }),
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Blogpost cover" })).toBeVisible();

  // Social Media Links
  await expect(
    page.getByRole("link").filter({ hasText: "Twitter" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "Mastodon" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "Facebook" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "LinkedIn" }),
  ).toHaveCount(2);
  await expect(page.getByRole("link").filter({ hasText: "Xing" })).toHaveCount(
    2,
  );

  // Article
  await expect(page.getByRole("article")).toBeVisible();

  // Comments
  await expect(page.getByTitle("Comments")).toBeVisible();
});

test("learned page", async ({ page }) => {
  await page.goto(`${targetUrl}/learned`, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "learned.png", fullPage: true });

  await checkHeader(page);
  await checkFooter(page);

  /* Today I Learned page content */
  await expect(
    page.getByRole("heading", { name: "Today I Learned" }),
  ).toBeVisible();
  await expect(page.getByRole("list")).toBeVisible();
});

test("first learned page", async ({ page }) => {
  await page.goto(targetUrl, {
    waitUntil: "load",
  });

  const firstLearnedTitle = await page
    .getByRole("list")
    .nth(1)
    .getByRole("listitem")
    .first()
    .getByRole("heading")
    .nth(1)
    .innerText();
  await page.getByRole("list").nth(1).getByRole("listitem").first().click();
  await page.waitForURL(`${targetUrl}/learned/**`, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "learnedFirst.png", fullPage: true });

  await checkHeader(page);
  await checkFooter(page);

  // Scroll progress
  await expect(page.locator("#scroll-progress")).toHaveClass(/fixed/);

  /* First Today I Learned page content */
  // Header
  await expect(
    page.getByRole("heading", { name: firstLearnedTitle }),
  ).toBeVisible();

  // Social Media Links
  await expect(
    page.getByRole("link").filter({ hasText: "Twitter" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "Mastodon" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "Facebook" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "LinkedIn" }),
  ).toHaveCount(2);
  await expect(page.getByRole("link").filter({ hasText: "Xing" })).toHaveCount(
    2,
  );

  // Article
  await expect(page.getByRole("article")).toBeVisible();

  // Comments
  await expect(page.getByTitle("Comments")).toBeVisible();
});

test("setup page", async ({ page }) => {
  await page.goto(`${targetUrl}/setup`, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "setup.png", fullPage: true });

  await checkHeader(page);
  await checkFooter(page);

  /* My Setup page content */
  await expect(page.getByRole("heading", { name: "My Setup" })).toBeVisible();
  await expect(page.getByRole("list")).toBeVisible();
});

test("first setup page", async ({ page }) => {
  await page.goto(targetUrl, {
    waitUntil: "load",
  });

  const firstSetupTitle = await page
    .getByRole("list")
    .nth(2)
    .getByRole("listitem")
    .first()
    .getByRole("heading")
    .nth(1)
    .innerText();
  await page.getByRole("list").nth(2).getByRole("listitem").first().click();
  await page.waitForURL(`${targetUrl}/setup/**`, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "setupFirst.png", fullPage: true });

  await checkHeader(page);
  await checkFooter(page);

  // Scroll progress
  await expect(page.locator("#scroll-progress")).toHaveClass(/fixed/);

  /* First My Setup page content */
  // Header
  await expect(
    page.getByRole("heading", { name: firstSetupTitle }),
  ).toBeVisible();

  // Social Media Links
  await expect(
    page.getByRole("link").filter({ hasText: "Twitter" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "Mastodon" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "Facebook" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "LinkedIn" }),
  ).toHaveCount(2);
  await expect(page.getByRole("link").filter({ hasText: "Xing" })).toHaveCount(
    2,
  );

  // Article
  await expect(page.getByRole("article")).toBeVisible();

  // Comments
  await expect(page.getByTitle("Comments")).toBeVisible();
});

test("components", async ({ page }) => {
  await page.goto(`${targetUrl}/posts/demo`, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "components.png", fullPage: true });

  await checkHeader(page);
  await checkFooter(page);

  // Scroll progress
  await expect(page.locator("#scroll-progress")).toHaveClass(/fixed/);

  /* Post demo page content */
  // Header
  await expect(page.getByRole("heading", { name: "Post Demo" })).toBeVisible();
  await expect(page.getByText("Dec 23, 2022")).toBeVisible();
  await expect(page.getByText("(Updated: Dec 24, 2022)")).toBeVisible();
  await expect(page.getByText("2 min read")).toBeVisible();
  await expect(page.getByRole("link", { name: "demo" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Blogpost cover" })).toBeVisible();
  await expect(page.getByText("Photo by Daniel Álvasd")).toBeVisible();

  // Social Media Links
  await expect(
    page.getByRole("link").filter({ hasText: "Twitter" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "Mastodon" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "Facebook" }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link").filter({ hasText: "LinkedIn" }),
  ).toHaveCount(2);
  await expect(page.getByRole("link").filter({ hasText: "Xing" })).toHaveCount(
    2,
  );

  // Table of contents
  await expect(
    page
      .getByRole("article")
      .getByRole("heading", { name: "Table of contents" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("list").first(),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("list").first().getByRole("listitem"),
  ).toHaveCount(24);

  // List
  await expect(
    page
      .getByRole("article")
      .getByRole("heading", { name: "List", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("list").nth(2),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("list").nth(2).getByRole("listitem"),
  ).toHaveCount(3);

  // Tasklist
  await expect(
    page.getByRole("article").getByRole("heading", { name: "Tasklist" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("list").nth(3),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("list").nth(3).getByRole("listitem"),
  ).toHaveCount(2);

  // Blockquote
  await expect(
    page.getByRole("article").getByRole("heading", { name: "Blockquote" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("article")
      .getByRole("blockquote")
      .filter({ hasText: "Blockquote" }),
  ).toBeVisible();

  // Panel
  await expect(
    page.getByRole("article").getByRole("heading", { name: "Panel" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByText("Here is a tip."),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByText("And a warning."),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByText("Or an error."),
  ).toBeVisible();

  // Table
  await expect(
    page
      .getByRole("article")
      .getByRole("heading", { name: "Table", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("article").getByRole("table")).toBeVisible();
  await expect(page.getByRole("article").getByRole("row")).toHaveCount(4);

  // Inline code
  await expect(
    page.getByRole("article").getByRole("heading", { name: "Inline code" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByText("const t = {}"),
  ).toBeVisible();

  // Code block
  await expect(
    page.getByRole("article").getByRole("heading", { name: "Code block" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("heading", {
      name: "With language, title and highlighting",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByTitle("examples/index.ts"),
  ).toBeVisible();
  await expect(
    page
      .getByRole("article")
      .getByTitle("examples/index.ts")
      .getByText("typescript"),
  ).toBeVisible();
  await expect(
    page
      .getByRole("article")
      .getByTitle("examples/index.ts")
      .getByText("examples/index.ts"),
  ).toBeVisible();
  await expect(
    page
      .getByRole("article")
      .getByTitle("examples/index.ts")
      .getByText("export function absolute(num: number) {")
      .first(),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("heading", {
      name: "With language, without title or highlighting",
    }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("article")
      .getByText(
        "typescriptexport function absolute(num: number) {if (num < 0) return num \\* -1;r",
      )
      .nth(1),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("heading", {
      name: "Without language, title or highlighting",
    }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("article")
      .getByText("export function absolute(num: number) {")
      .nth(2),
  ).toBeVisible();

  // Footnotes
  await expect(
    page.getByRole("article").getByRole("heading", { name: "Footnotes" }),
  ).toHaveCount(2);
  await expect(page.getByRole("article").getByText("Note 11")).toBeVisible();
  await expect(page.getByRole("article").getByText("Note 22")).toBeVisible();
  await expect(page.getByRole("article").getByText("Footnote 1")).toBeVisible();
  await expect(page.getByRole("article").getByText("Footnote 2")).toBeVisible();

  // Divider
  await expect(
    page.getByRole("article").getByRole("heading", { name: "Divider" }),
  ).toBeVisible();
  await expect(page.getByRole("article").locator(".my-8")).toBeVisible();

  // External link with favicon
  await expect(
    page
      .getByRole("article")
      .getByRole("heading", { name: "External link with favicon" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("article")
      .getByRole("link", { name: "Favicon TailwindCSS" }),
  ).toBeVisible();

  // Icon
  await expect(
    page
      .getByRole("article")
      .getByRole("heading", { name: "Icon", exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("article")
      .getByRole("paragraph")
      .filter({ hasText: "Lorem, ipsum" })
      .locator("svg"),
  ).toBeVisible();

  // Embedded content
  await expect(
    page
      .getByRole("article")
      .getByRole("heading", { name: "Embedded content" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("heading", { name: "Image" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("img", { name: "Programmer" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("article")
      .getByText("Description with support for any component"),
  ).toBeVisible();
  await expect(
    page
      .getByRole("article")
      .getByRole("code")
      .filter({ hasText: "component" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("heading", { name: "Gif" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("img", { name: "Wow" }),
  ).toBeVisible();

  // Headings
  await expect(
    page.getByRole("article").getByRole("heading", { name: "H1" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("heading", { name: "H2" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("heading", { name: "H3" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("heading", { name: "H4" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("heading", { name: "H5" }),
  ).toBeVisible();
  await expect(
    page.getByRole("article").getByRole("heading", { name: "H6" }),
  ).toBeVisible();

  // Comments
  await expect(page.getByTitle("Comments")).toBeVisible();
});

test("tags page", async ({ page }) => {
  await page.goto(`${targetUrl}/tags`, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "tags.png", fullPage: true });

  await checkHeader(page);
  await checkFooter(page);

  /* Tags page content */
  await expect(page.getByRole("heading", { name: "Tags" })).toBeVisible();
  await expect(page.getByRole("list")).toBeVisible();
});

test("first tag page", async ({ page }) => {
  await page.goto(`${targetUrl}/tags`, {
    waitUntil: "load",
  });

  const firstTagName = (
    await page.getByRole("listitem").first().innerText()
  ).replace(/\(.*\)/, "");
  await page.getByRole("listitem").first().getByRole("link").click();
  await page.waitForURL(`${targetUrl}/tags/**`, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "tagsFirst.png", fullPage: true });

  await checkHeader(page);
  await checkFooter(page);

  /* First tag page content */
  await expect(
    page.getByRole("heading", { name: `Tag ${firstTagName}` }),
  ).toBeVisible();

  if (
    (await page.getByRole("list").count()) > 0 &&
    (await page.getByRole("list").first().getByRole("listitem").count()) > 0 &&
    (await page.getByRole("list").nth(1).getByRole("listitem").count()) > 0
  ) {
    // Posts and Today I Learned articles exist for this tag
    await expect(
      page.getByRole("heading", { name: "Posts", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Today I Learned articles",
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByRole("list").first()).toBeVisible();
    await expect(page.getByRole("list").nth(1)).toBeVisible();
  } else {
    // Only either posts or Today I Learned articles exist for this tag
    await expect(
      page.getByRole("heading", { name: /(Posts)|(Today I Learned articles)/ }),
    ).toBeVisible();
    await expect(page.getByRole("list")).toBeVisible();
  }
});

test("privacy policy page", async ({ page }) => {
  await page.goto(`${targetUrl}/privacy`, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "privacy.png", fullPage: true });

  await checkHeader(page);
  await checkFooter(page);

  /* Privacy policy page content */
  await expect(
    page.getByRole("heading", { name: "Privacy policy" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tracking" })).toBeVisible();
  await expect(
    page.getByText(
      "This website is using Plausible Analytics to collect tracking data.",
    ),
  ).toBeVisible();
});

test("rss page", async ({ page }) => {
  await page.goto(`${targetUrl}/rss.xml`, {
    waitUntil: "load",
  });

  await page.screenshot({ path: "rss.png", fullPage: true });
});
