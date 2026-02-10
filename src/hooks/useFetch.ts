import { useCallback, useEffect, useRef, useState } from 'react';

import { OptionsPropType, SingleClaimType } from '../types/dashboard.types';

export default function useFetch(url: string, options?: OptionsPropType) {
  const [data, setData] = useState<SingleClaimType[]>([]);
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

      if (error.name !== 'AbortError') {
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
