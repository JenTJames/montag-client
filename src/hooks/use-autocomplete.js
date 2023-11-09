import { useCallback, useState } from "react";

const useAutoComplete = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  const activateCustomError = (message) => {
    setError(message);
  };

  const activateRequiredError = () => {
    setError("This field is required!");
  };

  const deactivateError = () => {
    setError(null);
  };

  const onChange = (newValue) => {
    setError(null);
    setValue(newValue);
  };

  const onBlur = () => {
    if (!value) {
      activateRequiredError();
    } else {
      setError(null);
    }
  };

  const reset = useCallback((newValue) => {
    setError(null);
    if (newValue) {
      setValue(newValue);
    } else {
      setValue("");
    }
  }, []);

  return {
    value,
    reset,
    onChange,
    onBlur,
    error,
    controlError: {
      activateRequiredError,
      activateCustomError,
      deactivateError,
    },
  };
};

export default useAutoComplete;
