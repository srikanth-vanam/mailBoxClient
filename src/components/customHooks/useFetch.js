// import { useState } from "react";
import { useEffect } from "react";

const useFetch = (url, options) => {
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  const resultObj={
    data:null,
    error:null,
  };
  useEffect(() => {
    //
    const fetchData = async () => {
      try {
        let response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("response not ok!");
        }
        let result = await response.json();
        resultObj.data=result;
        // setData(result);
      } catch (err) {
        resultObj.error=err
        // setError(err);
      }
    };
    fetchData();
  }, [url, options]);
  return resultObj;
};

export default useFetch;
