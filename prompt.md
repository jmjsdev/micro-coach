# Prompt pour Application de Micro-Coaching & Suivi d'Habitudes

## Vue d'ensemble du projet

Créer une application web moderne de micro-coaching et de suivi d'habitudes (habits tracking) qui aide les utilisateurs à construire et maintenir de nouvelles habitudes de vie saines. L'application doit être visuellement attrayante, performante, et optimisée pour la conversion.

## Stack Technique

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Base de données**: Supabase (PostgreSQL) ou Firebase
- **Authentification**: NextAuth.js ou Supabase Auth
- **State Management**: Zustand ou React Context
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts/Visualizations**: Recharts ou Chart.js
- **Notifications**: React Hot Toast
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel

## Fonctionnalités Principales

### 1. Landing Page
- Hero section avec CTA clair et accrocheur
- Section "Comment ça marche" (3-4 étapes simples)
- Showcase des habitudes populaires avec exemples visuels
- Témoignages utilisateurs (mocked pour MVP)
- Section prix (Gratuit vs Premium)
- FAQ section
- Footer avec liens sociaux et légaux
- Design responsive et moderne
- Animations subtiles au scroll
- Performance optimisée (Core Web Vitals)

### 2. Authentification
- Sign up / Sign in (email + password)
- OAuth (Google, optionnel pour MVP)
- Onboarding flow pour nouveaux utilisateurs
- Profile setup (nom, photo, objectifs)

### 3. Dashboard Principal
- Vue d'ensemble des habitudes actives
- Calendrier visuel (heatmap style GitHub)
- Statistiques de la semaine/mois
- Streak counter (série de jours consécutifs)
- Progress bars et indicateurs visuels
- Quick actions pour marquer habitudes du jour

### 4. Gestion d'Habitudes

#### Création d'habitude
- Nom de l'habitude
- Catégorie (santé, fitness, mental, productivité, social, autre)
- Fréquence (quotidien, X fois par semaine, personnalisé)
- Heure de rappel (optionnel)
- Objectif (nombre de jours, semaines)
- Icon/couleur personnalisables

#### Suivi quotidien
- Check-in simple (bouton/swipe)
- Notes optionnelles pour chaque jour
- Photos progress (optionnel, premium)
- Mood/feeling rating
- Timer intégré pour habitudes chronométrées

### 5. Système de Récompenses

#### Gamification
- Points/XP pour chaque check-in
- Badges/achievements débloquables
  - Première habitude
  - 7 jours de suite
  - 30 jours de suite
  - 100 jours de suite
  - 5 habitudes simultanées
  - Etc.
- Niveaux de progression
- Animations de célébration

#### Récompenses virtuelles
- Coins virtuels gagnés
- Unlockables (thèmes, icons, stickers)
- Avatar customization (premium)

### 6. Dimension Sociale (Premium/Optionnel)

- Ajouter des amis
- Voir les habitudes publiques des amis
- Challenges en groupe
- Leaderboard hebdomadaire/mensuel
- Encouragements/likes
- Partage de progress sur réseaux sociaux

### 7. Rappels & Notifications

- Notifications push (si PWA)
- Rappels par email
- Rappels intelligents (basés sur comportement)
- Personnalisation des messages de rappel

### 8. Analytics & Insights

- Graphiques de progression
- Statistiques détaillées par habitude
- Meilleurs jours de la semaine
- Corrélations entre habitudes
- Rapports mensuels automatiques
- Export de données (CSV, PDF) - Premium

### 9. Version Premium

#### Fonctionnalités exclusives
- Habitudes illimitées (vs 3 en gratuit)
- Analytics avancées
- Thèmes personnalisés
- Photos progress illimitées
- Backup automatique cloud
- Support prioritaire
- Contenu exclusif (guides, vidéos)
- Pas de publicité
- Défis premium avec coach virtuel

#### Pricing
- Gratuit: 3 habitudes max, features de base
- Premium: 4.99€/mois ou 49.99€/an
- One-time payment option: 149.99€ lifetime

### 10. Contenu & Valeur Ajoutée

- Bibliothèque d'habitudes pré-configurées
- Templates d'habitudes populaires
- Articles de blog sur formation d'habitudes
- Mini-guides (science des habitudes)
- Vidéos motivationnelles courtes
- Tips quotidiens

## Design & UX

### Design System
- Palette de couleurs moderne et énergisante
  - Primary: Bleu/Violet dynamique
  - Success: Vert vibrant
  - Warning: Orange énergique
  - Neutrals: Gris modernes
- Typography: Police moderne (Inter, Plus Jakarta Sans)
- Spacing cohérent (système 4/8px)
- Border radius arrondis (8-16px)
- Ombres subtiles et modernes
- Glassmorphism pour certains éléments

### UI Components
- Cards avec hover effects
- Modals/Dialogs pour actions importantes
- Bottom sheets mobile
- Skeletons pour loading states
- Toast notifications
- Progress indicators
- Empty states engageants
- Error states informatifs

### Animations
- Micro-interactions (hover, click)
- Page transitions fluides
- Confetti lors d'achievements
- Progress animations
- Skeleton loaders
- Scroll-triggered animations (landing)

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly sur mobile
- Navigation adaptative
- PWA ready

## Architecture & Structure

### Pages/Routes
```
/                          → Landing page
/auth/signin              → Sign in page
/auth/signup              → Sign up page
/auth/onboarding          → Onboarding flow
/dashboard                → Main dashboard
/habits                   → All habits list
/habits/new               → Create new habit
/habits/[id]              → Habit detail & history
/habits/[id]/edit         → Edit habit
/profile                  → User profile
/settings                 → App settings
/premium                  → Premium upgrade page
/friends                  → Social features (premium)
/achievements             → Badges & rewards
/stats                    → Detailed analytics
/blog                     → Content/Articles
/blog/[slug]              → Blog post
/about                    → About page
/privacy                  → Privacy policy
/terms                    → Terms of service
```

### Data Models

#### User
```typescript
{
  id: string
  email: string
  name: string
  avatar?: string
  isPremium: boolean
  createdAt: Date
  totalPoints: number
  level: number
  settings: {
    notifications: boolean
    emailReminders: boolean
    theme: 'light' | 'dark' | 'auto'
  }
}
```

#### Habit
```typescript
{
  id: string
  userId: string
  name: string
  description?: string
  category: 'health' | 'fitness' | 'mental' | 'productivity' | 'social' | 'other'
  frequency: 'daily' | 'weekly' | 'custom'
  frequencyDetails?: { daysPerWeek: number }
  reminderTime?: string
  icon: string
  color: string
  goalDays?: number
  isPublic: boolean
  createdAt: Date
  isActive: boolean
}
```

#### CheckIn
```typescript
{
  id: string
  habitId: string
  userId: string
  date: Date
  completed: boolean
  note?: string
  mood?: 1 | 2 | 3 | 4 | 5
  duration?: number // in minutes
  createdAt: Date
}
```

#### Achievement
```typescript
{
  id: string
  userId: string
  type: string
  unlockedAt: Date
  habitId?: string
}
```

## Optimisations

### Performance
- Next.js Image optimization
- Code splitting automatique
- Lazy loading des components
- Optimistic UI updates
- Service Worker pour PWA
- Cache stratégies (SWR/React Query)
- Fonts optimization
- Minimize bundle size

### SEO
- Metadata optimization
- Open Graph tags
- Sitemap.xml
- Robots.txt
- Structured data (JSON-LD)
- Fast page load (< 2s)
- Mobile-friendly
- Blog pour contenu SEO

### Analytics
- Google Analytics ou Plausible
- Event tracking (signups, habit creation, check-ins)
- Conversion tracking
- User behavior analysis
- A/B testing capability

### Security
- HTTPS obligatoire
- CSRF protection
- XSS prevention
- SQL injection protection (ORM)
- Rate limiting
- Secure authentication
- Environment variables protection

## Monétisation

### Stratégies
1. **Freemium Model**: Version gratuite limitée + Premium
2. **In-app Ads**: Bannières discrètes (version gratuite uniquement)
3. **Affiliate Marketing**: Produits bien-être dans blog
4. **Sponsored Content**: Partenariats marques bien-être
5. **Corporate B2B**: Licences entreprise pour employés

### Payment Integration
- Stripe pour paiements
- Gestion subscriptions
- Webhooks pour activation premium
- Invoicing automatique
- Cancellation flow optimisé

## MVP (Phase 1 - 2-3 semaines)

### Priorités MVP
1. Landing page complète et attrayante
2. Auth basique (email/password)
3. Création et gestion de 3 habitudes max
4. Check-in quotidien simple
5. Streak counter basique
6. Dashboard avec stats simples
7. 3-5 badges de base
8. Responsive design
9. Deploy sur Vercel

### Post-MVP (Phase 2)
- Système de rappels/notifications
- Analytics avancées
- Social features
- Premium subscription
- Blog/Content
- PWA
- Plus de gamification

## Différenciation

### USP (Unique Selling Points)
- **Expertise personnelle**: Intégrer votre expérience en rééducation
- **Approche holistique**: Pas que du tracking, mais du vrai coaching
- **Micro-coaching**: Tips quotidiens personnalisés
- **Design premium**: Interface plus belle que concurrence
- **Science-backed**: Contenu basé sur recherche scientifique
- **Community driven**: Aspect social authentique

### Fonctionnalités uniques
- **Habit Templates** basés sur recherche scientifique
- **Progress Photography** avec timeline visuelle
- **Smart Insights**: AI suggestions (future)
- **Recovery Mode**: Pour ne pas briser streak si manqué 1 jour
- **Habit Stacking**: Suggestions de combinaisons d'habitudes
- **Energy Level Tracking**: Corrélation avec habitudes

## Style de Code

### Best Practices
- TypeScript strict mode
- ESLint + Prettier
- Husky pre-commit hooks
- Composants réutilisables
- Custom hooks pour logique
- Comments JSDoc pour functions complexes
- Error boundaries
- Loading states partout
- Accessible (WCAG AA)

### Folder Structure
```
src/
├── app/                    # Next.js app router
├── components/
│   ├── ui/                # shadcn components
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components
│   └── shared/            # Shared components
├── lib/
│   ├── db/               # Database utilities
│   ├── auth/             # Auth utilities
│   ├── utils/            # Helper functions
│   └── validations/      # Zod schemas
├── hooks/                # Custom React hooks
├── store/                # State management
├── types/                # TypeScript types
├── styles/               # Global styles
└── config/               # App configuration
```

## Livrables Attendus

1. **Application complète et fonctionnelle**
2. **Design moderne et responsive**
3. **Code propre et bien documenté**
4. **README.md avec instructions setup**
5. **Environment variables template**
6. **Basic tests (optionnel pour MVP)**
7. **Deployed version sur Vercel**

## Inspiration & Références

### Apps similaires à étudier
- Habitica (gamification)
- Streaks (simplicité)
- Way of Life (analytics)
- Fabulous (coaching)
- Loop Habit Tracker (open source)

### Design Inspiration
- Dribbble: "habit tracker"
- Behance: "wellness app"
- Mobbin: Apps bien-être
- Modern dashboard designs

## Notes Importantes

- **Mobile-first**: Majorité des utilisateurs sur mobile
- **Simplicité**: UX fluide, pas de friction
- **Motivation**: Design et messages encourageants
- **Privacy**: Rassurer sur protection données
- **Performance**: App doit être rapide et smooth
- **Progressive Enhancement**: Fonctionnel même avec JS désactivé (where possible)

## Prochaines Étapes Recommandées

1. Setup Next.js project avec TypeScript
2. Configurer Tailwind + shadcn/ui
3. Créer design system de base
4. Builder landing page
5. Setup Supabase/Firebase
6. Implémenter auth flow
7. Builder dashboard et habit management
8. Ajouter gamification
9. Testing & optimizations
10. Deploy & monitoring

---

**Objectif**: Créer une app de qualité production, visuellement impressionnante, avec une UX fluide qui donne envie aux utilisateurs de revenir quotidiennement pour tracker leurs habitudes et progresser vers leurs objectifs.
