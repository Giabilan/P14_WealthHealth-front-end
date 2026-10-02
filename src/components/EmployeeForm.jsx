import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { states } from "../data/states";
import { departments } from "../data/departments";
import { addEmployee } from "../store/employeesSlice";
import { validateEmployeeForm } from "../utils/validateEmployeeForm";
import FormField from "./FormField";
import Modal from "wealthhealth-react-modal-oc";

const initialFormState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  startDate: "",
  street: "",
  city: "",
  state: states[0].abbreviation,
  zipCode: "",
  department: departments[0],
};

const baseInputClassName =
  "w-full rounded border bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2";

const getInputClassName = (hasError) =>
  hasError
    ? `${baseInputClassName} border-red-500 focus:border-red-500 focus:ring-red-500/20`
    : `${baseInputClassName} border-slate-300 focus:border-teal-600 focus:ring-teal-600/20`;

/**
 * Formulaire de création d'employé (équivalent de l'ancien Create Employee HRnet).
 * Valide les champs avant enregistrement Redux / localStorage et ouverture de la modale.
 */
const EmployeeForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // envoies l’employé à Redux
  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateEmployeeForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    dispatch(
      addEmployee({
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        street: formData.street.trim(),
        city: formData.city.trim(),
        zipCode: String(formData.zipCode).trim(),
      }),
    );
    setFormData(initialFormState);
    setErrors({});
    setIsModalOpen(true);
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center">
      <Link
        to="/employee-list"
        className="mb-4 text-teal-700 underline-offset-2 hover:underline"
      >
        View Current Employees
      </Link>

      <h2 className="mb-6 text-2xl font-semibold text-slate-900">
        Create Employee
      </h2>

      <form
        id="create-employee"
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-stretch"
        noValidate
      >
        <FormField id="first-name" label="First Name" error={errors.firstName}>
          <input
            id="first-name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className={getInputClassName(Boolean(errors.firstName))}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "first-name-error" : undefined}
            autoComplete="given-name"
          />
        </FormField>

        <FormField id="last-name" label="Last Name" error={errors.lastName}>
          <input
            id="last-name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className={getInputClassName(Boolean(errors.lastName))}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "last-name-error" : undefined}
            autoComplete="family-name"
          />
        </FormField>

        <FormField
          id="date-of-birth"
          label="Date of Birth"
          error={errors.dateOfBirth}
        >
          <input
            id="date-of-birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={getInputClassName(Boolean(errors.dateOfBirth))}
            aria-invalid={Boolean(errors.dateOfBirth)}
            aria-describedby={
              errors.dateOfBirth ? "date-of-birth-error" : undefined
            }
          />
        </FormField>

        <FormField id="start-date" label="Start Date" error={errors.startDate}>
          <input
            id="start-date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            className={getInputClassName(Boolean(errors.startDate))}
            aria-invalid={Boolean(errors.startDate)}
            aria-describedby={errors.startDate ? "start-date-error" : undefined}
          />
        </FormField>

        <fieldset className="mt-4 rounded border border-slate-300 p-4">
          <legend className="px-1 text-sm font-semibold text-slate-800">
            Address
          </legend>

          <FormField id="street" label="Street" error={errors.street}>
            <input
              id="street"
              name="street"
              type="text"
              value={formData.street}
              onChange={handleChange}
              className={getInputClassName(Boolean(errors.street))}
              aria-invalid={Boolean(errors.street)}
              aria-describedby={errors.street ? "street-error" : undefined}
              autoComplete="street-address"
            />
          </FormField>

          <FormField id="city" label="City" error={errors.city}>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className={getInputClassName(Boolean(errors.city))}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? "city-error" : undefined}
              autoComplete="address-level2"
            />
          </FormField>

          <FormField id="state" label="State" error={errors.state}>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={getInputClassName(Boolean(errors.state))}
              aria-invalid={Boolean(errors.state)}
              aria-describedby={errors.state ? "state-error" : undefined}
            >
              {states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="zip-code" label="Zip Code" error={errors.zipCode}>
            <input
              id="zip-code"
              name="zipCode"
              type="text"
              inputMode="numeric"
              value={formData.zipCode}
              onChange={handleChange}
              className={getInputClassName(Boolean(errors.zipCode))}
              aria-invalid={Boolean(errors.zipCode)}
              aria-describedby={errors.zipCode ? "zip-code-error" : undefined}
              autoComplete="postal-code"
            />
          </FormField>
        </fieldset>

        <FormField id="department" label="Department" error={errors.department}>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={getInputClassName(Boolean(errors.department))}
            aria-invalid={Boolean(errors.department)}
            aria-describedby={
              errors.department ? "department-error" : undefined
            }
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </FormField>

        <button
          type="submit"
          className="mt-6 cursor-pointer rounded bg-teal-700 px-4 py-2.5 font-medium text-white transition hover:bg-teal-800"
        >
          Save
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
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
    </div>
  );
};

export default EmployeeForm;
