import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import usePageMeta from "../hooks/usePageMeta";
import { selectEmployees } from "../store/employeesSlice";

/**
 * Page Current Employees — tableau aligné sur employee-list.html (HRnet jQuery).
 */
const EmployeeList = () => {
  const employees = useSelector(selectEmployees);

  usePageMeta(
    "HRnet — Current Employees",
    "Browse, search, sort and paginate current employee records in HRnet.",
  );

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">
        Current Employees
      </h2>

      <EmployeeTable employees={employees} />

      <Link
        to="/"
        className="text-teal-700 underline-offset-2 hover:underline"
      >
        Home
      </Link>
    </main>
  );
};

export default EmployeeList;
