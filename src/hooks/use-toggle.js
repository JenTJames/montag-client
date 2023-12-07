import { useState } from "react";

const useToggle = () => {
  const [value, setValue] = useState(false);

  const toggle = (newValue) => {
    if (!newValue) {
      setValue((currentState) => !currentState);
      return;
    }
    setValue(newValue);
  };

  return {
    value,
    toggle,
  };
};

export default useToggle;
