import { expect, test } from '@playwright/test';

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

  test('primary navigation anchors exist', async ({ page }) => {
    await page.goto('/');
    for (const id of ['about', 'build', 'work', 'experience', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
      await expect(page.locator(`.nav-links a[href="#${id}"]`)).toBeVisible();
    }
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
