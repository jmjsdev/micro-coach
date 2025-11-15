# 🚀 Guide de Mise en Place Rapide

Ce guide vous permettra de lancer Micro Coach en quelques minutes.

## Étape 1 : Installation des dépendances

```bash
# Installer toutes les dépendances du monorepo
npm install
npm run install:all
```

## Étape 2 : Configuration de la base de données

```bash
# Aller dans le dossier server
cd server

# Générer le client Prisma
npx prisma generate

# Créer la base de données
npx prisma db push

# Seed avec des données de test (optionnel)
npm run seed

# Retour à la racine
cd ..
```

## Étape 3 : Lancer l'application

```bash
# Depuis la racine du projet
npm run dev
```

Cela lancera :
- 🌐 **Client** : http://localhost:5173
- 👨‍💼 **Admin** : http://localhost:5174
- 🔧 **API** : http://localhost:3001

## 🎮 Test de l'Application

### Compte de démonstration

Après le seed, utilisez ces identifiants :

- **Email** : demo@microcoach.app
- **Mot de passe** : password123

### Créer votre propre compte

1. Ouvrez http://localhost:5173
2. Cliquez sur "Commencer" ou "S'inscrire"
3. Remplissez le formulaire
4. Commencez à créer vos habitudes !

## 🔧 Outils Utiles

### Prisma Studio (Interface de base de données)

```bash
npm run prisma:studio
```

Ouvre une interface graphique sur http://localhost:5555 pour voir et éditer vos données.

### Lancer uniquement une partie

```bash
# Seulement le client
npm run dev:client

# Seulement l'admin
npm run dev:admin

# Seulement le serveur
npm run dev:server
```

## 🎯 Prochaines Étapes

1. **Créer votre première habitude**
   - Allez sur le Dashboard
   - Cliquez sur "Nouvelle habitude"
   - Remplissez le formulaire

2. **Explorer les fonctionnalités**
   - Validez une habitude (check-in)
   - Regardez vos statistiques
   - Débloquez des achievements

3. **Tester le PWA**
   - Sur mobile : "Ajouter à l'écran d'accueil"
   - Sur desktop : icône d'installation dans la barre d'adresse

## ⚠️ Problèmes Courants

### Port déjà utilisé

Si un port est occupé, vous pouvez le changer dans :
- Client : `client/vite.config.ts` (port 5173)
- Admin : `admin/vite.config.ts` (port 5174)
- Server : `server/.env` (PORT=3001)

### Erreur Prisma

```bash
cd server
rm -rf node_modules
rm -rf prisma/dev.db
npm install
npx prisma generate
npx prisma db push
```

### Erreur CORS

Vérifiez que les URLs dans `server/.env` correspondent à vos ports :
```env
CLIENT_URL="http://localhost:5173"
ADMIN_URL="http://localhost:5174"
```

## 📱 PWA - Assets à Créer

Pour une PWA complète, créez ces images dans `client/public/` :

- `pwa-192x192.png` (192x192px)
- `pwa-512x512.png` (512x512px)
- `apple-touch-icon.png` (180x180px)
- `favicon.ico`

Vous pouvez utiliser des outils comme :
- https://realfavicongenerator.net/
- https://www.pwa-icon-generator.com/

## 🎨 Personnalisation

### Changer les couleurs

Éditez `client/tailwind.config.js` :
```js
colors: {
  primary: {
    600: '#votre-couleur',
    // ...
  }
}
```

### Modifier le nom de l'app

- `client/index.html` - balise `<title>`
- `client/public/manifest.webmanifest` - champs `name` et `short_name`

## 🚀 C'est parti !

Vous êtes prêt ! Lancez `npm run dev` et commencez à coder ! 💪
