import { useEffect, useState } from "react";
import { SingleClaimType } from "../types/dashboard";

interface OptionWithBody {
  method: "POST" | "PUT" | "PATCH";
  body: string;
}

interface OptionWithoutBody {
  method: "GET";
}

type OptionsProp =
  (OptionWithBody | OptionWithoutBody) & {
    headers?: {
      "Content-Type": "application/json" | "text/xml";
    };
  };

export default function useFetch(
  url: string,
  options?: OptionsProp
) {
  const [data, setData] = useState<SingleClaimType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const controller = new AbortController();

  useEffect(() => {
    apiCall();

    return () => controller.abort();
  }, [url]);

  async function apiCall() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const fetchedData: SingleClaimType[] = await res.json();
      setData(fetchedData);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error };
}
