# KeTech Backend API

API REST pour la plateforme KeTech - Évaluation technique et recrutement de développeurs africains.

## 🚀 Démarrage rapide

### Prérequis

- Node.js >= 18
- PostgreSQL >= 14
- npm ou yarn

### Installation

1. Installer les dépendances :
```bash
npm install
```

2. Configurer les variables d'environnement :
```bash
cp .env.example .env
# Éditer .env et remplir les valeurs
```

3. Configurer la base de données :
```bash
# Générer le client Prisma
npm run prisma:generate

# Créer les migrations
npm run prisma:migrate
```

4. Lancer le serveur en développement :
```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3001`

## 📁 Structure du projet

```
backend/
├── src/
│   ├── config/          # Configuration
│   ├── controllers/     # Contrôleurs
│   ├── middleware/      # Middlewares
│   ├── models/          # Modèles Prisma
│   ├── routes/          # Routes API
│   ├── services/        # Services métier
│   ├── utils/           # Utilitaires
│   └── server.ts        # Point d'entrée
├── prisma/
│   ├── schema.prisma    # Schéma de base de données
│   └── migrations/      # Migrations
└── uploads/             # Fichiers uploadés
```

## 🔐 Authentification

L'API utilise JWT pour l'authentification. Les tokens sont envoyés dans le header `Authorization: Bearer <token>`

## 📚 Documentation API

L'API expose les endpoints suivants :

- `/api/auth` - Authentification (inscription, connexion)
- `/api/users` - Gestion des utilisateurs
- `/api/developers` - Profils développeurs
- `/api/companies` - Profils entreprises
- `/api/kyc` - Vérification KYC
- `/api/tests` - Tests techniques
- `/api/projects` - Projets collaboratifs
- `/api/jobs` - Offres d'emploi
- `/api/ai` - Services IA (recommandations, matching)

## 🗄️ Base de données

Le projet utilise Prisma ORM avec PostgreSQL.

Pour visualiser la base de données :
```bash
npm run prisma:studio
```

## 🔧 Scripts disponibles

- `npm run dev` - Démarrage en mode développement
- `npm run build` - Compilation TypeScript
- `npm start` - Démarrage en production
- `npm run prisma:generate` - Générer le client Prisma
- `npm run prisma:migrate` - Créer une migration
- `npm run prisma:studio` - Ouvrir Prisma Studio

## 🛡️ Sécurité

- JWT pour l'authentification
- Bcrypt pour le hashage des mots de passe
- Validation des données avec Zod et express-validator
- CORS configuré
- Chiffrement des données sensibles
