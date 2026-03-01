pipeline {
    agent any

    triggers {
        cron('H */2 * * *')
    }

    tools {
        nodejs 'Node22'
    }
        stages {
        stage('Job 1: UI Tests (Parallel Execution)') {
            parallel {
                stage('Cucumber BDD (Module 7)') {
                    steps {
                        dir('Module7') {
                            bat 'npm ci'
                            bat 'npx playwright install --with-deps'
                            bat 'npm run test:chrome'
                        }
                    }
                }
                stage('Playwright (Module 5)') {
                    steps {
                        dir('Module5PW') {
                            bat 'npm ci'
                            bat 'npx playwright install --with-deps'
                            bat 'npx playwright test --config=src/config/playwright.config.js --project=chromium'
                        }
                    }
                }
                stage('WebdriverIO (Module 4)') {
                    steps {
                        dir('Module4') {
                            bat 'npm ci'
                            bat 'npm run wdio'
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution complete!'
        }
        success {
            echo 'All tests across all frameworks passed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the stage logs.'
        }
    }
}