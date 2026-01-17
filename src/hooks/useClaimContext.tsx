import { useContext } from "react";
import { ClaimContext } from "../context/claimContext/ClaimContext";
import { SingleClaimType } from "../types/dashboard";

export function useClaimContext() {
  const ctx = useContext(ClaimContext);
  if (!ctx){
    throw new Error("No context applied")
  }
  const {state} = ctx;
  const {allItems, appliedFilters, sortingRules, updatedItem} = state;
   

  const result: SingleClaimType[] = appliedFilters.length === 0 ? [...allItems] : [];
  if (appliedFilters.length !== 0 ) {
    appliedFilters.forEach(filter => {
    const filtered = allItems.filter(claim => claim.status === filter || claim.claimType === filter)
    result.push(...filtered)
  })
  }

  if (sortingRules.length !== 0) {
    
     switch (sortingRules[0]) {

    case 'OLDEST':    
        result.sort(
          (a, b) => new Date(a.dateSubmitted).getTime() - new Date(b.dateSubmitted).getTime())
        break;  
      
    case 'NEWEST':
         result.sort(
          (a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime());
         break; 

    case 'ASCENDING':
          result.sort((a, b) => a.claimAmount - b.claimAmount);
        break;  

    case 'DESCENDING':
          result.sort((a, b) => b.claimAmount - a.claimAmount)
        break;  
  }
     }

     return result
  }

