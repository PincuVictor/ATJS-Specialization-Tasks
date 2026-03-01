const { defineConfig } = require('cypress');

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
        baseUrl: 'https://practicesoftwaretesting.com',
        userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        chromeWebSecurity: false,
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 10000,
        requestTimeout: 10000,
        video: false,
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
        }
    }
});
