import { useState } from "react";

const useTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabChangeHandler = (_, newValue) => {
    setTabIndex(newValue);
  };

  return {
    tabIndex,
    tabChangeHandler,
  };
};

export default useTabs;
