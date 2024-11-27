import { useState } from "react";

export default function useForm(initialState) {
  const [formState, setFormState] = useState(initialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const resetForm = () => {
    setFormState(initialState);
  };

  return { formState, onChangeHandler, resetForm };
}
