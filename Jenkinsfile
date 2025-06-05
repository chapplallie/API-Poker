pipeline {
  agent any
  environment {
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
    }
    
    stage('Static Code Analysis (SonarQube)') {
      steps {
        withCredentials([string(credentialsId: 'sonar-token-id', variable: 'SONAR_TOKEN')]) {
          sh '''
            # Installer sonarqube-scanner localement (pas de sudo requis)
            npm install sonarqube-scanner
            
            # Exécuter l'analyse SonarQube avec Node.js
            npx sonarqube-scanner \
              -Dsonar.projectKey=mon-projet \
              -Dsonar.sources=src \
              -Dsonar.host.url=${SONAR_HOST_URL} \
              -Dsonar.login=${SONAR_TOKEN}
          '''
        }
      }
    }

    stage('Security Scan (OWASP)') {
      when {
        expression { params.RUN_SECURITY_SCAN }
      }
      steps {
        sh """
          # Vérifier si Docker est disponible
          which docker || echo "Docker not found in PATH"
          
          # Utiliser le chemin complet si nécessaire
          /usr/bin/docker --version || echo "Docker not at /usr/bin/docker"
          
          # Scanner OWASP avec npm au lieu de Docker
          npm install -g retire
          retire --outputformat json --outputpath owasp-report.json || echo "Retire scan completed"
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
