/**
 * Fallback léger affiché pendant le chargement d'une route lazy.
 */
const PageLoader = () => {
  return (
    <main
      className="flex flex-1 items-center justify-center px-4 py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="text-sm text-slate-500">Loading…</p>
    </main>
  );
};

export default PageLoader;
