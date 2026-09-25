import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

/**
 * Page d'erreur 404.
 */
const Error = () => {
  usePageMeta(
    "HRnet — Page Not Found",
    "The requested HRnet page could not be found.",
  );

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">
        Page not found
      </h2>
      <Link to="/" className="text-teal-700 underline-offset-2 hover:underline">
        Back to Home
      </Link>
    </main>
  );
};

export default Error;
