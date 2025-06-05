pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonar-token-id')
    SONAR_HOST_URL = 'http://sonarqube:9000'
    DOCKER_IMAGE = "mon-projet:latest"
  }

  parameters {
    string(name: 'BRANCH', defaultValue: 'main', description: 'Branche Git')
    choice(name: 'DEPLOY_ENV', choices: ['staging', 'production'], description: 'Env de déploiement')
    booleanParam(name: 'RUN_SECURITY_SCAN', defaultValue: true, description: 'Scan OWASP ?')
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: "${params.BRANCH}", url: 'https://github.com/chapplallie/API-Poker.git'
      }
    }

    stage('Install & Test') {
      steps {
        sh 'npm ci'
        sh 'npm test'
      }
    }    stage('Static Code Analysis (SonarQube)') {
      steps {
        sh '''
          # Télécharger et installer SonarQube Scanner si pas disponible
          if [ ! -d "sonar-scanner" ]; then
            wget -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-linux.zip
            unzip -q sonar-scanner-cli-4.8.0.2856-linux.zip
            mv sonar-scanner-4.8.0.2856-linux sonar-scanner
          fi
          
          # Exécuter l'analyse SonarQube
          ./sonar-scanner/bin/sonar-scanner \
            -Dsonar.projectKey=mon-projet \
            -Dsonar.sources=src \
            -Dsonar.host.url=$SONAR_HOST_URL \
            -Dsonar.login=$SONAR_TOKEN
        '''
      }
    }

    stage('Security Scan (OWASP)') {
      when {
        expression { params.RUN_SECURITY_SCAN }
      }
      steps {
        sh """
        docker run --rm \
          -v \$(pwd):/src \
          owasp/dependency-check \
          --scan /src --format HTML --project "mon-projet"
        """
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t $DOCKER_IMAGE ."
      }
    }

    stage('Deploy') {
      steps {
        echo "Déploiement vers ${params.DEPLOY_ENV} en cours..."
        // Ajoute ici ton script de déploiement (rsync, SSH, docker push, etc.)
      }
    }
  }

  post {
    always {
      echo 'Analyse terminée, envoi du statut...'
      // Exemple : envoyer statut vers GitHub ou par email
    }
  }
}
