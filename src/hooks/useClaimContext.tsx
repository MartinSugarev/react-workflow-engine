import { useContext, useMemo } from "react";
import { ClaimContext } from "../context/claimContext/ClaimContext";
import { SingleClaimType } from "../types/dashboard";

export function useClaimContext() {
  const ctx = useContext(ClaimContext);
  if (!ctx) {
    throw new Error("No context applied");
  }

  const { state, loading } = ctx;
  const { allItems, appliedFilters, sortingRules, searchValue } = state;

  
 const filteredItems = useMemo(() => {
  console.log('1');
  
    if (appliedFilters.length === 0) return [...allItems];

    const result: SingleClaimType[] = [];
    appliedFilters.forEach(filter => {
      const filtered = allItems.filter(
        claim => claim.status === filter || claim.claimType === filter
      );
      result.push(...filtered);
    });

    return result;
  }, [allItems, appliedFilters]);

  
  const sortedItems = useMemo(() => {
    console.log('2');
    
    if (sortingRules.length === 0) return [...filteredItems];

    const result = [...filteredItems];
    switch (sortingRules[0]) {
      case "OLDEST":
        result.sort((a, b) => new Date(a.dateSubmitted).getTime() - new Date(b.dateSubmitted).getTime());
        break;
      case "NEWEST":
        result.sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime());
        break;
      case "ASCENDING":
        result.sort((a, b) => a.claimAmount - b.claimAmount);
        break;
      case "DESCENDING":
        result.sort((a, b) => b.claimAmount - a.claimAmount);
        break;
    }
    return result;
  }, [filteredItems, sortingRules]);

  
  const searchedItems = useMemo(() => {
    console.log('searchValue ', searchValue);
    console.log('sortedItems ', sortedItems);
    if (!searchValue) return [...sortedItems];

    
    const lowerSearch = searchValue.toLowerCase();
    return sortedItems.filter(
      claim =>
        claim.claimNumber.toLowerCase().includes(lowerSearch) ||
        claim.policyholderName.toLowerCase().includes(lowerSearch)
    );
  }, [sortedItems, searchValue]);

  return {searchedItems, loading};
}
