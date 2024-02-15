import { browser } from 'k6/experimental/browser';
import { check } from 'k6';

// We need ENV variable -> K6_BROWSER_ENABLED=true 
// Breaking changes v0.46.0
export const options = {
  stages: [
    // We need 3 stages
    { duration: '10s', target: 10 },
    { duration: '15s', target: 40 },
    { duration: '10s', target: 0 }
  ],
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
}

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    check(page, {
      header: page.locator('h2').textContent() == 'Welcome, admin!',
    });
  } finally {
    page.close();
  }
}
