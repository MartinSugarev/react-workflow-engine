import { createContext, ReactNode, useEffect } from 'react';
import { SingleClaimType, FilterState, FilterTypes } from '../../types/dashboard';
import { FilterAction, reducer } from '../../reducers/claimsReducer';
import { useReducer } from 'react';
import useFetch from '../../hooks/useFetch';

export interface ClaimContextType {
  state: FilterState;
  dispatch: (action: FilterAction) => void,
  appliedFilters: FilterTypes[]
}

export const ClaimContext = createContext<ClaimContextType | null>(null);

const initialState: FilterState = {
    allItems: [] as SingleClaimType[],
    filteredItems: [] as SingleClaimType[],
    appliedFilters: [] as FilterTypes[]
  };

export function ClaimProvider({ children }: { children: ReactNode }) {
  const claimsData = useFetch('/claims.json');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (claimsData.length > 0) {
      dispatch({ type: 'SET_INITIAL_CLAIMS', payload: claimsData });
    }
  }, [claimsData]);

  return (
    <ClaimContext.Provider
      value={{
        state,
        appliedFilters: [],
        dispatch
      }}
    >
      {children}
    </ClaimContext.Provider>
  );
}