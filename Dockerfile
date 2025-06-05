# Utiliser l'image officielle Jenkins LTS comme base
FROM jenkins/jenkins:lts

# Passer à l'utilisateur root pour installer Node.js et Docker
USER root

# Mettre à jour les paquets et installer curl, qui est nécessaire pour installer Node.js
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates \
    apt-transport-https \
    software-properties-common

# Ajouter le dépôt de Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

# Installer Node.js et npm
RUN apt-get install -y nodejs

# Installer Docker
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" && \
    apt-get update && \
    apt-get install -y docker-ce-cli

# Créer le groupe docker et ajouter l'utilisateur jenkins
RUN groupadd -f docker && \
    usermod -aG docker jenkins

# Vérification de l'installation de Node.js, npm et Docker
RUN node -v && npm -v && docker --version

# Revenir à l'utilisateur Jenkins après l'installation
USER jenkins
