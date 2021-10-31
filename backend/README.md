
# AurelieGautierBartolo_7_22102021 README backend

Ce repository backend est celui du projet 6 du parcours OpenClassrooms Développeur Web.

Outils prérequis :
- Visual Studio Code
- WSL Debian (Windows Subsystem for Linux)
- Commandes de base sous linux

# Installation du backend avec Debian

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

## 3. Installer le framework Express
[Documentation](http://expressjs.com/fr/)
```
npm install express
```
N.B. Dès Express 4.16, bodyparser est inclu, utiliser expression.json() pour analyser le corps d'une requête  

## 4. Installer le SGBD (Système de Gestion de Bases de Données) 
=> Pour manipuler les données d'une base  
  
### 1. Choix du serveur MySQL server
- SQL (Structured Query Language)  
= Langage le plus répandu pour interagir avec les bases de données (imposé par la mission, utilisé chez Calinda Software)
- Choix de l'ORM (Object-Relational Mapping)
= Sequelize de Node  
=> Choix de PostgreSQL, utilisé chez Calinda Software, opensource et suit la syntaxe SQL de très près

### 2. Installer Sequelize MySQL server
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

### 3. Installer MySQL Server
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

## 5. Ajouter les packages/extensions Node.js utiles pour le projet
- dot env pour travailler avec les variables d'environnement (globales, pour éviter d'avoir à tout éditer si besoin : URL, mots de passe, id, chemins d'accès aux fichiers, et données sécurisées (token, clés d'API, etc.)) : npm install dotenv
- cors pour éviter d'avoir à écrire tous les headers : npm install cors
- morgan pour logger les requêtes middleware HTTP : npm install morgan
- bcrypt pour hasher le password : npm install bcrypt
- crypto-js pour chiffrer l'email avec un haut niveau de sécurité (résultat très long avec 256) : npm install crypto-js voir pour hmac-sha256 ???
- npm install email-validator ################################################
- password-validator pour obliger à créer un mot de passe fort : npm install password-validator
- jsonwebtoken pour créer des tokens d'authentification : npm install jsonwebtoken



# BDD

- Télécharger MySQL Workbench pour designer facilement la BDD

## POSTMAN
- Télécharger POSTMAN
- Envoyer une requête en JSON : Body > raw > choisir JSON au lieu de text






mysql -u root -proot
USE dbdev;
SHOW TABLES;
SHOW COLUMNS FROM user;
SELECT * FROM users;
SELECT email FROM users WHERE email ='email@email.com';

DROP TABLE user; // Pour supprimer définitivement la table user

MANQUE UNIQUE VALIDATOR pour l'email