pipeline {
    agent any

    triggers {
        cron('H */2 * * *')
    }

    tools {
        nodejs 'Node22'
    }

    stages {
        stage('Job 1: API Tests') {
            steps {
                dir('Module6') {
                    echo 'Running API Tests...'
                    sh 'npm ci'
                    sh 'npm run test:api'
                }
            }
        }

        stage('Job 2: UI Tests (Playwright)') {
            steps {
                dir('Module5PW') {
                    echo 'Running UI Tests...'
                    sh 'npm ci'
                    sh 'npx playwright install --with-deps chromium'
                    sh 'npx playwright test --config=src/config/playwright.config.js'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution complete!'
        }
        success {
            echo 'All tests passed successfully!'
        }
        failure {
            echo 'Tests failed. Please check the logs.'
        }
    }
}