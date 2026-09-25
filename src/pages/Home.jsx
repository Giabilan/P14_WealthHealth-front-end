import EmployeeForm from "../components/EmployeeForm";
import usePageMeta from "../hooks/usePageMeta";

/**
 * Page Create Employee — formulaire d'ajout d'un nouvel employé.
 */
const Home = () => {
  usePageMeta(
    "HRnet — Create Employee",
    "Create a new employee record in HRnet, Wealth Health's internal HR application.",
  );

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8">
      <EmployeeForm />
    </main>
  );
};

export default Home;
