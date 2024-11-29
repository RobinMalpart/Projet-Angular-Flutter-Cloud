# ToDoWeb

ToDoWeb est une application web de gestion de tâches développée avec Angular.

## Prérequis

- [Node.js](https://nodejs.org/) (version 16.x ou supérieure)
- [Angular CLI](https://angular.io/cli) (installé globalement avec `npm install -g @angular/cli`)

## Installation

1. **Cloner le dépôt du projet :**

```bash
git clone 
```

2. **Naviguer dans le répertoire du projet :**

```bash
cd to_do_web
```

3. **Installer les dépendances :**

```bash
npm i -g  @angular/cli@16.2.16
npm ci
```

4. **Démarrer le serveur de développement :**

Lancez l'application en mode développement avec la commande :

```bash
ng serve
```

Ouvrez votre navigateur et accédez à http://localhost:4200/.

## Construction du projet

Pour construire le projet pour la production, exécutez :
    
```bash
ng build
```

# Fonctionnalités

- Authentification utilisateur : inscription, connexion et déconnexion.
- Gestion des tâches : création, modification, suppression et marquage des tâches comme terminées.
- Notifications : affichage de messages pour informer l'utilisateur des actions effectuées.
- Synchronisation en direct des taches.

## Technologies utilisées
- Angular 16
- Firebase
- Tailwind CSS / CSS

## Contributeurs
- Robin Malpart
- Sara Bevilacqua
- Julien Chazal
