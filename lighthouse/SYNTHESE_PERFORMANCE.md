# Rapport de performance Lighthouse — HRnet jQuery vs React

**Projet :** OpenClassrooms — Wealth Health / HRnet  
**Date :** 18 septembre 2026  
**Outil :** Google Chrome Lighthouse 13.4.1 (rapport Expanded)  
**Profil :** Desktop  

---

## 1. Objectif

Comparer les performances de l’application HRnet historique (jQuery) et de la nouvelle version React, afin de mesurer l’impact de la migration demandée par Wealth Health.

Les pages auditées sont :

- **Create Employee**
- **Employee List**

---

## 2. Méthodologie

| Critère | Détail |
|---------|--------|
| Ancienne application | Dossier `HRnet/` — servie en local via **Go Live** (`http://127.0.0.1:5500`) |
| Nouvelle application | Dossier `frontend/` — build de production puis **`npm run preview`** (`http://localhost:4173`) |
| Jeu de données | 20 employés enregistrés dans `localStorage` |
| Conditions | Même type d’appareil (Desktop), audits Expanded |
| Livrables joints | PDF Lighthouse dans `docs/lighthouse/jquery/` et `docs/lighthouse/react/` |

Conformément aux consignes du projet, l’application React n’a **pas** été auditée en mode développement (`npm run dev`), afin d’obtenir des scores représentatifs d’un environnement de production.

---

## 3. Stack technique comparée

### HRnet jQuery
- HTML / CSS / JavaScript
- jQuery, jQuery UI (selectmenu)
- Plugins : jquery-modal, jquery.datetimepicker, DataTables
- Ressources chargées via plusieurs CDN

### HRnet React
- Vite + React + React Router
- Redux Toolkit avec persistance `localStorage`
- Modale publiée en package npm (`wealthhealth-react-modal-oc`)
- Tableau : `@tanstack/react-table` (chargé en lazy sur la page liste)
- Dates et listes déroulantes : contrôles HTML natifs
- Code-splitting des vendors pour alléger le chargement initial

---

## 4. Résultats

### 4.1 Create Employee

| Métrique | jQuery | React |
|----------|--------|-------|
| Performance | 100 | 100 |
| Accessibility | 89 | **100** |
| Best Practices | 96 | **100** |
| SEO | 90 | **100** |
| First Contentful Paint (FCP) | 0,7 s | **0,4 s** |
| Largest Contentful Paint (LCP) | 0,7 s | **0,4 s** |
| Total Blocking Time (TBT) | 0 ms | 0 ms |
| Cumulative Layout Shift (CLS) | 0,007 | **0** |
| Speed Index | 0,7 s | **0,4 s** |
| Poids réseau total | 261 KiB | **94 KiB** |

### 4.2 Employee List

| Métrique | jQuery | React |
|----------|--------|-------|
| Performance | 100 | 100 |
| Accessibility | 94 | **100** |
| Best Practices | 96 | **100** |
| SEO | 80 | **100** |
| First Contentful Paint (FCP) | 0,5 s | **0,4 s** |
| Largest Contentful Paint (LCP) | 0,5 s | 0,5 s |
| Total Blocking Time (TBT) | 0 ms | 0 ms |
| Cumulative Layout Shift (CLS) | 0 | 0 |
| Speed Index | 0,5 s | **0,4 s** |
| Poids réseau total | **65 KiB** | 126 KiB |

---

## 5. Analyse

### Scores Lighthouse

Sur les deux pages, la version React obtient **100/100** en Performance, Accessibility, Best Practices et SEO.  
La version jQuery reste à 100 en Performance, mais est inférieure sur Accessibility, Best Practices et SEO.

### Create Employee

React est clairement plus performant sur cette page :

- FCP, LCP et Speed Index passent de **0,7 s à 0,4 s**
- le poids réseau passe de **261 KiB à 94 KiB** (−64 %)

Cette différence s’explique principalement par la suppression des plugins jQuery et des CDN associés (jQuery UI, datetimepicker, jquery-modal, etc.), remplacés par un bundle Vite first-party et une modale React.

### Employee List

React reste devant sur les scores Lighthouse, le FCP et le Speed Index.  
Le poids réseau de la page liste est en revanche plus élevé (126 KiB vs 65 KiB) : la version jQuery ne charge que jQuery + DataTables, alors que la version React est une SPA qui charge React, le routeur, Redux, puis TanStack Table pour le tableau.

Ce surcoût est un compromis classique d’architecture SPA. Il est compensé par une meilleure accessibilité, un SEO conforme, et un comportement de tableau plus maîtrisé (filtre, tri, pagination en React, sans plugin jQuery DataTables).

### Lien avec les objectifs métier

La migration répond aux problèmes signalés sur l’ancienne application :

| Problème jQuery | Solution React |
|-----------------|----------------|
| Modal difficile à styler | Package npm custom |
| Tableau DataTables lent / lourd | `@tanstack/react-table` |
| Date picker / dropdowns jQuery | Contrôles natifs |
| Multiples appels CDN | Bundle de production Vite |

---

## 6. Limites de la mesure

- Audits réalisés en local (localhost), sans latence réseau distante ni throttling mobile réel
- Volume de données limité à 20 employés
- Les scores Performance à 100 des deux côtés en Desktop local ne dispensent pas d’analyser les métriques détaillées et le poids réseau

---

## 7. Conclusion

La version React d’HRnet améliore globalement la qualité et les performances mesurées par Lighthouse :

- **Create Employee** : nette amélioration (vitesse et poids)
- **Employee List** : meilleurs scores Lighthouse et FCP / Speed Index, avec un poids SPA plus élevé que la page jQuery isolée
- **Accessibilité, bonnes pratiques et SEO** : React à **100/100** sur les deux pages

La conversion jQuery → React atteint donc l’objectif du projet : une application plus moderne, mieux structurée, sans jQuery, avec des gains quantifiables sur les indicateurs clés — notamment sur la page de création d’employé, la plus chargée en plugins dans l’ancienne version.

---

## 8. Annexes

### Récapitulatif des scores

| Page | Perf | A11y | BP | SEO | Poids |
|------|------|------|----|-----|-------|
| jQuery — Create Employee | 100 | 89 | 96 | 90 | 261 KiB |
| React — Create Employee | 100 | 100 | 100 | 100 | 94 KiB |
| jQuery — Employee List | 100 | 94 | 96 | 80 | 65 KiB |
| React — Employee List | 100 | 100 | 100 | 100 | 126 KiB |

### Rapports PDF

- [`jquery/create-employee-desktop.pdf`](./jquery/create-employee-desktop.pdf)
- [`jquery/employee-list-desktop.pdf`](./jquery/employee-list-desktop.pdf)
- [`react/create-employee-desktop.pdf`](./react/create-employee-desktop.pdf)
- [`react/employee-list-desktop.pdf`](./react/employee-list-desktop.pdf)
