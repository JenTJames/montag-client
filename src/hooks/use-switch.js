import { useState } from "react";

const useSwitch = () => {
  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const reset = (isChecked) => {
    setChecked(isChecked);
  };

  return {
    checked,
    handleCheck,
    reset,
  };
};

export default useSwitch;
