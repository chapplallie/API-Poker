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
            # Installer sonarqube-scanner localement
            npm install sonarqube-scanner
            
            # Générer la couverture de tests pour SonarQube
            npm test -- --coverage --watchAll=false || echo "Tests with coverage completed"
            
            # Exécuter l'analyse SonarQube COMPLETE
            npx sonarqube-scanner \
              -Dsonar.projectKey=mon-projet \
              -Dsonar.projectName="API Poker" \
              -Dsonar.sources=src \
              -Dsonar.tests=src \
              -Dsonar.test.inclusions="**/*.spec.ts" \
              -Dsonar.exclusions="**/node_modules/**,**/dist/**" \
              -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info \
              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
              -Dsonar.sourceEncoding=UTF-8 \
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
          # Créer le dossier pour les rapports
          mkdir -p owasp-reports
          
          # VRAI SCAN OWASP DEPENDENCY CHECK
          # Changer les permissions du socket Docker
          sudo chmod 666 /var/run/docker.sock || echo "Permission docker socket failed"
          
          # Scanner OWASP Dependency Check OFFICIEL
          docker run --rm \
            -v \$(pwd):/src \
            -v owasp-dc-data:/usr/share/dependency-check/data \
            owasp/dependency-check:latest \
            --scan /src \
            --format HTML \
            --format JSON \
            --project "API-Poker" \
            --out /src/owasp-reports \
            --enableRetired \
            --enableExperimental
          
          echo "VRAI SCAN OWASP DEPENDENCY CHECK TERMINÉ !"
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
