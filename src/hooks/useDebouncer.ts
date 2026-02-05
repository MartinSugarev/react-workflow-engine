import { useEffect, useState } from 'react';

export default function useDebouncer<T>(
  value: T,
  delay: number
): T {
  const [state, setState] = useState<T>(value);

  useEffect(() => {
    
    const id = setTimeout(() => {
      setState(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return state;
}
