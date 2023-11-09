import { useState } from "react";

const useData = () => {
  const [data, setData] = useState([]);

  const get = () => {
    return data;
  };

  const reset = () => {
    setData([]);
  };

  const filterById = (id) => {
    setData((currentData) => currentData.filter((x) => x.id !== id));
  };

  const add = (position, newData) => {
    if (position > 0) {
      setData((currentData) => [newData, ...currentData]);
      return;
    }
    setData((currentData) => [...currentData, newData]);
  };

  const update = (newData) => {
    setData((currentData) => {
      const tempData = [...currentData];
      const index = tempData.findIndex((x) => x.id === newData.id);
      tempData[index] = newData;
      return tempData;
    });
  };

  return {
    get,
    add,
    reset,
    update,
    setData,
    filterById,
  };
};

export default useData;
