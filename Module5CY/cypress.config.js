const { defineConfig } = require('cypress');

module.exports = defineConfig({
    chromeWebSecurity: false,
    userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',

    e2e: {
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 10000,

        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
            on('before:browser:launch', (browser = {}, launchOptions) => {
                if (browser.family === 'chromium' && browser.name !== 'electron') {
                    // Force the user agent into the browser launch arguments
                    launchOptions.args.push(
                        '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                    );
                }
                return launchOptions;
            });
        }
    }
});
