# HRnet — frontend (Wealth Health)

Application React de gestion des employés HRnet (projet OpenClassrooms P14).
Conversion de l’ancienne app jQuery vers une stack **100 % React**.

## Stack

- Vite + React (JS)
- React Router
- Redux Toolkit + localStorage
- Tailwind CSS v4
- Modale custom : [`wealthhealth-react-modal-oc`](https://www.npmjs.com/package/wealthhealth-react-modal-oc)

## Démarrage

```bash
cd frontend
npm install
npm run dev
```

Autres scripts :

```bash
npm run preview  # prévisualiser le build
npm run build    # build de production
npm run lint     # ESLint
```

## Pages


| Route            | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `/`              | Create Employee — formulaire + modale de confirmation |
| `/employee-list` | Liste des employés (depuis Redux / localStorage)      |
| `*`              | Page d’erreur                                         |




## Gestion d’état

Les employés sont stockés dans Redux (`employees` slice) et persistés dans `localStorage` sous la clé `"employees"`.

Au submit du formulaire → `dispatch(addEmployee(...))` → sync localStorage → ouverture de la modale.

## Utiliser la modale

Package : [`wealthhealth-react-modal-oc`](https://www.npmjs.com/package/wealthhealth-react-modal-oc)  
Repos : [Giabilan/P14_WealthHealth-react-modal-component](https://github.com/Giabilan/P14_WealthHealth-react-modal-component)  
Doc complète : [`../Modal/README.md`](../Modal/README.md)

### Import

```jsx
import Modal from "wealthhealth-react-modal-oc";
```



### Exemple (Create Employee)

```jsx
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Success"
  confirmLabel="OK"
  closeLabel="Close"
  accentColor="#0f766e"
  backgroundColor="#ffffff"
  textColor="#0f172a"
  overlayColor="rgba(15, 23, 42, 0.5)"
>
  Employee Created!
</Modal>
```



### Personnaliser le style


| Prop                                    | Effet                                    |
| --------------------------------------- | ---------------------------------------- |
| `accentColor`                           | Titre + bouton de confirmation           |
| `backgroundColor`                       | Fond de la boîte                         |
| `textColor`                             | Texte + bouton Close                     |
| `overlayColor`                          | Fond semi-transparent derrière la modale |
| `size`                                  | `"sm"` | `"md"` | `"lg"`                 |
| `title` / `closeLabel` / `confirmLabel` | Textes                                   |
| `children`                              | Contenu libre                            |


> **Tailwind :** le frontend scanne le package via `@source` dans `src/index.css`.



## Structure

```
frontend/
├── src/
│   ├── components/     # EmployeeForm, FormField, Header, Footer…
│   ├── data/           # states, departments
│   ├── pages/          # Home, EmployeeList, Error
│   ├── store/          # Redux + localStorage
│   ├── Layout.jsx
│   ├── Router.jsx
│   └── main.jsx
└── package.json
```



## Liens

- App GitHub : [P14_WealthHealth-front-end](https://github.com/Giabilan/P14_WealthHealth-front-end)
- Audits Lighthouse : [`lighthouse/`](./lighthouse/) + [`SYNTHESE_PERFORMANCE.md`](./lighthouse/SYNTHESE_PERFORMANCE.md)

