import { useState, useEffect } from "react";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(localStorage.getItem(key));

  useEffect(() => {
    // Get the item from localStorage
    const storedValue = localStorage.getItem(key);

    // If the item exists in localStorage, update the state
    if (storedValue !== null) {
      setValue(storedValue);
    }
  }, [key]);

  return value;
};

export default useLocalStorage;
