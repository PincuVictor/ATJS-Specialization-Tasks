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
                    bat 'npm ci'
                    bat 'npm run test:api'
                }
            }
        }

        stage('Job 2: UI Tests (Playwright)') {
            steps {
                dir('Module5PW') {
                    echo 'Running UI Tests...'
                    bat 'npm ci'
                    bat 'npx playwright install --with-deps'
                    bat 'npx playwright test --config=src/config/playwright.config.js'
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