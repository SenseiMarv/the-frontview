// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { expect, test } from "@playwright/test";

const targetUrl =
  process.env.ENVIRONMENT_URL || "https://www.the-frontview.dev";

const checkHeader = async (page) => {
  expect(
    await page.getByRole("img", { name: "The Frontview Icon", exact: true })
  ).toBeVisible();
  expect(
    await page.getByRole("heading", { name: "The Frontview", exact: true })
  ).toBeVisible();
  expect(
    await page.getByRole("link", { name: "Home", exact: true })
  ).toBeVisible();
  expect(
    await page.getByRole("link", { name: "All Posts", exact: true }).first()
  ).toBeVisible();
  expect(
    await page.getByRole("link", { name: "Tags", exact: true })
  ).toBeVisible();
  expect(
    await page.getByRole("button", {
      name: "Toggle light/dark theme",
      exact: true,
    })
  ).toBeVisible();
  expect(
    await page.getByRole("link", { name: "RSS feed", exact: true })
  ).toBeVisible();
  expect(
    await page.getByRole("link", { name: "GitHub", exact: true })
  ).toBeVisible();
};

const checkFooter = async (page) => {
  expect(
    await page.getByText("Copyright (c) 2022 Marvin Stickel. MIT License.")
  ).toBeVisible();
  expect(
    await page.getByRole("link", { name: "Privacy policy", exact: true })
  ).toBeVisible();
};

test("home page", async ({ page }) => {
  const response = await page.goto(targetUrl, {
    waitUntil: "domcontentloaded",
  });

  await page.screenshot({ path: "home.png", fullPage: true });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  await checkHeader(page);
  await checkFooter(page);

  /* Home page content */
  // Profile
  expect(
    await page.getByRole("img", { name: "Profile picture" })
  ).toBeVisible();
  expect(await page.getByText("More about me:")).toBeVisible();
  expect(
    await page.getByRole("link", { name: "Favicon GitHub" })
  ).toBeVisible();
  expect(
    await page.getByRole("link", { name: "Favicon LinkedIn" })
  ).toBeVisible();
  expect(await page.getByRole("link", { name: "Favicon Xing" })).toBeVisible();
  expect(
    await page.getByRole("link", { name: "Favicon Instagram" })
  ).toBeVisible();
  expect(
    await page.getByRole("link", { name: "Favicon Spotify" })
  ).toBeVisible();

  // Recent posts
  expect(
    await page.getByRole("heading", { name: "Recent posts" })
  ).toBeVisible();
  expect(await page.getByRole("list")).toBeVisible();
  expect(await page.getByRole("link", { name: "See all posts" })).toBeVisible();
});

test("all posts page", async ({ page }) => {
  const response = await page.goto(`${targetUrl}/posts`, {
    waitUntil: "domcontentloaded",
  });

  await page.screenshot({ path: "allPosts.png", fullPage: true });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  await checkHeader(page);
  await checkFooter(page);

  /* All posts page content */
  expect(await page.getByRole("heading", { name: "All posts" })).toBeVisible();
  expect(await page.getByRole("list")).toBeVisible();
});

test("post page", async ({ page }) => {
  const response = await page.goto(targetUrl, {
    waitUntil: "domcontentloaded",
  });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  const firstPostTitle = await page
    .getByRole("listitem")
    .first()
    .getByRole("heading")
    .nth(1)
    .innerText();
  const navigationPromise = page.waitForNavigation({
    waitUntil: "domcontentloaded",
  });
  await page.getByRole("listitem").first().click();
  const navigationPromiseResponse = await navigationPromise;

  await page.screenshot({ path: "post.png", fullPage: true });

  if (navigationPromiseResponse.status() > 399) {
    throw new Error(
      `Failed with response code ${navigationPromiseResponse.status()}`
    );
  }

  await checkHeader(page);
  await checkFooter(page);

  // Scroll progress
  expect(await page.locator("#scroll-progress")).toHaveClass(/fixed/);

  /* Post page content */
  // Header
  expect(
    await page.getByRole("heading", { name: firstPostTitle })
  ).toBeVisible();
  expect(await page.getByRole("img", { name: "Blogpost cover" })).toBeVisible();

  // Social Media Links
  expect(
    await page.getByRole("link", { name: "Twitter", exact: true })
  ).toHaveCount(2);
  expect(
    await page.getByRole("link", { name: "Mastodon", exact: true })
  ).toHaveCount(2);
  expect(
    await page.getByRole("link", { name: "Facebook", exact: true })
  ).toHaveCount(2);
  expect(
    await page.getByRole("link", { name: "LinkedIn", exact: true })
  ).toHaveCount(2);
  expect(
    await page.getByRole("link", { name: "Xing", exact: true })
  ).toHaveCount(2);

  // Body
  expect(
    await page.getByRole("heading", { name: "Table of contents" })
  ).toBeVisible();
  expect(await page.getByRole("list")).toBeVisible();

  // Comments
  expect(await page.getByTitle("Comments")).toBeVisible();
});

test("blog post components", async ({ page }) => {
  const response = await page.goto(`${targetUrl}/posts/demo`, {
    waitUntil: "domcontentloaded",
  });

  await page.screenshot({ path: "post-demo.png", fullPage: true });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  await checkHeader(page);
  await checkFooter(page);

  // Scroll progress
  expect(await page.locator("#scroll-progress")).toHaveClass(/fixed/);

  /* Post demo page content */
  // Header
  expect(await page.getByRole("heading", { name: "Post Demo" })).toBeVisible();
  expect(await page.getByText("Dec 23, 2022 |")).toBeVisible();
  expect(await page.getByText("2 min read |")).toBeVisible();
  expect(
    await page.getByRole("main").getByRole("link", { name: "post" })
  ).toBeVisible();
  expect(await page.getByText("link", { name: "demo" })).toBeVisible();
  expect(await page.getByText("link", { name: "components" })).toBeVisible();
  expect(await page.getByRole("img", { name: "Blogpost cover" })).toBeVisible();
  expect(await page.getByText("Photo by Daniel Álvasd")).toBeVisible();

  // Social Media Links
  expect(
    await page.getByRole("link", { name: "Twitter", exact: true })
  ).toHaveCount(2);
  expect(
    await page.getByRole("link", { name: "Mastodon", exact: true })
  ).toHaveCount(2);
  expect(
    await page.getByRole("link", { name: "Facebook", exact: true })
  ).toHaveCount(2);
  expect(
    await page.getByRole("link", { name: "LinkedIn", exact: true })
  ).toHaveCount(2);
  expect(
    await page.getByRole("link", { name: "Xing", exact: true })
  ).toHaveCount(2);

  // Table of contents
  expect(
    await page.getByRole("heading", { name: "Table of contents" })
  ).toBeVisible();
  expect(await page.getByRole("list").first()).toBeVisible();
  expect(
    await page.getByRole("list").first().getByRole("listitem")
  ).toHaveCount(23);

  // List
  expect(
    await page.getByRole("heading", { name: "List", exact: true })
  ).toBeVisible();
  expect(await page.getByRole("list").nth(1)).toBeVisible();
  expect(await page.getByRole("list").nth(1).getByRole("listitem")).toHaveCount(
    3
  );

  // Tasklist
  expect(await page.getByRole("heading", { name: "Tasklist" })).toBeVisible();
  expect(await page.getByRole("list").nth(2)).toBeVisible();
  expect(await page.getByRole("list").nth(2).getByRole("listitem")).toHaveCount(
    2
  );

  // Blockquote
  expect(await page.getByRole("heading", { name: "Blockquote" })).toBeVisible();
  expect(
    await page.getByRole("blockquote").filter({ hasText: "Blockquote" })
  ).toBeVisible();

  // Panel
  expect(await page.getByRole("heading", { name: "Panel" })).toBeVisible();
  expect(await page.getByText("Here is a tip.")).toBeVisible();
  expect(await page.getByText("And a warning.")).toBeVisible();
  expect(await page.getByText("Or an error.")).toBeVisible();

  // Table
  expect(
    await page.getByRole("heading", { name: "Table", exact: true })
  ).toBeVisible();
  expect(await page.getByRole("table")).toBeVisible();
  expect(await page.getByRole("row")).toHaveCount(4);

  // Inline code
  expect(
    await page.getByRole("heading", { name: "Inline code" })
  ).toBeVisible();
  expect(
    await page.getByText(
      "Lorem, ipsum const t = {} consectetur adipisicing elit."
    )
  ).toBeVisible();

  // Code block
  expect(await page.getByRole("heading", { name: "Code block" })).toBeVisible();
  expect(
    await page.getByRole("heading", {
      name: "With language, title and highlighting",
    })
  ).toBeVisible();
  expect(await page.getByTitle("examples/index.ts")).toBeVisible();
  expect(
    await page.getByTitle("examples/index.ts").getByText("typescript")
  ).toBeVisible();
  expect(
    await page.getByTitle("examples/index.ts").getByText("examples/index.ts")
  ).toBeVisible();
  expect(
    await page
      .getByTitle("examples/index.ts")
      .getByText("export function absolute(num: number) {")
      .first()
  ).toBeVisible();
  expect(
    await page.getByRole("heading", {
      name: "With language, without title or highlighting",
    })
  ).toBeVisible();
  expect(
    await page
      .getByText(
        "typescriptexport function absolute(num: number) {if (num < 0) return num \\* -1;r"
      )
      .nth(1)
  ).toBeVisible();
  expect(
    await page.getByRole("heading", {
      name: "Without language, title or highlighting",
    })
  ).toBeVisible();
  expect(
    await page.getByText("export function absolute(num: number) {").nth(2)
  ).toBeVisible();

  // Footnotes
  expect(await page.getByRole("heading", { name: "Footnotes" })).toHaveCount(2);
  expect(await page.getByText("Note 11")).toBeVisible();
  expect(await page.getByText("Note 22")).toBeVisible();
  expect(await page.getByText("Footnote 1")).toBeVisible();
  expect(await page.getByText("Footnote 2")).toBeVisible();

  // Divider
  expect(await page.getByRole("heading", { name: "Divider" })).toBeVisible();
  expect(await page.locator(".my-8")).toBeVisible();

  // External link with favicon
  expect(
    await page.getByRole("heading", { name: "External link with favicon" })
  ).toBeVisible();
  expect(
    await page.getByRole("link", { name: "Favicon TailwindCSS" })
  ).toBeVisible();

  // Icon
  expect(
    await page.getByRole("heading", { name: "Icon", exact: true })
  ).toBeVisible();
  expect(
    await page
      .getByRole("paragraph")
      .filter({ hasText: "Lorem, ipsum consectetur adipisicing elit." })
      .locator("svg")
  ).toBeVisible();

  // Embedded content
  expect(
    await page.getByRole("heading", { name: "Embedded content" })
  ).toBeVisible();
  expect(await page.getByRole("heading", { name: "Image" })).toBeVisible();
  expect(await page.getByRole("img", { name: "Programmer" })).toBeVisible();
  expect(
    await page.getByText("Description with support for any component")
  ).toBeVisible();
  expect(
    await page.getByRole("code").filter({ hasText: "component" })
  ).toBeVisible();
  expect(await page.getByRole("heading", { name: "Gif" })).toBeVisible();
  expect(await page.getByRole("img", { name: "Wow" })).toBeVisible();

  // Headings
  expect(await page.getByRole("heading", { name: "H1" })).toBeVisible();
  expect(await page.getByRole("heading", { name: "H2" })).toBeVisible();
  expect(await page.getByRole("heading", { name: "H3" })).toBeVisible();
  expect(await page.getByRole("heading", { name: "H4" })).toBeVisible();
  expect(await page.getByRole("heading", { name: "H5" })).toBeVisible();
  expect(await page.getByRole("heading", { name: "H6" })).toBeVisible();

  // Comments
  expect(await page.getByTitle("Comments")).toBeVisible();
});

test("tags page", async ({ page }) => {
  const response = await page.goto(`${targetUrl}/tags`, {
    waitUntil: "domcontentloaded",
  });

  await page.screenshot({ path: "tags.png", fullPage: true });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  await checkHeader(page);
  await checkFooter(page);

  /* Tags page content */
  expect(await page.getByRole("heading", { name: "Tags" })).toBeVisible();
  expect(await page.getByRole("list")).toBeVisible();
});

test("tag overview page", async ({ page }) => {
  const response = await page.goto(`${targetUrl}/tags`, {
    waitUntil: "domcontentloaded",
  });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  const firstTagName = (
    await page.getByRole("listitem").first().innerText()
  ).replace(/\(.*\)/, "");
  const navigationPromise = page.waitForNavigation({
    waitUntil: "domcontentloaded",
  });
  await page.getByRole("listitem").first().getByRole("link").click();
  const navigationPromiseResponse = await navigationPromise;

  await page.screenshot({ path: "tagsFirst.png", fullPage: true });

  if (navigationPromiseResponse.status() > 399) {
    throw new Error(
      `Failed with response code ${navigationPromiseResponse.status()}`
    );
  }

  await checkHeader(page);
  await checkFooter(page);

  /* Tag posts page content */
  expect(
    await page.getByRole("heading", { name: `Tag ${firstTagName}` })
  ).toBeVisible();
  expect(await page.getByRole("list")).toBeVisible();
});

test("privacy policy page", async ({ page }) => {
  const response = await page.goto(`${targetUrl}/privacy`, {
    waitUntil: "domcontentloaded",
  });

  await page.screenshot({ path: "privacy.png", fullPage: true });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  await checkHeader(page);
  await checkFooter(page);

  /* Privacy policy page content */
  expect(
    await page.getByRole("heading", { name: "Privacy policy" })
  ).toBeVisible();
  expect(await page.getByRole("heading", { name: "Tracking" })).toBeVisible();
  expect(
    await page.getByText(
      "This website is using Plausible Analytics to collect tracking data. This tool is"
    )
  ).toBeVisible();
});

test("rss page", async ({ page }) => {
  const response = await page.goto(`${targetUrl}/rss.xml`, {
    waitUntil: "domcontentloaded",
  });

  await page.screenshot({ path: "rss.png", fullPage: true });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }
});
