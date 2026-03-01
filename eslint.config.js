const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    {
        ignores: [
            "**/node_modules/**",
            "**/cypress/reports/**",
            "**/cypress/screenshots/**",
            "**/cypress/videos/**",
            "**/.jsons/**",
            "**/mochawesome-report/**",
            "**/mochawesome.json"
        ]
    },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.mocha,
                browser: "readonly",
                $: "readonly",
                "$$": "readonly",
                cy: "readonly",
                Cypress: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error"
        }
    }
];