import { useEffect, useState } from "react";
const  customData =  {
    "id": "14",
    "claimNumber": "CLM014",
    "policyholderName": "Ava Green",
    "claimType": "Home",
    "status": "Rejected",
    "claimAmount": 3800,
    "dateSubmitted": "2025-12-28",
    "assignedAdjuster": "Bob"
  }

type DataType = typeof customData;

interface OptionWithBody {
    method: 'POST'  | 'PUT' | 'PATCH';
    body: string;
} 

interface OptionWithoutBody {
    method: 'GET';
} 

type OptionsProp =
  (OptionWithBody | OptionWithoutBody) & {
    headers?: {
      "Content-Type": "application/json" | "text/xml";
    };
  };


export default function useFetch(url: string, options?: OptionsProp) {
   const [data, setData] = useState<DataType[] | null>(null)
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<Error | null>(null);
   const controller = new AbortController();

  useEffect(() => {
    
    apiCall()    

    return () => controller.abort();
   }, [url])


    async function apiCall() {
        setLoading(true)    
        setError(null);
    try {
        const res = await fetch(url, { 
        ...options,  
        signal: controller.signal,
    });
        if(!res.ok) {
        setLoading(false);
        throw new Error(`${res.statusText}`)     
        }
        const data = await res.json()
        setData(data)

    } catch (e: any) {
        setError(e)
    }
        setLoading(false)
   }
     
   return { data, loading, error, refetch: apiCall }
}
