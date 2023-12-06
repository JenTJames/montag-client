import { useState } from "react";

const useModal = () => {
  const [modal, setModal] = useState({
    show: false,
    title: "",
    description: "",
    severity: "success",
    positiveButtonText: "Confirm",
    negetiveButtonText: "",
  });

  const showModal = (
    title,
    description,
    severity = "success",
    positiveButtonText = "Confirm",
    negetiveButtonText
  ) => {
    setModal({
      show: true,
      title,
      description,
      severity,
      positiveButtonText,
      negetiveButtonText,
    });
  };

  const hideModal = () => {
    setModal((currentState) => {
      return {
        ...currentState,
        show: false,
      };
    });
  };

  return {
    modal,
    showModal,
    hideModal,
  };
};

export default useModal;
