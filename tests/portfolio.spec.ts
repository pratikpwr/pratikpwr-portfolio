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
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /pratikpwr\.me/);
    const jsonLd = await page.locator('script[type="application/ld+json"]').evaluate((el) => el.textContent ?? '');
    expect(jsonLd).toContain('"email":"pratiksatishpawar@gmail.com"');
  });

  test('primary navigation anchors exist', async ({ page }) => {
    await page.goto('/');
    for (const id of ['about', 'build', 'work', 'experience', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
      await expect(page.locator(`.nav-links a[href="#${id}"]`)).toBeVisible();
    }
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
    await expect(form.locator('input[name="access_key"]')).toHaveCount(1);
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
