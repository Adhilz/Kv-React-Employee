import { useEffect, useState } from "react";

type Employee = {
  id: number;
  name: string;
};
function useFetch(url: string) {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response =
          await fetch(url);

        if (!response.ok) {
    throw new Error(
      `HTTP Error: ${response.status}`
    );
  }
        const result =
          await response.json();

        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error
  };
}

export default useFetch;