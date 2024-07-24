pipeline {
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright:v1.45.1-focal'
    } 
  }
  stages {
    stage('install playwright') {
      steps {
        bat '''
          npm i -D @playwright/test
          npx playwright install
        '''
      }
    }
    stage('help') {
      steps {
        bat 'npx playwright test --help'
      }
    }
    stage('test') {
      steps {
        bat '''
          npx playwright test --list
          npx playwright test
        '''
      }
      post {
        success {
          archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
          bat 'rm -rf *.png'
        }
      }
    }
  }
}