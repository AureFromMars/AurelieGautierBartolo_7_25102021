# AurelieGautierBartolo_7_25102021 README global
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
  
# Installation du site

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

## 2. Lancer le serveur
- Se positionner dans le dossier du repository
- Se déplacer dans le dossier du backend
```
cd backend
```
- Lancer le script de lancement du serveur
```
npm run start
```

## 3. Ouvrir le site avec le navigateur
- URL : http://localhost:3000

# BACKEND


# FRONTEND

