# 🤖 Fonctionnalités IA - Micro Coach

Ce document décrit toutes les fonctionnalités propulsées par l'intelligence artificielle (OpenAI GPT-4) intégrées dans Micro Coach.

## 🎯 Vue d'Ensemble

Micro Coach utilise OpenAI GPT-4 pour fournir un coaching personnalisé et intelligent à chaque utilisateur. L'IA analyse vos habitudes, comprend vos objectifs et vous guide vers la réussite.

## ⚙️ Configuration

### Variables d'Environnement

Ajoutez ces variables dans `server/.env` :

```env
OPENAI_API_KEY="sk-votre-clé-api-openai"
OPENAI_MODEL="gpt-4"
OPENAI_MAX_TOKENS=1000
```

### Obtenir une Clé API

1. Créez un compte sur https://platform.openai.com/
2. Allez dans "API Keys"
3. Créez une nouvelle clé API
4. Copiez-la dans votre fichier `.env`

## 🚀 Fonctionnalités IA

### 1. 💬 Chatbot Coach Personnel

**Endpoint:** `POST /api/ai/chat`

Un assistant IA disponible 24/7 qui :
- Répond à vos questions sur les habitudes
- Donne des conseils personnalisés
- Vous motive et encourage
- S'adapte à votre contexte (niveau, points, nombre d'habitudes)

**Utilisation dans l'app :**
- Bouton flottant en bas à droite
- Interface de chat moderne
- Historique de conversation
- Réponses instantanées

**Exemple de conversation :**
```
User: Comment rester motivé ?
AI: Excellente question ! 💪 Voici 3 astuces pour vous aider...
```

### 2. 💡 Conseils Motivationnels Quotidiens

**Endpoint:** `GET /api/ai/tip`

Génère un conseil personnalisé basé sur :
- Votre nom
- Vos habitudes actives
- Votre progression

**Caractéristiques :**
- Nouveau conseil chaque jour
- Adapté à votre profil
- Court et actionnable (2-3 phrases)
- Encourageant et positif

### 3. 🧠 Analyse Intelligente des Habitudes

**Endpoint:** `GET /api/ai/analyze`

Analyse approfondie de vos habitudes sur les 30 derniers jours avec :

**Insights :** Observations sur vos patterns
**Points forts :** Ce que vous faites bien
**À améliorer :** Domaines de progression
**Recommandations :** Actions concrètes

**Exemple de retour :**
```json
{
  "insights": [
    "Vous êtes particulièrement assidu le matin",
    "Excellente régularité sur vos habitudes de santé"
  ],
  "strengths": [
    "Constance sur 3 habitudes depuis 2 semaines",
    "Bon équilibre entre habitudes physiques et mentales"
  ],
  "areasToImprove": [
    "Les week-ends pourraient être mieux structurés",
    "Manque de régularité sur l'habitude 'Lecture'"
  ],
  "recommendations": [
    "Planifiez vos habitudes le dimanche pour la semaine",
    "Créez un rappel pour votre lecture à 20h"
  ]
}
```

### 4. 🎯 Suggestions d'Habitudes Personnalisées

**Endpoint:** `POST /api/ai/suggest`

Suggère de nouvelles habitudes basées sur vos objectifs.

**Input :** Vos objectifs en texte libre
**Output :** 3-5 suggestions d'habitudes complètes

**Chaque suggestion contient :**
- Nom de l'habitude
- Description
- Catégorie
- Fréquence recommandée
- Icône
- Explication du "pourquoi"

**Exemple :**
```
Objectif: "Je veux améliorer ma santé et réduire mon stress"

Suggestions:
1. 🧘 Méditation matinale (10 min)
   - Pourquoi: Réduit le cortisol de 30%, améliore la concentration

2. 🚶 Marche quotidienne (20 min)
   - Pourquoi: Boost l'énergie, favorise la créativité

3. 💧 Hydratation (2L d'eau/jour)
   - Pourquoi: Améliore les fonctions cognitives et l'énergie
```

### 5. 😊 Analyse de Sentiment

**Endpoint:** `POST /api/ai/sentiment`

Analyse le sentiment de vos notes de check-in :

**Détecte :**
- Sentiment: positive, neutral, negative
- Score: 0-100
- Mots-clés principaux

**Utilité :**
- Comprendre votre état émotionnel
- Identifier les patterns émotionnels
- Corréler humeur et habitudes

### 6. 📋 Générateur de Plan d'Action

**Endpoint:** `POST /api/ai/action-plan`

Crée un plan structuré pour atteindre un objectif.

**Input :**
- Objectif (ex: "Courir un 10km")
- Durée (ex: "3 mois")

**Output :**
- Plan semaine par semaine
- Actions concrètes
- Conseils pour chaque étape
- Jalons (milestones)

**Exemple :**
```json
{
  "steps": [
    {
      "week": 1,
      "action": "Commencer par marcher 30 min/jour",
      "tips": [
        "Choisissez un parcours agréable",
        "Investissez dans de bonnes chaussures"
      ]
    },
    {
      "week": 2,
      "action": "Alterner marche/course légère (5 min)",
      "tips": [
        "Écoutez votre corps",
        "Hydratez-vous bien"
      ]
    }
  ],
  "milestones": [
    "Semaine 4: Courir 5 min sans s'arrêter",
    "Semaine 8: Courir 20 min continu",
    "Semaine 12: Courir 10km"
  ]
}
```

### 7. 📊 Résumé Hebdomadaire Intelligent

**Endpoint:** `GET /api/ai/weekly-summary`

Génère un résumé intelligent de votre semaine avec :

**Données analysées :**
- Nombre de check-ins
- Habitudes complétées vs manquées
- Points gagnés

**Résumé textuel :**
- Félicitations pour les réussites
- Analyse constructive
- Conseils pour la semaine suivante
- Ton motivant et personnalisé

## 🎨 Interface Utilisateur

### Page Coach IA (`/ai`)

Accédez à toutes les fonctionnalités IA :
- Conseil du jour (mis à jour quotidiennement)
- Résumé hebdomadaire
- Analyse complète des habitudes
- Générateur de suggestions

### Chatbot Flottant

- Toujours accessible (bouton en bas à droite)
- Interface de chat moderne
- Contexte utilisateur intégré
- Réponses en temps réel

### Composants Principaux

```
AICoach.tsx         - Chatbot flottant
AIInsights.tsx      - Analyse des habitudes
HabitSuggestions.tsx - Générateur de suggestions
AIPage.tsx          - Page principale IA
```

## 🔧 Architecture Technique

### Backend

```
server/src/
├── services/
│   └── openai.service.ts    # Service OpenAI centralisé
├── controllers/
│   └── ai.controller.ts     # Contrôleur pour toutes les routes IA
└── routes/
    └── ai.routes.ts         # Routes API IA
```

### Frontend

```
client/src/
├── components/
│   ├── AICoach.tsx          # Chatbot
│   ├── AIInsights.tsx       # Analyses
│   └── HabitSuggestions.tsx # Suggestions
├── pages/
│   └── AIPage.tsx           # Page principale
└── services/
    └── api.ts               # Appels API IA
```

## 💰 Coûts et Limites

### Estimation des Coûts (GPT-4)

- **Conseil quotidien :** ~150 tokens → $0.003/utilisateur/jour
- **Analyse habitudes :** ~800 tokens → $0.012/analyse
- **Chatbot :** ~300 tokens/message → $0.005/message
- **Suggestions :** ~600 tokens → $0.009/génération

**Coût estimé par utilisateur actif :** $0.50-1.00/mois

### Optimisations

1. **Cache** : Les conseils quotidiens sont générés une fois par jour
2. **Limites** : Max tokens configurables par endpoint
3. **Fallbacks** : Messages par défaut si l'API échoue
4. **Retry** : Pas de retry automatique pour limiter les coûts

### Recommandations

Pour un MVP / petit usage :
- Utilisez `gpt-3.5-turbo` (10x moins cher)
- Limitez le nombre de requêtes par utilisateur
- Ajoutez un système de quotas

Pour production :
- Budget mensuel avec alertes
- Rate limiting par utilisateur
- Monitoring des coûts en temps réel

## 🛡️ Sécurité et Bonnes Pratiques

### Sécurité

1. **Clé API** : Jamais côté client, toujours serveur
2. **Validation** : Toutes les entrées sont validées
3. **Sanitization** : Nettoyage des données utilisateur
4. **Rate Limiting** : Protection contre l'abus

### Performance

1. **Timeout** : 30s max par requête
2. **Async** : Toutes les requêtes sont asynchrones
3. **Error Handling** : Fallbacks gracieux
4. **Caching** : Résultats cachés quand applicable

### Prompts

Les prompts système sont optimisés pour :
- Réponses courtes et pertinentes
- Ton encourageant et positif
- Format JSON structuré
- Cohérence avec l'app

## 📈 Métriques et Monitoring

### À Tracker

- Nombre de requêtes par endpoint
- Temps de réponse moyen
- Taux d'erreur
- Coût par utilisateur
- Satisfaction utilisateur

### Logs

Tous les appels IA sont loggés avec :
- Endpoint utilisé
- Utilisateur (ID)
- Temps de réponse
- Tokens utilisés
- Succès/Erreur

## 🚀 Évolutions Futures

### Fonctionnalités Planifiées

1. **Analyse Prédictive**
   - Prédire le risque d'abandon d'une habitude
   - Suggérer le meilleur moment pour les habitudes

2. **Coaching Proactif**
   - Notifications intelligentes
   - Interventions aux moments clés

3. **Insights Avancés**
   - Corrélations entre habitudes
   - Impact sur la santé globale
   - Patterns de réussite personnels

4. **Personnalisation Profonde**
   - Apprentissage de vos préférences
   - Ton de communication adaptatif
   - Recommandations évolutives

5. **Intégrations**
   - Données de santé (Google Fit, Apple Health)
   - Calendrier pour planification
   - Wearables (montres connectées)

## 🤝 Contribution

Pour ajouter une nouvelle fonctionnalité IA :

1. Ajoutez la méthode dans `openai.service.ts`
2. Créez le controller dans `ai.controller.ts`
3. Ajoutez la route dans `ai.routes.ts`
4. Créez l'appel API dans `client/src/services/api.ts`
5. Créez le composant UI si nécessaire
6. Documentez ici !

## 📞 Support

Si vous rencontrez des problèmes avec l'IA :

1. Vérifiez que `OPENAI_API_KEY` est configurée
2. Consultez les logs serveur pour les erreurs
3. Vérifiez votre quota OpenAI
4. Testez avec des requêtes simples d'abord

---

**Propulsé par OpenAI GPT-4** 🤖✨

L'IA de Micro Coach est conçue pour être votre partenaire de développement personnel, vous aidant à construire de meilleures habitudes avec intelligence et empathie.
