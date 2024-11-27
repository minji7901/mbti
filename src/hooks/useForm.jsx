import { useState } from "react";

export default function useForm(initialState, validate) {
  const [formState, setFormState] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    if (validate) {
      const error = validate(name, value);
      setFormErrors((prev) => {
        const updatedErrors = { ...prev };

        if (value.length === 0) {
          delete updatedErrors[name];
        } else {
          updatedErrors[name] = error;
        }

        return updatedErrors;
      });
    }
  };
  const resetForm = () => {
    setFormState(initialState);
    setFormErrors({});
  };

  return { formState, formErrors, onChangeHandler, resetForm };
}
