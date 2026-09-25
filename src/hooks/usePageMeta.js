import { useEffect } from "react";

/**
 * Met à jour le titre et la meta description de la page (SEO Lighthouse).
 * @param {string} title - Titre du document.
 * @param {string} description - Contenu de la meta description.
 */
const usePageMeta = (title, description) => {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);
};

export default usePageMeta;
