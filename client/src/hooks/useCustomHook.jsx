import { useEffect, useState } from "react";
import axiosInstance from "../services/apiServices";

export const useFetchData = (endpoint, options = {}) => {
  const [data, setData] = useState(options.initialData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(endpoint);
        if (isMounted) {
          setData(res.data?.data || []);
          setError(null);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (isMounted) {
          setError("Failed to fetch data");
          setData([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
};
