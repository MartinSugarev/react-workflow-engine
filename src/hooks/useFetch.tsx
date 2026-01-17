import { useEffect, useState } from 'react'
import { SingleClaimType } from '../types/dashboard';
export default function useFetch(url: string) {
    const [value, setValue] = useState<SingleClaimType[]>([]);
    const controller = new AbortController();

    useEffect(() => {

        fetchData()

        return () => controller.abort();
    }, [])
    
    async function fetchData() {
        try {
            //HANDLE ERRORS    
            const response = await fetch(url, { signal: controller.signal });
            const claims = await response.json();
            setValue(claims)
            } catch (error) {
            console.log(error);
            }
        }

    return value
}