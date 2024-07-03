# API Hackathon Project

## Description

Ce projet est une API conçue pour un hackathon. Il est construit avec Node.js et Express, suivant une architecture MVC. L'API fournit des fonctionnalités d'authentification et de gestion des utilisateurs.

## Structure du projet

```
api-hackaton-Test/
│
├── config/
│   └── config.json           # Fichier de configuration
│
├── controllers/
│   ├── authController.js     # Contrôleur pour l'authentification
│   └── userController.js     # Contrôleur pour les utilisateurs
│
├── middleware/
│   └── logginCheck.js        # Middleware pour la vérification de connexion
│
├── models/
│   ├── index.js              # Modèle principal
│   ├── session.js            # Modèle pour les sessions
│   └── user.js               # Modèle pour les utilisateurs
│
├── routes/
│   ├── auth.js               # Routes pour l'authentification
│   └── user.js               # Routes pour les utilisateurs
│
├── app.js                    # Point d'entrée de l'application
├── server.js                 # Configuration du serveur
├── .gitignore                # Fichiers et dossiers à ignorer par Git
├── package.json              # Fichier de configuration npm
├── package-lock.json         # Fichier de verrouillage des dépendances npm
└── README.md                 # Documentation du projet
```

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- Node.js
- npm (Node Package Manager)

## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/TechTornadoes/api-hackaton.git
```

2. Naviguez dans le répertoire du projet :

```bash
cd api-hackaton-Test
```

3. Installez les dépendances :

```bash
npm install
```

## Configuration

Assurez-vous de configurer correctement `config/config.json` selon vos besoins.

## Utilisation

Pour démarrer l'application, utilisez la commande suivante :

```bash
npm start
```

Cela lancera le serveur et vous pourrez accéder à l'API via l'URL définie (par défaut, `http://localhost:5000`).

## Routes

### Authentification

- `POST /api/auth/create-session`: Crée une session (utilisée pour le web)
- `POST /api/auth/validate-code`: Valide le code (utilisée pour le mobile)
- `POST /api/auth/authenticate`: Authentifie l'utilisateur (utilisée pour le mobile)
- `GET /api/auth/check-session/:code`: Vérifie la session par code (utilisée pour le web)

### Utilisateurs

- `POST /user`: Crée un nouvel utilisateur
- `GET /user`: Récupère la liste des utilisateurs
- `GET /user/:idUser`: Récupère un utilisateur par son ID

## Scripts npm

- `start`: Démarre l'application en production.
- `dev`: Démarre l'application en mode développement (ajoutez ce script si nécessaire).

