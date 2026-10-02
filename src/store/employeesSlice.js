import { createSlice } from "@reduxjs/toolkit";
import {
  loadEmployeesFromStorage,
  saveEmployeesToStorage,
} from "./localStorage";

const employeesSlice = createSlice({
  name: "employees",
  // au rechargement de la page
  initialState: {
    list: loadEmployeesFromStorage(),
  },
  reducers: {
    /**
     * Ajoute un employé au store et synchronise localStorage.
     * @param {object} action.payload - Données de l'employé à enregistrer.
     */
    // redux met à jour le state et sauvegarde
    addEmployee: (state, action) => {
      const nextList = [...state.list, action.payload];
      state.list = nextList;
      saveEmployeesToStorage(nextList);
    },
  },
});

export const { addEmployee } = employeesSlice.actions;

/** Sélecteur de la liste des employés. */
export const selectEmployees = (state) => state.employees.list;

export default employeesSlice.reducer;
