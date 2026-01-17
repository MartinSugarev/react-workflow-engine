import { UpradetedItemProps } from "../context/claimContext/ClaimContext";

export const STATUS_TYPES_TUPLE = ["Submitted", "Under Review", "Approved", "Rejected", "Pending Documentation"] as const;
export const CLAIM_TYPES_TUPLE = ["Auto", "Home", "Health", "Life"] as const;
export const SORTING_TYPES_TUPLE = ["OLDEST", "NEWEST", "DESCENDING", "ASCENDING"] as const;

export type StatusType = typeof STATUS_TYPES_TUPLE[number];

export type ClaimType = typeof CLAIM_TYPES_TUPLE[number];

export type SortingType = typeof SORTING_TYPES_TUPLE[number];

export type FilterTypes = StatusType | ClaimType

export type Options =  FilterTypes[] | SortingType[] | StatusType[];

export type SingleClaimType = {
  id: string;
  claimNumber: string;
  policyholderName: string;
  claimType: string;
  status: string;
  claimAmount: number;
  dateSubmitted: string;
  assignedAdjuster: string;
};

export interface FilterState {
  allItems: SingleClaimType[];      
  filteredItems: SingleClaimType[]; 
  appliedFilters: FilterTypes[];
  sortingRules: SortingType[];
  updatedItem: UpradetedItemProps
}