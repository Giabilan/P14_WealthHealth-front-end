const STORAGE_KEY = "employees";

/**
 * Charge la liste des employés depuis localStorage.
 * @returns {Array<object>}
 */
export const loadEmployeesFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/**
 * Persiste la liste des employés dans localStorage.
 * @param {Array<object>} employees
 */
export const saveEmployeesToStorage = (employees) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};
