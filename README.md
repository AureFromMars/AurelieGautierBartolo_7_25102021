# AurelieGautierBartolo_7_25102021
Ce repository est celui du projet 7 du parcours OpenClassrooms Développeur Web.  
  
Mission : Créer un réseau social d'entreprise
  
## Compétences évaluées
- Authentifier un utilisateur et maintenir sa session
- Personnaliser le contenu envoyé à un client web
- Gérer un stockage de données à l'aide de SQL
- Implémenter un stockage de données sécurisé en utilisant SQL 
  
## Contexte du projet
Développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.  
La directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux !  
Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.  
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.
  
### Exigences client
- Présentation des fonctionnalités simple
- Création de compte simple et possible depuis mobile
- Profil avec peu d'informations pour complétion rapide
- Suppression de compte possible
- Accès à un forum avec publication de contenus multimédias
- Accès à un forum avec publication de textes
- Facilité de repérage des dernières participations
- Modération des interactions par le ou la chargé-e de communication
  
### Fonctionnalités à intégrer
- 9GAG : les employés partagent et commentent les gifs
- Reddit : les employés écrivent et/ou partagent des articles sur des sujets qui les intéressent
  
### Précisions sur la mission
- Réaliser un MPV avec une seule des deux fonctionnalités proposées
- Estimer le temps à passer sur le développement de chaque fonctionnalité
- Organisation agile pour des changements de paramètres réguliers et adaptations au fil de l'eau
- Carte blanche sur la forme
- Base de données relationnelles avec langage SQL pour le stockage des données
- Utilisateur devant pouvoir requêter les données requises depuis SQL
- Utilisateur devant pouvoir soumettre des changements à la base SQL
- Données de connexion SQL sécurisées
- La web app devra pouvoir se connecter et se déconnecter
- La session doit persister pendant que l'utilisateur est connecté
  
### Technologies à utiliser
- Frameword frontend (au choix : React, Vue, Angular, Ember, Meteor, Aurelia...)
- Langage JavaScript (sans framework Symfony)
- Respect des standards WCAG
  
### Ressources fournies
- Spécifications fonctionnelles
- Logos  
  
## Installation complète du site en quelques clics

Outils prérequis :
- Visual Studio Code
- WSL Debian (Windows Subsystem for Linux)
- Commandes de base sous linux


# Installation du BACKEND (pour développeurs)  
  

## 1. Installer le repository github vec Visual Studio Code, Windows Subsystem for Linux et Debian  
(Repository préalablement créé dans gihub)
  
- Ouvrir une fenêtre VS Code
[Installer Visual Studio Code](https://code.visualstudio.com/download)
- Activer WSL Debian
[Installer WSL 2 pour Windows 10](https://docs.microsoft.com/fr-fr/windows/wsl/install)
[Installer Debian GNU/Linux](https://www.microsoft.com/fr-fr/p/debian/9msvkqc78pk6?rtc=1&activetab=pivot:overviewtab)
- Ouvrir le terminal Debian
- Se positionner dans le dossier dans lequel cloner le repository  
Utiliser les commandes de base de linux pour se déplacer dans les dossier et choisir celui où déposer le nouveau repository, exemple : Linux/Debian/var/www/
- Cloner le repository avec la commande suivante :

```
git clone https://github.com/AureFromMars/AurelieGautierBartolo_7_22102021
```
  
## 1. Installer de Node.js  
[Documentation](https://github.com/nodesource/distributions/blob/master/README.md)
- Ouvrir une fenêtre VS Code
- Activer WSL Debian (clic sur le logo en bas à gauche WSL : New WSL Window)
- Ouvrir le terminal (comme pour toutes les commandes suivantes)  
Si node déjà installé, update :  
```
sudo apt update
sudo apt install nodejs npm
```
Sinon :  

```
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

apt-get install -y nodejs
```
- initialiser Node dans le backend
```
npm init
```
  
## 2. Installer nodemon server  
=> Pour surveiller les modifications de fichiers et éviter d'utiliser systématiquement node server
```
npm install -g nodemon
```
- Remplacer node par nodemon à package.json, et l'exécuter avec npm run start
- Lancer le script de lancement du serveur
```
npm run start
```
  
## 3. Installer le framework Express
[Documentation](http://expressjs.com/fr/)
```
npm install express
```
N.B. Dès Express 4.16, bodyparser est inclu, utiliser expression.json() pour analyser le corps d'une requête  

## 4. Installer le SGBD (Système de Gestion de Bases de Données) Sequelize MySQL server
=> Pour manipuler les données d'une base  
- SQL (Structured Query Language)  
= Langage le plus répandu pour interagir avec les bases de données (imposé par la mission, utilisé chez Calinda Software)
- Choix de l'ORM (Object-Relational Mapping)
= Sequelize de Node  

[Documentation](https://www.npmjs.com/package/sequelize)
- Installer Sequelize
```
npm i sequelize
```
- Installer Sequelize CLI (Command Line Interface)
```
npm install -dev sequelize-cli
```
- Configurer Sequelize CLI avec un fichier .sequelizerc à la racine du backend
```
var path = require('path');

module.exports = {
  'config': path.resolve('config/', 'config/config.json'),
  'migrations-path': path.resolve('migrations/', 'migrations'),
  'models-path': path.resolve('models/', 'models')
}
```
- Initialiser Sequelize

## 5. Installer MySQL Server
- Installer MySQL : https://dev.mysql.com/downloads/installer/ > version community (le second)
[How to install MySQL community server on Debian](https://linuxconfig.org/how-to-install-mysql-community-server-on-debian-9-stretch-linux)
```
sudo apt update
sudo apt install mysql-community-server
```
- Créer un fichier de migration pour permettre des changements d'état de DB et configurer les allez-retours
```
sequelize model:create --name Groupomania --attributes "name:string, text:text, url:string"
```
- Lancer MySQL Server
```
mysql -u root -proot
```
### SHORTCUTS DB
```
USE dbdev;
SHOW TABLES;
SHOW COLUMNS FROM User;
SHOW COLUMNS FROM Message;
SELECT * FROM User;
SELECT * FROM Message;
SELECT email FROM users WHERE email ='email@email.com';
DROP TABLE Liking;// Pour supprimer définitivement la table user
DROP TABLE Comment;
DROP TABLE Message;
DROP TABLE User;
```
## 6. Ajouter les packages/extensions Node.js supplémentaires utiles pour le projet
- dot env pour travailler avec les variables d'environnement (globales, pour éviter d'avoir à tout éditer si besoin : URL, mots de passe, id, chemins d'accès aux fichiers, et données sécurisées (token, clés d'API, etc.)) : npm install dotenv
- cors pour éviter d'avoir à écrire tous les headers : npm install cors
- morgan pour logger les requêtes middleware HTTP : npm install morgan
- bcrypt pour hasher le password : npm install bcrypt
- crypto-js pour chiffrer l'email avec un haut niveau de sécurité (résultat très long avec 256) : npm install crypto-js voir pour hmac-sha256 ???
- npm install email-validator ################################################
- password-validator pour obliger à créer un mot de passe fort : npm install password-validator
- jsonwebtoken pour créer des tokens d'authentification : npm install jsonwebtoken
- npm install multer ################################################

# Exécuter des requêtes avec POSTMAN
- Télécharger POSTMAN
- Envoyer une requête en JSON : Body > raw > choisir JSON au lieu de text
- Exemples :


# Installer le FRONTEND

## 1. Installer Vue.JS et les packages utiles  
- npm install -g @vue/cli pour le CLI global
- vue create frontend
- npm install vue (choisir version 2)
- npm install vue-router // A SUPPRIMER DU PACKAGE GLOBAL ????
- npm install sass
- npm install sass-loader@^10.2.0
- npm install bootstrap
- npm install axios




- Fenêtre VS Code d'erreur manque fichier avec path : A AJOUTER ????????????????????????????
https://vuejs.github.io/vetur/guide/FAQ.html#vetur-can-t-find-tsconfig-json-jsconfig-json-in-xxxx-xxxxxx

## 2. Créer les dossiers