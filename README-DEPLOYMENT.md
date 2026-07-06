# 🚀 Guide de Déploiement - Virtuis

## 📋 Configuration Initiale

### 1. **GitHub Actions (CI/CD automatisé)**

✅ **Statut**: Configuré
- **Fichier**: `.github/workflows/ci-cd.yml`
- **Déclencheurs**: 
  - Push sur `main` ou `develop`
  - Pull requests
- **Étapes**:
  - ✓ Installation des dépendances
  - ✓ Linting (ESLint)
  - ✓ Type checking (TypeScript)
  - ✓ Build (Next.js)
  - ✓ Déploiement automatique sur Vercel

### 2. **Vercel (Hébergement)**

✅ **Statut**: Prêt à configurer

**Étapes de configuration:**

1. **Créer un compte Vercel**
   - Allez à https://vercel.com
   - Connectez-vous avec GitHub

2. **Importer le projet**
   - Cliquez sur "New Project"
   - Sélectionnez le repository `virtuis`
   - Vercel détectera automatiquement Next.js

3. **Configurer les variables d'environnement**
   - Allez à **Settings** → **Environment Variables**
   - Ajoutez vos variables Firebase:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     NEXT_PUBLIC_FIREBASE_PROJECT_ID
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     NEXT_PUBLIC_FIREBASE_APP_ID
     ```

4. **Obtenir les tokens Vercel**
   - Allez à **Settings** → **Tokens**
   - Générez un nouveau token
   - Ajoutez-le à GitHub comme secret `VERCEL_TOKEN`

5. **Configurer GitHub Secrets**
   - Allez à votre repository GitHub
   - **Settings** → **Secrets and variables** → **Actions**
   - Ajoutez:
     ```
     VERCEL_TOKEN=votre_token_vercel
     VERCEL_ORG_ID=votre_org_id
     VERCEL_PROJECT_ID=votre_project_id
     ```

### 3. **Dépendances automatiques (Dependabot)**

✅ **Statut**: Configuré
- **Fichier**: `.github/dependabot.yml`
- **Fonctionnalité**: Mises à jour automatiques des packages npm et GitHub Actions
- **Fréquence**: Hebdomadaire (lundi à 3h00 UTC)

### 4. **Sécurité (Security Workflow)**

✅ **Statut**: Configuré
- **Fichier**: `.github/workflows/security.yml`
- **Vérifications**:
  - ✓ Audit des dépendances npm
  - ✓ Détection des packages obsolètes
  - ✓ Vérification de la qualité du code
  - ✓ Type checking

---

## 🔧 Configuration GitHub Secrets

### Pour le déploiement Vercel automatisé:

1. **Ouvrez votre repository** sur GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** et ajoutez:

```
VERCEL_TOKEN = [votre token Vercel]
VERCEL_ORG_ID = [votre org ID Vercel]
VERCEL_PROJECT_ID = [votre project ID Vercel]
```

---

## 📱 Variables d'environnement

### Fichier `.env.local` (local)

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## 🚀 Workflow de déploiement

### Développement local
```bash
npm install
npm run dev
```

### Build de test
```bash
npm run build
npm run start
```

### Déploiement

1. **Commit et Push sur `main`**
   ```bash
   git add .
   git commit -m "feat: nouvelle fonctionnalité"
   git push origin main
   ```

2. **GitHub Actions déclenche automatiquement:**
   - Linting
   - Type checking
   - Build
   - Déploiement sur Vercel

3. **Vérification du déploiement:**
   - Allez sur https://vercel.com/dashboard
   - Vérifiez le statut du déploiement

---

## 📊 Statut des déploiements

### Actions GitHub
- 📍 Allez à: **Actions** tab sur GitHub
- Voir les workflows en cours et complétés

### Vercel
- 📍 Allez à: https://vercel.com/dashboard
- Voir les déploiements en temps réel

### GitHub Pages
- 📍 Allez à: **Settings** → **Pages**
- Vérifiez le statut de publication

---

## 🐛 Dépannage

### Build échoue sur Vercel
1. Vérifiez les variables d'environnement
2. Consultez les logs Vercel
3. Vérifiez les versions de Node.js

### GitHub Actions échoue
1. Allez à **Actions** tab
2. Cliquez sur le workflow échoué
3. Consultez les logs détaillés

### Dépendances obsolètes
1. Dependabot crée automatiquement des PRs
2. Vérifiez les tests passent
3. Mergez la PR

---

## ✅ Checklist de déploiement

- [ ] Compte Vercel créé
- [ ] Repository importé dans Vercel
- [ ] Variables Firebase configurées dans Vercel
- [ ] Tokens Vercel générés
- [ ] GitHub Secrets configurés
- [ ] Premier déploiement réussi
- [ ] URL personnalisée configurée (optionnel)
- [ ] Domaine personnalisé configuré (optionnel)

---

## 📚 Ressources utiles

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Firebase Configuration](https://firebase.google.com/docs)

---

**Dernière mise à jour**: 2026-07-06
**Version**: 1.0.0
