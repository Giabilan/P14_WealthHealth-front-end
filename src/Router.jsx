import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import PageLoader from "./components/PageLoader";

/**
 * Employee List (+ TanStack Table) chargé à la demande :
 * allège le bundle initial de la page Create Employee.
 */
const EmployeeList = lazy(() => import("./pages/EmployeeList"));
const Error = lazy(() => import("./pages/Error"));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="employee-list" element={<EmployeeList />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
