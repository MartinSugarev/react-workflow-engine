import { createContext } from "react";
import { FilterTypes, SingleClaimType, SortState, UpdatedItemProps } from "../../types/dashboard.types";

interface ClaimsActionContextType {
  setInitialClaims: (claims: SingleClaimType[]) => void;
  applyFilters: (filters: FilterTypes[]) => void;
  addSortingRules: (rules: SortState) => void;
  updateClaimStatus: (payload: UpdatedItemProps) => void;
  clearAllFilters: () => void;
  searchClaims: (value: string) => void;
}

export const ClaimsActionContext = createContext<ClaimsActionContextType | null>(null)