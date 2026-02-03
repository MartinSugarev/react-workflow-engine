import { useCallback, useEffect, useRef, useState } from "react";
interface DataType {
  id: string;
  claimNumber: string;
  policyholderName: string;
  claimType: string;
  status: string;
  claimAmount: number;
  dateSubmitted: string;
  assignedAdjuster: string;
}
interface OptionWithBody {
  method: "POST" | "PUT" | "PATCH";
  body: string;
}
interface OptionWithoutBody {
  method: "GET";
}

type OptionsProp = (OptionWithBody | OptionWithoutBody) & {
  headers?: {
    "Content-Type": "application/json" | "text/xml";
  };
};

export default function useFetch(url: string, options?: OptionsProp) {
  const [data, setData] = useState<DataType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const apiCall = useCallback(async () => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        ...options,
        signal: controllerRef.current.signal,
      });
      if (!res.ok) {
        throw new Error(`${res.statusText}`);
      }
      const data = await res.json();
      setData(data);
    } catch (e: unknown) {
      const error = e instanceof Error ? e : new Error(String(e));

      if (error.name !== "AbortError") {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    apiCall();
    return () => controllerRef.current?.abort();
  }, []);

  return { data, loading, error, refetch: apiCall };
}