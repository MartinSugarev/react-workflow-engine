import { useEffect, useState } from 'react'
import { SingleClaimType } from '../types/dashboard';
export default function useFetch(url: string) {
    const [value, setValue] = useState<SingleClaimType[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            try {
            const response = await fetch(url, { signal: controller.signal });
            const claims = await response.json();
            setValue(claims)
            } catch (error) {
            console.log(error);
            }
        }

        fetchData()

        return () => controller.abort();
    }, [])

    return value
}