import { expect, test, type Page } from '@playwright/test';

/** Waits for the mobile menu open/close transition to finish. */
async function settleMenu(page: Page) {
  await page.locator('.nav-links').evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
}

/** Waits until the section's top sits just below the sticky header. */
async function expectLandedBelowHeader(page: Page, id: string) {
  const headerHeight = await page.locator('header.site').evaluate((el) => el.getBoundingClientRect().height);
  await expect
    .poll(
      async () => {
        const top = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top);
        return top >= headerHeight - 1 && top <= headerHeight + 40;
      },
      { timeout: 8_000 },
    )
    .toBe(true);
}

test.describe('portfolio smoke', () => {
  test('home renders key landmarks and metadata', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Pratik Pawar/);
    await expect(page.locator('a.skip-link')).toHaveAttribute('href', '#main');
    await expect(page.locator('main#main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: /Built/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Flutter/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /HealthTech/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /pratikpwr\.me/);
    const jsonLd = await page.locator('script[type="application/ld+json"]').evaluate((el) => el.textContent ?? '');
    expect(jsonLd).toContain('"email":"pratiksatishpawar@gmail.com"');
    expect(jsonLd).toContain('Nirmo');
    expect(jsonLd).toContain('GraphQL');
  });

  test('primary navigation anchors exist', async ({ page, isMobile }) => {
    await page.goto('/');
    if (isMobile) await page.getByRole('button', { name: 'Menu' }).click();
    for (const id of ['about', 'build', 'work', 'experience', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
      await expect(page.locator(`.nav-links a[href="#${id}"]`)).toBeVisible();
    }
  });

  test('mobile menu opens, links to every section, and closes after a tap', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile menu only');
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Menu' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('.nav-links a[href="#work"]')).toBeHidden();

    await toggle.click();
    await expect(page.getByRole('button', { name: 'Close' })).toHaveAttribute('aria-expanded', 'true');
    await settleMenu(page);
    await expect(page.locator('.nav-links a[href="#work"]')).toBeVisible();
    await expect(page.locator('.nav-links .nav-resume-mobile')).toBeVisible();

    await page.locator('.nav-links a[href="#work"]').click();
    await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(/#work$/);
    await expectLandedBelowHeader(page, 'work');
  });

  test('anchor links scroll once, without a jump, and land below the sticky header', async ({ page, isMobile }) => {
    await page.goto('/');
    if (isMobile) {
      await page.getByRole('button', { name: 'Menu' }).click();
      await settleMenu(page);
    }
    // Record every scroll position. A native jump followed by a smooth scroll shows up
    // as a large move forward and then a move back.
    await page.evaluate(() => {
      (window as unknown as { positions: number[] }).positions = [];
      addEventListener('scroll', () => (window as unknown as { positions: number[] }).positions.push(scrollY));
    });
    await page.locator('.nav-links a[href="#experience"]').click();
    await expectLandedBelowHeader(page, 'experience');
    const positions = await page.evaluate(() => (window as unknown as { positions: number[] }).positions);
    const movedBack = positions.some((y, i) => i > 0 && y < positions[i - 1] - 1);
    expect(movedBack, 'scroll moved backwards during an anchor scroll').toBe(false);
  });

  test('inner pages link back to home sections', async ({ page }) => {
    await page.goto('/thanks');
    await expect(page.locator('.nav-brand')).toHaveAttribute('href', '/');
    for (const id of ['about', 'build', 'work', 'experience', 'contact']) {
      await expect(page.locator(`.nav-links a[href="/#${id}"]`)).toBeAttached();
    }
  });

  test('page has no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test('social preview image is set and served', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\.jpg$/);
    const response = await request.get('/og.jpg');
    expect(response.status()).toBe(200);
  });

  test('selected work includes Nirmo and project descriptions', async ({ page }) => {
    await page.goto('/');
    const work = page.locator('#work');
    await expect(work.getByRole('heading', { name: 'Nirmo' })).toBeVisible();
    await expect(work.locator('.desc').first()).toBeVisible();
    await expect(work.locator('.desc').first()).not.toBeEmpty();
    await expect(work.getByText(/AI-powered Flutter app builder/i)).toBeVisible();
    await expect(work.locator('a.row[href*="nirmo"]')).toHaveAttribute('rel', /noopener/);
    await expect(work.locator('a.row[href*="nirmo"]')).toHaveAttribute('target', '_blank');
  });

  test('experience summaries are enriched', async ({ page }) => {
    await page.goto('/');
    const xp = page.locator('#experience');
    await expect(xp.locator('p.sum').filter({ hasText: /Consulting-grade software crafting/ })).toBeVisible();
    await expect(xp.locator('p.sum').filter({ hasText: /translating complex requirements/ })).toBeVisible();
    await expect(xp.locator('p.sum').filter({ hasText: /method channels/ })).toBeVisible();
    await expect(xp.locator('p.sum').filter({ hasText: /flavors, analytics, Sentry/ })).toBeVisible();
    await expect(xp.getByRole('heading', { name: 'DreamCare Developers' })).toBeVisible();
    await expect(xp.locator('p.role', { hasText: /^Flutter Developer$/ })).toBeVisible();
  });

  test('developer tools showcase includes Nirmo', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Nirmo/ }).first()).toBeVisible();
  });

  test('about mentions HealthTech and AI tooling', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#about')).toContainText(/HealthTech/);
    await expect(page.locator('#about')).toContainText(/AI agentic tools/);
  });

  test('showcase rail is keyboard reachable on desktop', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop showcase rail only');
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    // Wait for motion enhancement when available
    await page.waitForTimeout(300);
    const rail = page.locator('.rail');
    await expect(rail).toBeVisible();
    const firstTab = rail.getByRole('tab').first();
    await firstTab.focus();
    await expect(firstTab).toBeFocused();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');

    // Arrow keys move to the next territory and scroll the pinned stage to it.
    await page.keyboard.press('ArrowDown');
    const secondTab = rail.getByRole('tab').nth(1);
    await expect(secondTab).toBeFocused();
    await expect(secondTab).toHaveAttribute('aria-selected', 'true', { timeout: 8_000 });
    // Links in hidden scenes must not take keyboard focus.
    await expect(page.locator('[data-scene]').first()).toHaveJSProperty('inert', true);
  });

  test('contact form exposes labels and redirects to thanks', async ({ page }) => {
    await page.goto('/');
    const form = page.getByRole('form', { name: 'Contact form' });
    await expect(form).toBeVisible();
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
    await expect(form.locator('input[name="redirect"]')).toHaveAttribute('value', /\/thanks/);
    const accessKey = form.locator('input[name="access_key"]');
    await expect(accessKey).toHaveCount(1);
    await expect(accessKey).toHaveAttribute('value', /.+/);
    await expect(form.getByRole('button', { name: /Send message/ })).toBeEnabled();
  });

  test('contact form sends with JavaScript and opens the thanks page', async ({ page }) => {
    await page.route('https://api.web3forms.com/submit', async (route) => {
      const body = route.request().postDataJSON();
      expect(body).toMatchObject({ name: 'Test Person', email: 'test@example.com', message: 'Hello' });
      expect(body).not.toHaveProperty('botcheck');
      await route.fulfill({ json: { success: true, message: 'Email sent successfully!' } });
    });
    await page.goto('/');
    await page.getByLabel('Name').fill('Test Person');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Message').fill('Hello');
    await page.getByRole('button', { name: /Send message/ }).click();
    await expect(page).toHaveURL(/\/thanks\/?$/);
    await expect(page.getByRole('heading', { name: 'Message sent.' })).toBeVisible();
  });

  test('contact form shows an error and keeps the message when sending fails', async ({ page }) => {
    await page.route('https://api.web3forms.com/submit', (route) =>
      route.fulfill({ status: 400, json: { success: false, message: 'Invalid access key' } }),
    );
    await page.goto('/');
    await page.getByLabel('Name').fill('Test Person');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Message').fill('Keep this text');
    await page.getByRole('button', { name: /Send message/ }).click();
    await expect(page.getByRole('status').filter({ hasText: 'Invalid access key' })).toBeVisible();
    await expect(page.getByLabel('Message')).toHaveValue('Keep this text');
    await expect(page.getByRole('button', { name: /Send message/ })).toBeEnabled();
  });

  test('thanks and 404 pages render', async ({ page }) => {
    await page.goto('/thanks');
    await expect(page.getByRole('heading', { name: 'Message sent.' })).toBeVisible();

    await page.goto('/404');
    await expect(page.getByRole('heading', { name: /didn’t ship/ })).toBeVisible();
  });

  test('reduced motion keeps content visible', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveClass(/gs/);
    await expect(page.getByRole('heading', { name: /survive production/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible();
  });
});
