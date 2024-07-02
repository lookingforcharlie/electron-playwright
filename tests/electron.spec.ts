import { expect, test } from '@playwright/test'
import { _electron as electron } from 'playwright'

test.describe('Electron application tests', () => {
  test('should open an Electron window', async () => {
    // Launch Electron with your application
    const electronApp = await electron.launch({
      args: ['dist-electron/main.js'], // Path to your main Electron file
    })

    // Get a handle for the Electron application
    const appWindow = await electronApp.firstWindow()

    // Test window properties
    await expect(appWindow.title()).resolves.toContain('Henrietta')

    await expect(appWindow.locator('text=Home')).toBeVisible()

    // Test for specific elements
    // await expect(appWindow.locator('text=HomePage')).toHaveCount(1)

    // Ensure the Home button is visible and click it
    const homeButton = appWindow.locator('text=Home')
    await homeButton.waitFor({ state: 'visible', timeout: 5000 })
    await homeButton.click()

    // Verify that the HomePage text appears, indicating successful navigation
    const homePageText = appWindow.locator('text=Home Sweet Home')
    await expect(homePageText).toBeVisible()

    // Close the Electron app
    await electronApp.close()
  })
})
