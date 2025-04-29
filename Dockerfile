# Utiliser l'image officielle Jenkins Alpine comme base (moins de vulnérabilités)
FROM jenkins/jenkins:2.414.3-alpine

# Passer à l'utilisateur root pour installer Node.js
USER root

# Ajouter Node.js et npm
RUN apt-get update && apt-get install -y \
  nodejs \
  npm

# Revenir à l'utilisateur Jenkins après l'installation
USER jenkins
