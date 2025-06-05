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
          # Scan OWASP Dependency Check avec Docker
          docker run --rm \
            -v \$(pwd):/src \
            -v owasp-cache:/usr/share/dependency-check/data \
            owasp/dependency-check:latest \
            --scan /src \
            --format HTML \
            --format JSON \
            --project "API-Poker" \
            --out /src/owasp-reports \
            --enableRetired
          
          echo "OWASP Dependency Check terminé - vérifiez le dossier owasp-reports/"
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
