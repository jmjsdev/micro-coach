# 🎯 Micro Coach - Application de Suivi d'Habitudes

Application complète de micro-coaching et suivi d'habitudes avec React, Node.js, Prisma et SQLite.

## 📦 Architecture du Projet

Ce projet est un **monorepo** contenant 4 applications :

```
micro-coach/
├── client/          # Application web PWA (React + Vite + Tailwind)
├── admin/           # Panel d'administration (React + Vite)
├── server/          # API Backend (Node.js + Express + Prisma + SQLite)
└── shared/          # Types et utilitaires partagés (TypeScript)
```

## ✨ Fonctionnalités

### 🌟 Application Principale (Client)
- ✅ Landing page moderne et responsive
- 🔐 Authentification (inscription/connexion)
- 📊 Dashboard avec statistiques
- 🎯 Création et gestion d'habitudes
- ✔️ Check-in quotidien avec animations
- 📅 Calendrier visuel de suivi
- 🏆 Système de points et niveaux
- 🎖️ Badges et achievements
- 🤖 **NOUVEAU : Coach IA propulsé par OpenAI GPT-4**
  - 💬 Chatbot assistant 24/7
  - 🧠 Analyse intelligente des habitudes
  - 💡 Conseils motivationnels personnalisés
  - 🎯 Suggestions d'habitudes par IA
  - 📊 Résumés hebdomadaires intelligents
  - 😊 Analyse de sentiment
  - 📋 Générateur de plans d'action
- 📱 PWA (Progressive Web App) - fonctionne offline
- 🎨 Interface moderne avec Tailwind CSS
- ✨ Animations avec Framer Motion
- 🔔 Notifications toast

### 👨‍💼 Panel Admin
- 📈 Statistiques globales
- 👥 Gestion des utilisateurs
- 📊 Tableau de bord analytique (à venir)

### 🔧 Backend API
- 🔒 Authentification JWT
- 📝 CRUD complet pour habitudes
- ✅ Gestion des check-ins
- 🏆 Système d'achievements
- 💾 Base de données SQLite avec Prisma
- 🔄 Relations et validations complètes

## 🚀 Technologies Utilisées

### Frontend
- **React 18** - Framework UI
- **Vite** - Build tool ultra-rapide
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations fluides
- **Zustand** - State management
- **React Router v6** - Navigation
- **React Hook Form + Zod** - Gestion de formulaires et validation
- **Axios** - Client HTTP
- **Lucide React** - Icons modernes
- **Recharts** - Graphiques et visualisations
- **Canvas Confetti** - Effets de célébration

### Backend
- **Node.js + Express** - Serveur API
- **Prisma** - ORM moderne
- **SQLite** - Base de données légère
- **JWT** - Authentification
- **Bcrypt** - Hashage de mots de passe
- **Zod** - Validation des données
- **OpenAI GPT-4** - Intelligence artificielle pour le coaching

## 📋 Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd micro-coach
```

### 2. Installer toutes les dépendances

```bash
npm install
npm run install:all
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `server/` :

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this"
NODE_ENV="development"
PORT=3001
CLIENT_URL="http://localhost:5173"
ADMIN_URL="http://localhost:5174"

# OpenAI (optionnel mais recommandé pour les fonctionnalités IA)
OPENAI_API_KEY="sk-votre-clé-api-openai"
OPENAI_MODEL="gpt-4"
OPENAI_MAX_TOKENS=1000
```

### 4. Initialiser la base de données

```bash
cd server
npx prisma generate
npx prisma db push
npm run seed  # Crée des données de test
```

## 🎮 Lancement de l'Application

### Lancer tout en mode développement (recommandé)

```bash
npm run dev
```

Cela démarre :
- 🌐 Client : http://localhost:5173
- 👨‍💼 Admin : http://localhost:5174
- 🔧 API : http://localhost:3001

### Lancer individuellement

```bash
# Client uniquement
npm run dev:client

# Admin uniquement
npm run dev:admin

# API uniquement
npm run dev:server
```

### Accès Prisma Studio (Base de données UI)

```bash
npm run prisma:studio
```
Ouvert sur http://localhost:5555

## 🔑 Compte de Démonstration

Après avoir exécuté `npm run seed`, utilisez :

- **Email** : demo@microcoach.app
- **Mot de passe** : password123

## 📱 PWA (Progressive Web App)

L'application client est configurée comme PWA :

- ✅ Installable sur mobile et desktop
- ✅ Fonctionne offline
- ✅ Icônes et splash screens
- ✅ Service Worker automatique

Pour tester en mode production :

```bash
cd client
npm run build
npm run preview
```

## 🏗️ Build pour Production

```bash
# Build tout
npm run build

# Build individuellement
npm run build:client
npm run build:admin
npm run build:server
```

## 📁 Structure des Dossiers

### Client
```
client/
├── src/
│   ├── components/      # Composants réutilisables
│   │   ├── ui/         # Composants UI de base
│   │   └── ...         # Composants métier
│   ├── pages/          # Pages de l'application
│   ├── store/          # State management (Zustand)
│   ├── services/       # API calls
│   ├── hooks/          # Custom hooks
│   └── styles/         # Styles globaux
└── public/             # Assets statiques
```

### Server
```
server/
├── src/
│   ├── routes/         # Routes API
│   ├── controllers/    # Logique métier
│   ├── middleware/     # Middlewares (auth, etc.)
│   └── index.ts        # Point d'entrée
└── prisma/
    ├── schema.prisma   # Schéma de base de données
    └── seed.ts         # Données de test
```

## 🎨 Fonctionnalités PWA

- **Manifest** configuré avec icônes et couleurs
- **Service Worker** pour le cache et offline
- **Notifications** (prêt pour push notifications)
- **Installable** sur tous les appareils

## 🔐 Sécurité

- ✅ Mots de passe hashés avec bcrypt
- ✅ Authentification JWT
- ✅ Validation des données avec Zod
- ✅ CORS configuré
- ✅ Variables d'environnement protégées

## 📊 Base de Données

### Modèles principaux

- **User** - Utilisateurs
- **Habit** - Habitudes
- **CheckIn** - Validations quotidiennes
- **Achievement** - Succès débloqués

### Migrations

```bash
cd server
npx prisma migrate dev --name nom_migration
```

## 🧪 Fonctionnalités Clés

### Gamification
- 🎯 Points par check-in (10 pts)
- 📈 Système de niveaux (100 pts/niveau)
- 🏆 9 types d'achievements
- 🔥 Streak tracking (séries)

### Limites
- **Gratuit** : 3 habitudes max
- **Premium** : Habitudes illimitées (à implémenter)

## 🚀 Déploiement

### Client (Vercel/Netlify)
```bash
cd client
npm run build
# Upload dossier dist/
```

### Server (Heroku/Railway/Render)
```bash
cd server
npm run build
# Configure DATABASE_URL et JWT_SECRET
npm start
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche feature
3. Commit vos changements
4. Push et créer une Pull Request

## 📝 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance tout en mode dev |
| `npm run build` | Build toutes les apps |
| `npm run dev:client` | Lance le client uniquement |
| `npm run dev:admin` | Lance l'admin uniquement |
| `npm run dev:server` | Lance l'API uniquement |
| `npm run prisma:studio` | Ouvre Prisma Studio |
| `npm run prisma:migrate` | Crée une migration |

## 🤖 Fonctionnalités IA (OpenAI GPT-4)

L'application intègre un **coach IA intelligent** propulsé par OpenAI GPT-4 :

### ✅ Fonctionnalités Disponibles
- 💬 **Chatbot Coach 24/7** - Assistant personnel toujours disponible
- 🧠 **Analyse d'Habitudes** - Insights intelligents sur vos patterns
- 💡 **Conseils Quotidiens** - Tips personnalisés chaque jour
- 🎯 **Suggestions d'Habitudes** - IA génère des habitudes adaptées à vos objectifs
- 📊 **Résumés Hebdomadaires** - Analyse motivante de votre semaine
- 😊 **Analyse de Sentiment** - Comprend vos émotions dans les notes
- 📋 **Plans d'Action** - Génère des plans structurés pour vos objectifs

### 🚀 Comment Utiliser
1. Obtenez une clé API OpenAI sur https://platform.openai.com/
2. Ajoutez-la dans `server/.env` → `OPENAI_API_KEY="sk-..."`
3. Redémarrez le serveur
4. Accédez à la page **"Coach IA"** dans l'app
5. Profitez du coaching intelligent !

**📚 Documentation complète :** Voir [AI-FEATURES.md](./AI-FEATURES.md)

**💰 Note :** L'utilisation de l'IA nécessite une clé API OpenAI (payante ~$0.50-1/mois par utilisateur actif). L'app fonctionne sans IA mais avec des fonctionnalités de base uniquement.

## 🎯 Roadmap

- [x] 🤖 Coach IA avec OpenAI GPT-4
- [x] 💬 Chatbot assistant intelligent
- [x] 🧠 Analyse d'habitudes par IA
- [x] 🎯 Suggestions personnalisées
- [ ] 🔔 Système de notifications push
- [ ] 👥 Mode social (amis, challenges)
- [ ] 📈 Analytics prédictifs IA
- [ ] 💳 Intégration paiement (Stripe)
- [ ] 📴 Mode hors-ligne complet
- [ ] 📊 Export de données (CSV/PDF)
- [ ] 🎨 Thèmes personnalisés
- [ ] 🌍 Multi-langue (i18n)
- [ ] ⌚ Intégrations wearables

## 📄 Licence

MIT

## 👨‍💻 Auteur

Développé avec ❤️ pour le projet Micro Coach

---

**Bon coaching ! 💪🎯**
