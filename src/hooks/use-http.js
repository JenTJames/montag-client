import { useCallback, useState } from "react";
import axios from "axios";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const requestData = useCallback(async (endpoint, method, data) => {
    setIsLoading(true);
    let response;
    try {
      response = await axios({
        method: method ? method : "GET",
        data: data ? data : null,
        url: import.meta.env.VITE_BACKEND_BASE_URL + endpoint,
      });
      return response;
    } catch (error) {
      const message =
        error.response.status === 500
          ? "Internal Server Error"
          : "Something went wrong. Please try again later";
      const err = {
        isError: true,
        error,
        message,
      };
      return err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    requestData,
  };
};

export default useHttp;
