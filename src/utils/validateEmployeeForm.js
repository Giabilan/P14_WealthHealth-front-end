/**
 * Valide les données du formulaire Create Employee.
 * @param {object} formData - Valeurs actuelles du formulaire.
 * @returns {Record<string, string>} Map champ → message d'erreur (vide si OK).
 */
export const validateEmployeeForm = (formData) => {
  const errors = {};

  const requiredTextFields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "street", label: "Street" },
    { key: "city", label: "City" },
  ];

  requiredTextFields.forEach(({ key, label }) => {
    const value = String(formData[key] ?? "").trim();
    if (!value) {
      errors[key] = `${label} is required.`;
    } else if (value.length < 2) {
      errors[key] = `${label} must be at least 2 characters.`;
    }
  });

  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of Birth is required.";
  } else {
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(birthDate.getTime())) {
      errors.dateOfBirth = "Date of Birth is invalid.";
    } else if (birthDate >= today) {
      errors.dateOfBirth = "Date of Birth must be in the past.";
    }
  }

  if (!formData.startDate) {
    errors.startDate = "Start Date is required.";
  } else {
    const startDate = new Date(formData.startDate);
    if (Number.isNaN(startDate.getTime())) {
      errors.startDate = "Start Date is invalid.";
    } else if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      if (
        !Number.isNaN(birthDate.getTime()) &&
        startDate < birthDate
      ) {
        errors.startDate = "Start Date cannot be before Date of Birth.";
      }
    }
  }

  if (!formData.state) {
    errors.state = "State is required.";
  }

  const zipCode = String(formData.zipCode ?? "").trim();
  if (!zipCode) {
    errors.zipCode = "Zip Code is required.";
  } else if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
    errors.zipCode = "Zip Code must be 5 digits (or ZIP+4).";
  }

  if (!formData.department) {
    errors.department = "Department is required.";
  }

  return errors;
};
