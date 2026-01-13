# Guide de démarrage - KeTech Backend

## 📋 Vue d'ensemble

Le backend KeTech est une API REST construite avec Node.js, Express, TypeScript et Prisma ORM avec PostgreSQL.

## 🛠️ Installation et configuration

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Configurer PostgreSQL

Assurez-vous d'avoir PostgreSQL installé et en cours d'exécution. Créez une base de données :

```sql
CREATE DATABASE ketech;
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du dossier `backend` :

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ketech?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# OpenAI API (pour le système IA)
OPENAI_API_KEY=your-openai-api-key

# Frontend URL (pour CORS)
FRONTEND_URL=http://localhost:3000
```

**⚠️ Important :** Remplacez les valeurs par vos propres configurations, surtout `JWT_SECRET` et `OPENAI_API_KEY`.

### 4. Générer le client Prisma

```bash
npm run prisma:generate
```

### 5. Créer les migrations de base de données

```bash
npm run prisma:migrate
```

### 6. (Optionnel) Visualiser la base de données

```bash
npm run prisma:studio
```

Cela ouvre Prisma Studio sur `http://localhost:5555` où vous pouvez explorer et gérer vos données.

### 7. Lancer le serveur en développement

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3001`

## 📚 Endpoints API disponibles

### Authentification (`/api/auth`)

- `POST /api/auth/register/developer` - Inscription développeur
- `POST /api/auth/register/company` - Inscription entreprise
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Obtenir l'utilisateur actuel (nécessite authentification)

### KYC (`/api/kyc`)

- `POST /api/kyc` - Créer/mettre à jour une demande KYC (nécessite authentification, upload de documents)
- `GET /api/kyc/status` - Obtenir le statut KYC (nécessite authentification)
- `GET /api/kyc/all` - Obtenir toutes les demandes KYC (admin uniquement)
- `PATCH /api/kyc/:kycId/verify` - Vérifier une demande KYC (admin uniquement)

### IA (`/api/ai`)

- `GET /api/ai/projects/recommendations` - Recommandations de projets (développeurs uniquement)
- `GET /api/ai/collaborators/recommendations` - Recommandations de collaborateurs (développeurs uniquement)
- `GET /api/ai/technologies/suggestions` - Suggestions de technologies à apprendre (développeurs uniquement)

## 🔐 Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification. Après inscription ou connexion, vous recevrez un token que vous devez inclure dans le header `Authorization` :

```
Authorization: Bearer <votre-token-jwt>
```

## 📝 Exemples d'utilisation

### Inscription développeur

```bash
curl -X POST http://localhost:3001/api/auth/register/developer \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dev@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Connexion

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dev@example.com",
    "password": "password123"
  }'
```

### Obtenir l'utilisateur actuel

```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer <votre-token>"
```

### Soumettre une demande KYC

```bash
curl -X POST http://localhost:3001/api/kyc \
  -H "Authorization: Bearer <votre-token>" \
  -F "firstName=John" \
  -F "lastName=Doe" \
  -F "dateOfBirth=1990-01-01" \
  -F "idType=NATIONAL_ID" \
  -F "idNumber=123456789" \
  -F "idDocumentFront=@/path/to/front.jpg" \
  -F "idDocumentBack=@/path/to/back.jpg"
```

## 🗄️ Structure de la base de données

Le schéma Prisma définit les modèles suivants :

- **User** - Utilisateurs de base (développeurs et entreprises)
- **DeveloperProfile** - Profils développeurs avec compétences, scores, etc.
- **CompanyProfile** - Profils entreprises
- **KYC** - Demandes de vérification d'identité
- **UserKeys** - Système de Keys pour postuler aux jobs
- **Test** - Tests techniques créés par les entreprises
- **TestSubmission** - Soumissions de tests par les développeurs
- **Project** - Projets collaboratifs
- **Job** - Offres d'emploi
- **JobApplication** - Candidatures aux jobs
- **Collaboration** - Demandes de collaboration entre développeurs
- **Hackathon** - Hackathons organisés par les entreprises
- Et plus...

## 🤖 Système IA

Le système IA utilise l'API OpenAI (ChatGPT) pour :

1. **Recommandations de projets** - Suggérer des projets adaptés au profil d'un développeur
2. **Matching de collaborateurs** - Trouver des développeurs compatibles pour collaborer
3. **Suggestions de technologies** - Recommander des technologies à apprendre

Si l'API OpenAI n'est pas configurée, le système utilise des algorithmes de fallback basés sur les compétences et les niveaux.

## 🔧 Scripts disponibles

- `npm run dev` - Démarrage en mode développement (watch mode)
- `npm run build` - Compilation TypeScript
- `npm start` - Démarrage en production
- `npm run prisma:generate` - Générer le client Prisma
- `npm run prisma:migrate` - Créer/exécuter les migrations
- `npm run prisma:studio` - Ouvrir Prisma Studio
- `npm run lint` - Linter le code

## 📁 Structure du projet

```
backend/
├── src/
│   ├── config/          # Configuration (database, env)
│   ├── controllers/     # Contrôleurs (auth, kyc, ai)
│   ├── middleware/      # Middlewares (auth, error, upload, validate)
│   ├── routes/          # Routes API (auth.routes, kyc.routes, ai.routes)
│   ├── services/        # Services métier (auth.service, kyc.service, ai.service)
│   ├── utils/           # Utilitaires (jwt, password, errors)
│   └── server.ts        # Point d'entrée du serveur
├── prisma/
│   └── schema.prisma    # Schéma de base de données
├── uploads/             # Fichiers uploadés (KYC documents, etc.)
└── package.json
```

## ⚠️ Notes importantes

1. **Sécurité** : Changez le `JWT_SECRET` en production !
2. **Base de données** : Assurez-vous que PostgreSQL est en cours d'exécution avant de lancer les migrations
3. **Uploads** : Les fichiers uploadés sont stockés dans `backend/uploads/`. Assurez-vous que ce dossier existe et a les bonnes permissions.
4. **IA** : L'API OpenAI est optionnelle. Si elle n'est pas configurée, le système utilise des algorithmes de fallback.

## 🚀 Prochaines étapes

Le backend actuel inclut :

✅ Authentification (inscription développeur/entreprise, connexion)
✅ Système KYC (upload documents, vérification statut)
✅ Services IA (recommandations, matching)

À implémenter (selon le cahier des charges) :

- Routes pour les profils développeurs (CRUD)
- Routes pour les profils entreprises (CRUD)
- Routes pour les tests techniques (CRUD, soumissions)
- Routes pour les projets collaboratifs (CRUD)
- Routes pour les jobs (CRUD, candidatures)
- Routes pour les hackathons
- Routes pour les collaborations
- Routes pour le système de Keys
- Et plus...

## 📞 Support

Pour toute question ou problème, consultez la documentation Prisma : https://www.prisma.io/docs
