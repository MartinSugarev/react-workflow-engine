import React, { createContext, ReactNode, useEffect, useReducer, useCallback, useMemo } from "react";
import { FilterStateType, FilterTypes, SingleClaimType, SortState, UpdatedItemProps } from "../../types/dashboard.types";
import { reducer } from "../../reducers/claimsReducer";
import useFetch from "../../hooks/useFetch";
import { ClaimsActionContext } from "./ClaimsActionContext";
export interface ClaimContextType {
  allItems: SingleClaimType[];
  filteredItems: SingleClaimType[];
  appliedFilters: FilterTypes[];
  sortingRules: SortState;
  updatedItem: UpdatedItemProps | null;
  searchValue: string;
  showedClaims: SingleClaimType[];
  loading: boolean;
  error: Error | null;
}

export const ClaimContext = createContext<ClaimContextType | null>(null);

const initialState: FilterStateType = {
  allItems: [],
  filteredItems: [],
  appliedFilters: [],
  sortingRules: null,
  updatedItem: null,
  searchValue: "",
  showedClaims: []
};

const ClaimProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: claimsData, loading, error } = useFetch("/claims.json");
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInitialClaims = useCallback((claims: SingleClaimType[]): void => {
  dispatch({ type: "SET_INITIAL_CLAIMS", payload: claims });
},[])

    useEffect(() => {
      setInitialClaims(claimsData );
  }, [claimsData]);

const applyFilters = useCallback((filters: FilterTypes[]): void => {
  dispatch({ type: "FILTER_APPLIED", payload: filters });
}, []) 

const addSortingRules = useCallback((rules: SortState): void => {
  dispatch({ type: "ADDED_SORTING_RULE", payload: rules });
}, [])

const updateClaimStatus = useCallback((payload: UpdatedItemProps): void => {
  dispatch({ type: "UPDATE_CLAIM_STATUS", payload });
}, [])

const clearAllFilters = useCallback((): void => {
  dispatch({ type: "CLEAR_ALL_FILTERS" });
}, [])

const searchClaims = useCallback((value: string): void => {
  dispatch({ type: "SEARCH", payload: value });
}, [])


const actionsValue = useMemo(() => ({
  searchClaims,
  clearAllFilters,
  addSortingRules,
  applyFilters,
  setInitialClaims,
  updateClaimStatus,
}), []);

  
  return (
    <ClaimContext.Provider
      value={{
        ...state,
        loading,
        error,
 
      }}
    >
      <ClaimsActionContext.Provider value={actionsValue}>

      {children}
      </ClaimsActionContext.Provider>
    </ClaimContext.Provider>
  );
};
export default ClaimProvider;
