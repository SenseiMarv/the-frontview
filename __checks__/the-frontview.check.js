const { test, expect } = require("@playwright/test");

const targetUrl = process.env.ENVIRONMENT_URL || "https://the-frontview.dev";

const checkHeader = async (page) => {
  expect(await page.locator("header")).toBeVisible();
  expect(await page.locator('header [href="/"]').count()).toBe(2);
  expect(await page.locator('header [href="/posts"]')).toBeVisible();
  expect(await page.locator('header [href="/tags"]')).toBeVisible();
  expect(await page.locator('header [href="/rss.xml"]')).toBeVisible();
  expect(await page.locator("header button")).toBeVisible();
  expect(
    await page.locator(
      'header [href="https://github.com/SenseiMarv/the-frontview"]'
    )
  ).toBeVisible();
};

const checkFooter = async (page) => {
  expect(await page.locator("footer")).toBeVisible();
  expect(await page.locator("footer a")).toBeVisible();
};

test("home page", async ({ page }) => {
  const response = await page.goto(targetUrl, {
    waitUntil: "domcontentloaded",
  });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  await checkHeader(page);
  await checkFooter(page);

  /* Home page content */
  // Multiple h2s are on the page, but `innerText` will only select the first
  expect(await page.innerText("main h2")).toBe("Recent posts");
  expect(await page.locator("main ul")).toBeVisible();
  expect(await page.locator("main a").count()).toBe(9);

  await page.screenshot({ path: "home.png", fullPage: true });
});

test("all posts page", async ({ page }) => {
  const response = await page.goto(`${targetUrl}/posts`, {
    waitUntil: "domcontentloaded",
  });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  await checkHeader(page);
  await checkFooter(page);

  /* All posts page content */
  expect(await page.innerText("main h1")).toBe("All posts");
  expect(await page.locator("main ul")).toBeVisible();

  await page.screenshot({ path: "allPosts.png", fullPage: true });
});

test("post page", async ({ page }) => {
  const response = await page.goto(targetUrl, {
    waitUntil: "domcontentloaded",
  });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  const navigationPromise = page.waitForNavigation({
    waitUntil: "domcontentloaded",
  });
  await page.locator("li a").first().click();
  await navigationPromise;

  await checkHeader(page);
  await checkFooter(page);

  await page.screenshot({ path: "post.png", fullPage: true });
});

test("tags page", async ({ page }) => {
  const response = await page.goto(`${targetUrl}/tags`, {
    waitUntil: "domcontentloaded",
  });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  await checkHeader(page);
  await checkFooter(page);

  /* Tags page content */
  expect(await page.innerText("main h1")).toBe("Tags");
  expect(await page.locator("main ul")).toBeVisible();

  await page.screenshot({ path: "tags.png", fullPage: true });
});

test("tag overview page", async ({ page }) => {
  await page.goto(`${targetUrl}/tags`, { waitUntil: "domcontentloaded" });

  const firstTagName = (await page.innerText("li a")).replace(/\(.*\)/, "");
  const navigationPromise = page.waitForNavigation({
    waitUntil: "domcontentloaded",
  });
  await page.locator("li a").first().click();
  await navigationPromise;

  await checkHeader(page);
  await checkFooter(page);

  /* Tag posts page content */
  expect(await page.innerText("main h1")).toBe(`Tag ${firstTagName}`);
  expect(await page.locator("main ul")).toBeVisible();

  await page.screenshot({ path: "tagsFirst.png", fullPage: true });
});

test("privacy policy page", async ({ page }) => {
  const response = await page.goto(`${targetUrl}/privacy`, {
    waitUntil: "domcontentloaded",
  });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  await checkHeader(page);
  await checkFooter(page);

  /* Privacy policy page content */
  expect(await page.innerText("main h1")).toBe("Privacy policy");
  expect(await page.innerText("main h2")).toBe("Tracking");
  expect(await page.locator("main p").count()).toBe(1);

  await page.screenshot({ path: "privacy.png", fullPage: true });
});

test("rss page", async ({ page }) => {
  const response = await page.goto(`${targetUrl}/rss.xml`, {
    waitUntil: "domcontentloaded",
  });

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  await page.screenshot({ path: "rss.png", fullPage: true });
});
