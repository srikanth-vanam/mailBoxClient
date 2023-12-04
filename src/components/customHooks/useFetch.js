import { useState } from "react";
import { useEffect } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    //
    const fetchData = async () => {
      try {
        let response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("response not ok!");
        }
        let result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [url, options]);
  console.log("data in useFetch is", data);
  return { data, error };
};

export default useFetch;
