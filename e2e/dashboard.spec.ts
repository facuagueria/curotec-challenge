import { test, expect } from '@playwright/test'

test.describe('Dashboard View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display dashboard title', async ({ page }) => {
    await expect(page.getByText('Dashboard')).toBeVisible()
  })

  test('should show loader initially', async ({ page }) => {
    await expect(page.getByTestId('app-loader')).toBeVisible()
  })

  test('should display dashboard components after loading', async ({ page }) => {
    await expect(page.getByText('Total Movies')).toBeVisible()
    await expect(page.getByText('Movies by Rating')).toBeVisible()
    await expect(page.getByText('Movies by Year')).toBeVisible()
  })

  test('should display charts', async ({ page }) => {
    await expect(page.locator('#movies-by-rating')).toBeVisible()
    await expect(page.locator('#movies-by-year')).toBeVisible()
  })
})
