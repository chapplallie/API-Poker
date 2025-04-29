# Utiliser l'image officielle Jenkins LTS comme base
FROM jenkins/jenkins:lts

# Passer à l'utilisateur root pour installer Node.js
USER root

# Mettre à jour les paquets et installer curl, qui est nécessaire pour installer Node.js
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates

# Ajouter le dépôt de Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

# Installer Node.js et npm
RUN apt-get install -y nodejs

# Vérification de l'installation de Node.js et npm
RUN node -v && npm -v

# Revenir à l'utilisateur Jenkins après l'installation
USER jenkins
