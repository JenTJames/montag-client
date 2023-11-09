import { useCallback, useState } from "react";

const useToast = () => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    severity: "error",
  });

  const createToast = useCallback((message, severity) => {
    setToast({
      show: true,
      message,
      severity,
    });
  }, []);

  const closeToast = () => {
    setToast((currentToast) => {
      return {
        ...currentToast,
        show: false,
      };
    });
  };

  return {
    toast,
    createToast,
    closeToast,
  };
};

export default useToast;
