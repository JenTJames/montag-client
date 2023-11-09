import { useCallback, useState } from "react";
import axios from "axios";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestData = useCallback(async (endpoint, method, data) => {
    setIsLoading(true);
    const url = "http://localhost:3001/";
    try {
      const response = await axios({
        method: method ? method : "GET",
        data: data ? data : null,
        url: url + endpoint,
      });
      return response;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    requestData,
    error,
  };
};

export default useHttp;
