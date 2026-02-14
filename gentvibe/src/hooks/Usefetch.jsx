import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (initialUrl) => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, setUrl, loading };
};
