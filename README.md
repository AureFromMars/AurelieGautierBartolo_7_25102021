# AurelieGautierBartolo_7_25102021
Ce repository est celui du projet 7 du parcours OpenClassrooms Développeur Web, accesssible publiquement sur github.com en suivant le lien suivant : [https://github.com/AureFromMars/AurelieGautierBartolo_7_25102021](https://github.com/AureFromMars/AurelieGautierBartolo_7_25102021)  
  
## Mission : Créer un réseau social d'entreprise
  
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
[Spécifications fonctionnelles](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Specs_FR_DWJ_VF.pdf)
- Présentation des fonctionnalités simple
- Création de compte simple et possible depuis mobile
- Profil avec peu d'informations pour complétion rapide
- Suppression de compte possible
- Accès à un forum avec publication de contenus multimédias
- Accès à un forum avec publication de textes
- Facilité de repérage des dernières participations
- Modération des interactions par le ou la chargé-e de communication
  
### Fonctionnalités à intégrer
- [9GAG](https://9gag.com/) : les employés partagent et commentent les gifs
- [Reddit](https://www.reddit.com/) : les employés écrivent et/ou partagent des articles sur des sujets qui les intéressent
  
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
  
# Installation complète du site en quelques clics

Outils prérequis :
- Visual Studio Code
- WSL Debian (Windows Subsystem for Linux) ou équivalent
- Commandes de base sous linux
- Node.js

# Installation du backend avec Node.js  
  
ATTENTION, depuis novembre 2021, github communique par protocole SSH !
- lien SSH : [git@github.com:AureFromMars/AurelieGautierBartolo_7_25102021.git](git@github.com:AureFromMars/AurelieGautierBartolo_7_25102021.git)
- lien HTTPS : [https://github.com/AureFromMars/AurelieGautierBartolo_7_25102021.git](https://github.com/AureFromMars/AurelieGautierBartolo_7_25102021.git)

## 1. Créer un fichier avec les variables d'environnement  
- A la racine du backend, renommer le fichier ".env.example" en ".env"
- Renseigner les variables d'environnement avec les données que vous souhaitez

## 2. Installer le serveur Nodemon
```
npm install -g nodemon
```
## 3. Installer le framework Express
[Documentation](http://expressjs.com/fr/)
```
npm install express
```
## 4. Installer l'ORM (Object Relational Mapping) Sequelize MySQL server
[Documentation](https://www.npmjs.com/package/sequelize)
- Installer Sequelize
```
npm install sequelize
```
- Installer Sequelize CLI (Command Line Interface)
```
npm install -dev sequelize-cli
```
## 5. Installer les packages supplémentaires du projet
```
npm install dotenv cors morgan bcrypt crypto-js email-validator password-validator jsonwebtoken multer
```
## 6. Installer MySQL Server
- Installer MySQL :  
https://dev.mysql.com/downloads/installer/ > version community (le second)  
[How to install MySQL community server on Debian](https://linuxconfig.org/how-to-install-mysql-community-server-on-debian-9-stretch-linux)
```
sudo apt update
sudo apt install mysql-community-server
```
- Créer un fichier de migration pour permettre des changements d'état de DB et configurer les allers-retours
```
sequelize model:create --name Groupomania --attributes "name:string, text:text, url:string"
```
## 7. Lancer le serveur Nodemon
- Remplacer node par nodemon à package.json, et l'exécuter avec npm run start
- Lancer le script de lancement du serveur
```
npm run start
```
- Une fois le serveur lancé, merci de commenter les lignes 19 à 21 suivantes dans le fichier backend app.js
```
db.sequelize.sync({alter: true, force: true}).then(() => {
  console.log("Drop and re-sync db.");
});
```
## 8. Utiliser le serveur MySQL
- Lancer MySQL Server depuis le backend
```
mysql -u root -proot
```
- Utiliser le base de données de développement
```
USE dbdev;
```
- Consulter les 4 tables : User, Message, Comment, Liking
```
SELECT * FROM User;
SELECT * FROM Message;
SELECT * FROM Comment;
SELECT * FROM Liking;
```
- Ajouter des droits d'administration à un utilisateur cible (remplacer userId par l'id ciblé)
```
UPDATE User SET isAdmin = true where id= userId;
```
# Installation du frontend avec Vue.js  
```
npm install -g @vue/cli
```
- Se rendre dans le repository
- Se diriger vers le frontend
- Installer Vue.js (choisir version 2)
```
npm install vue
```
- Installer les packages supplémentaires nécessaires au projet
```
npm install vue-router sass sass-loader@^10.2.0 bootstrap axios izitoast
```
