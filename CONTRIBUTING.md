# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à Micro Coach ! Ce document vous guide dans le processus de contribution.

## 🌟 Comment Contribuer

### Signaler un Bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les Issues
2. Créez une nouvelle Issue avec le template "Bug Report"
3. Incluez :
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs actuel
   - Screenshots si applicable
   - Environnement (OS, navigateur, version Node)

### Proposer une Fonctionnalité

1. Créez une Issue avec le template "Feature Request"
2. Décrivez :
   - Le problème que ça résout
   - La solution proposée
   - Les alternatives considérées

### Soumettre du Code

1. **Fork** le projet
2. **Clone** votre fork :
   ```bash
   git clone https://github.com/votre-username/micro-coach.git
   ```

3. **Créez une branche** :
   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
   ```

4. **Faites vos modifications** en suivant les standards du projet

5. **Commit** vos changements :
   ```bash
   git commit -m "feat: ajout de la fonctionnalité X"
   ```

6. **Push** vers votre fork :
   ```bash
   git push origin feature/ma-nouvelle-fonctionnalite
   ```

7. **Ouvrez une Pull Request** vers la branche `main`

## 📝 Standards de Code

### Commits

Utilisez les [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `docs:` documentation
- `style:` formatage, point-virgules manquants, etc.
- `refactor:` refactoring du code
- `test:` ajout de tests
- `chore:` mise à jour des dépendances, etc.

Exemples :
```bash
feat: add user profile customization
fix: resolve authentication token expiry issue
docs: update README with deployment instructions
```

### TypeScript

- Utilisez TypeScript strict mode
- Définissez des types explicites
- Évitez `any`, préférez `unknown`
- Utilisez les types de `@shared` quand possible

### React

- Utilisez les functional components
- Préférez les hooks aux class components
- Nommage : PascalCase pour les composants
- Un composant = un fichier

### Style

- Tailwind CSS pour le styling
- Pas de CSS inline sauf pour les styles dynamiques
- Utilisez les classes utilitaires Tailwind

## 🏗️ Architecture

### Organisation des Fichiers

```
client/src/
├── components/
│   ├── ui/           # Composants UI réutilisables
│   └── [Feature]/    # Composants spécifiques à une fonctionnalité
├── pages/            # Pages de l'application
├── services/         # API calls
├── store/            # State management
└── hooks/            # Custom hooks
```

### Ajout d'un Nouveau Composant

1. Créez le fichier dans le bon dossier
2. Exportez-le depuis `index.ts` si applicable
3. Ajoutez les props TypeScript
4. Documentez avec des commentaires JSDoc si complexe

### Ajout d'une Nouvelle Route API

1. Créez le controller dans `server/src/controllers/`
2. Créez les routes dans `server/src/routes/`
3. Enregistrez les routes dans `server/src/index.ts`
4. Ajoutez la fonction API dans `client/src/services/api.ts`

### Modification du Schéma de Base de Données

1. Modifiez `server/prisma/schema.prisma`
2. Créez une migration :
   ```bash
   cd server
   npx prisma migrate dev --name nom_de_la_migration
   ```
3. Mettez à jour les types dans `shared/src/types/`

## 🧪 Tests

Pour le moment, pas de tests automatisés configurés, mais vous pouvez :

1. Tester manuellement toutes les fonctionnalités affectées
2. Vérifier que l'application build sans erreurs :
   ```bash
   npm run build
   ```

## 📚 Documentation

- Mettez à jour le README si vous ajoutez une fonctionnalité majeure
- Commentez le code complexe
- Ajoutez des JSDoc pour les fonctions publiques

## ✅ Checklist avant PR

- [ ] Le code build sans erreurs
- [ ] Les nouvelles fonctionnalités sont testées manuellement
- [ ] Le code suit les standards du projet
- [ ] Les commits suivent Conventional Commits
- [ ] La documentation est mise à jour si nécessaire
- [ ] Pas de console.log oubliés
- [ ] Les variables d'environnement sont documentées

## 💬 Questions ?

N'hésitez pas à :
- Ouvrir une Issue pour discuter
- Demander de l'aide dans les commentaires de votre PR
- Rejoindre nos discussions

## 📜 Licence

En contribuant, vous acceptez que vos contributions soient sous la même licence MIT que le projet.

---

Merci de contribuer à Micro Coach ! 🎯💪
