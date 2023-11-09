import { useCallback, useState } from "react";

const useInput = () => {
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

  const onChange = (event) => {
    setError(null);
    setValue(event.target.value);
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

export default useInput;
