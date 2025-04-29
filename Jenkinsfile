pipeline {
  agent {
    docker {
      image 'node:20'
    }
  }

  environment {
    SONARQUBE_URL = 'http://sonarqube:9000'
    SONAR_TOKEN = credentials('sonarqube-token-id')
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm run test'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('My SonarQube Server') {
          sh 'npx sonar-scanner \
            -Dsonar.projectKey=nest-project \
            -Dsonar.sources=src \
            -Dsonar.host.url=$SONARQUBE_URL \
            -Dsonar.login=$SONAR_TOKEN'
        }
      }
    }
  }
}
