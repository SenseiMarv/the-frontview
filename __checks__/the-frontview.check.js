const { test, expect } = require("@playwright/test");

const targetUrl =
  process.env.ENVIRONMENT_URL || "https://the-frontview.vercel.app";

test.describe("home page", () => {
  test("renders", async ({ page }) => {
    const response = await page.goto(targetUrl);

    if (response.status() > 399) {
      throw new Error(`Failed with response code ${response.status()}`);
    }

    expect(await page.locator("main ul")).toBeVisible();

    await page.screenshot({ path: "home.png", fullPage: true });
  });

  test("contains header", async ({ page }) => {
    await page.goto(targetUrl);

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
  });

  test("contains footer", async ({ page }) => {
    await page.goto(targetUrl);

    expect(await page.locator("footer")).toBeVisible();
  });
});

test.describe("all posts page", () => {
  test("renders", async ({ page }) => {
    const response = await page.goto(`${targetUrl}/posts`);

    if (response.status() > 399) {
      throw new Error(`Failed with response code ${response.status()}`);
    }

    expect(await page.locator("main ul")).toBeVisible();

    await page.screenshot({ path: "allPosts.png", fullPage: true });
  });

  test("contains header", async ({ page }) => {
    await page.goto(targetUrl);

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
  });

  test("contains footer", async ({ page }) => {
    await page.goto(targetUrl);

    expect(await page.locator("footer")).toBeVisible();
  });
});

test.describe("post page", () => {
  test("renders", async ({ page }) => {
    const response = await page.goto(targetUrl);

    if (response.status() > 399) {
      throw new Error(`Failed with response code ${response.status()}`);
    }

    await page.locator("li a").first().click();

    await page.screenshot({ path: "post.png", fullPage: true });
  });

  test("contains header", async ({ page }) => {
    await page.goto(targetUrl);
    await page.locator("li a").first().click();

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
  });

  test("contains footer", async ({ page }) => {
    await page.goto(targetUrl);
    await page.locator("li a").first().click();

    expect(await page.locator("footer")).toBeVisible();
  });
});

test.describe("tags page", () => {
  test("renders", async ({ page }) => {
    const response = await page.goto(`${targetUrl}/tags`);

    if (response.status() > 399) {
      throw new Error(`Failed with response code ${response.status()}`);
    }

    expect(await page.locator("main ul")).toBeVisible();

    await page.screenshot({ path: "tags.png", fullPage: true });
  });

  test("renders tag overview", async ({ page }) => {
    await page.goto(`${targetUrl}/tags`);

    const firstTagName = (await page.innerText("li a")).replace(/\(.*\)/, "");
    await page.locator("li a").first().click();

    expect(await page.innerText("main h1")).toBe(`Tag ${firstTagName}`);
    expect(await page.locator("main ul")).toBeVisible();

    await page.screenshot({ path: "tagsFirst.png", fullPage: true });
  });

  test("contains header", async ({ page }) => {
    await page.goto(targetUrl);

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
  });

  test("contains footer", async ({ page }) => {
    await page.goto(targetUrl);

    expect(await page.locator("footer")).toBeVisible();
  });
});

test.describe("rss page", () => {
  test("renders", async ({ page }) => {
    const response = await page.goto(`${targetUrl}/rss.xml`);

    if (response.status() > 399) {
      throw new Error(`Failed with response code ${response.status()}`);
    }

    await page.screenshot({ path: "rss.png", fullPage: true });
  });
});
