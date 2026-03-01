module.exports = {
    default: {
        require: ['src/support/**/*.js'],
        format: [
            'progress',
            'html:reports/cucumber-report.html',
            'json:reports/cucumber-report.json'
        ],
        paths: ['src/features/**/*.feature'],
        publishQuiet: true
    }
};