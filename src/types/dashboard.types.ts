export const STATUS_TYPES_TUPLE = ["Submitted", "Under Review", "Approved", "Rejected", "Pending Documentation"] as const;
export const CLAIM_TYPES_TUPLE = ["Auto", "Home", "Health", "Life"] as const;
export const FILTER_OPTIONS_TUPLE = ["Submitted", "Under Review", "Approved", "Rejected", "Pending Documentation", "Auto", "Home", "Health", "Life"] as const;
export const SORT_BY_OPTIONS = ["", "DATE", "AMOUNT"] as const;
export const SORT_ORDER_OPTIONS = ["ASC", "DESC"] as const;

export type SortBy = (typeof SORT_BY_OPTIONS)[number];
export type SortOrder = (typeof SORT_ORDER_OPTIONS)[number];
export type StatusType = typeof STATUS_TYPES_TUPLE[number];
export type ClaimType = typeof CLAIM_TYPES_TUPLE[number];
export type SortState =
  | { field: SortBy; order: SortOrder }
  | null;

export type FilterTypes = StatusType | ClaimType

export type SingleClaimType = {
  id: string;
  claimNumber: string;
  policyholderName: string;
  claimType: ClaimType;
  status: StatusType;
  claimAmount: number;
  dateSubmitted: string;
  assignedAdjuster: string;
};

export interface UpdatedItemProps {
  id: string;
  status: StatusType;
}

export interface FilterStateType {
  allItems: SingleClaimType[];
  filteredItems: SingleClaimType[];
  appliedFilters: FilterTypes[];
  sortingRules: SortState;
  updatedItem: UpdatedItemProps | null;
  searchValue: string;
  showedClaims: SingleClaimType[];
}

interface OptionWithBodyType {
  method: "POST" | "PUT" | "PATCH";
  body: string;
}
interface OptionWithoutBodyType {
  method: "GET";
}

export type OptionsPropType = (OptionWithBodyType | OptionWithoutBodyType) & {
  headers?: {
    "Content-Type": "application/json" | "text/xml";
  };
};