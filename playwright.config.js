const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to your HTML file
  await page.goto('C:\Users\harrison\Desktop\IS601_Final\index.html');
  await page.goto('C:\Users\harrison\Desktop\IS601_Final\Login.html');
  await page.goto('C:\Users\harrison\Desktop\IS601_Final\Shipping.html');
  await page.goto('C:\Users\harrison\Desktop\IS601_Final\Support.html');
  await page.goto('C:\Users\harrison\Desktop\IS601_Final\Tracking.html');
  await page.goto('/Users/tracyharrison/Documents/GitHub/IS601_Final/hoursandlocations.html');

  // Test cookie consent banner visibility
  const cookieConsentBanner = await page.$('#cookieConsent');
  expect(cookieConsentBanner).not.toBeNull();

  // Test navigation links
  await page.click('a[href="/Shipping.html"]');
  // Add more navigation link tests as needed

  // Test search input and button
  await page.type('.search-input', 'test tracking number');
  await page.click('.search-button');

  // Test form submission
  await page.type('#mce-EMAIL', 'test@example.com');
  await page.click('#mc-embedded-subscribe');

  // Test footer social media links
  await page.click('a[href="http://www.facebook.com"]');
  await page.click('a[href="http://www.twitter.com"]');
  await page.click('a[href="http://www.linkedin.com.com"]');
  await page.click('a[href="http://www.instagram.com"]');

  // Fill in the login form
  await page.fill('#username', 'your_username');
  await page.fill('#password', 'your_password');

  // Click the login button
  await page.click('button');

  // Wait for the success message to appear
  await page.waitForSelector('#message');

  // Get the text content of the success message
  const successMessage = await page.textContent('#message');

  // Check if the success message is as expected
  expect(successMessage).toContain('Login successful');

// Test the content of the hero section
const heroText = await page.textContent('.hero-text');
expect(heroText).toContain('WeShipIt online shipping tools options');

// Test the content of the second text section
const secondText = await page.textContent('.font-abril-fatface.text-gray-400.text-24');
expect(secondText).toContain('Please choose which WeShipIt online shopping tool you want to access:');

// Test the presence of two sections with shipping options
const shippingOptionsSections = await page.$$('.max-w-md.mx-auto.bg-white.p-6.rounded-md.shadow-md');
expect(shippingOptionsSections.length).toBe(2);

// Test the content of the first shipping options section
const firstShippingOptionsText = await shippingOptionsSections[0].textContent('h2');
expect(firstShippingOptionsText).toContain('WeShipIt Manager - Account Holders');

// Test the content of the second shipping options section
const secondShippingOptionsText = await shippingOptionsSections[1].textContent('h2');
expect(secondShippingOptionsText).toContain('WeShipIt Manager - Guests');

 // Test form submission for each feedback type
 const feedbackTypes = ['Track', 'Account', 'Pickup'];

 for (const feedbackType of feedbackTypes) {
   // Select feedback type
   await page.selectOption('#feedbackType', feedbackType);

   // Type feedback message
   await page.fill('#feedbackMessage', 'Test feedback message for ' + feedbackType);

   // Submit form
   await page.click('button[type="submit"]');

   // Wait for the submission message
   await page.waitForSelector('#submissionMessage');

   // Get the text content of the submission message
   const submissionMessage = await page.textContent('#submissionMessage');

   // Check if the submission message contains the expected text
   switch (feedbackType) {
     case 'Track':
       expect(submissionMessage).toContain('Your package will arrive');
       break;
     case 'Account':
       expect(submissionMessage).toContain('We will check your account information');
       break;
     case 'Pickup':
       expect(submissionMessage).toContain('We can discuss package pickup');
       break;
     default:
       expect(submissionMessage).toBe('');
   }

   // Clear feedback message for the next iteration
   await page.fill('#feedbackMessage', '');

   // Reset the form
   await page.click('a[href="/Support.html"]');
 }
// Test search functionality
const searchTestData = [
  { selector: 'input[placeholder="Search Tracking Number"]', buttonText: 'Your package will arrive Wednesday, 9:00am' },
  { selector: 'input[placeholder="Search by Reference Number"]', buttonText: 'Your package will arrive Monday, 2:00pm' },
  { selector: 'input[placeholder="Search by TCN"]', buttonText: 'Your package will arrive Tuesday, 1:00pm' },
  { selector: 'input[placeholder="Proof of Delivery"]', buttonText: 'Here is your proof of delivery -> Package delivered 2:00pm on Thursday' },
];
for (const testData of searchTestData) {
  // Type into the search input
  await page.type(testData.selector, 'Test input');

  // Click the search button
  await page.click(`button[onclick="showOutput('${testData.buttonText}')"]`);

  // Wait for the output element
  await page.waitForSelector('#output');

  // Get the text content of the output element
  const outputText = await page.textContent('#output');

  // Check if the output text contains the expected text
  expect(outputText).toContain(`Your feedback -> ${testData.buttonText}`);

  // Clear the search input for the next iteration
  await page.fill(testData.selector, '');

  // Test for the existence of elements
  await page.waitForSelector('h1:has-text("Business Hours and Locations")');
  await page.waitForSelector('table:has-text("Monday")');
  await page.waitForSelector('table:has-text("Philadelphia")');

}
  // Close the browser
  await browser.close();
})();

//  Run your local dev server before starting the tests */
  webServer: {
     command: 'npm run start',
     url: 'http://127.0.0.1:3000',
     reuseExistingServer: !process.env.CI,
   },
});
