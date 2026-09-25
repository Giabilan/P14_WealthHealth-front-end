/**
 * Champ de formulaire réutilisable (label + contrôle + erreur optionnelle).
 * @param {string} id - Identifiant unique du champ (lié au label via htmlFor).
 * @param {string} label - Texte affiché au-dessus du contrôle.
 * @param {React.ReactNode} children - Input, select ou autre contrôle.
 * @param {string} [error] - Message d'erreur affiché sous le champ.
 */
const FormField = ({ id, label, children, error }) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mt-4 mb-2.5 block font-medium text-slate-700"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-sm text-red-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default FormField;
