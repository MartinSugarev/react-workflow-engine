import {
  FilterStateType,
  FilterTypes,
  SingleClaimType,
  SortState,
  StatusType,
} from "../types/dashboard.types";
import showAllVisibleItems from "../utils/showAllVisibleItems";
export type FilterAction =
  | { type: "SET_INITIAL_CLAIMS"; payload: SingleClaimType[] }
  | { type: "FILTER_APPLIED"; payload: FilterTypes[] }
  | { type: "UPDATE_CLAIM_STATUS"; payload: { id: string; status: StatusType } }
  | { type: "ADDED_SORTING_RULE"; payload: SortState }
  | { type: "CLEAR_ALL_FILTERS" }
  | { type: "SEARCH"; payload: string };

export function reducer(state: FilterStateType, action: FilterAction): FilterStateType {

  switch (action.type) {

    case "SET_INITIAL_CLAIMS":
      return { 
        ...state,
         allItems: action.payload,
         showedClaims:  showAllVisibleItems({
          ...state,
          allItems: action.payload
         })};

    case "FILTER_APPLIED":
      return { 
        ...state, 
        appliedFilters: action.payload,
        showedClaims: showAllVisibleItems({
          ...state,
          appliedFilters: action.payload
        }) };

    case "ADDED_SORTING_RULE":

      return { 
         ...state,
         sortingRules: action.payload,
         showedClaims: showAllVisibleItems({
          ...state,
          sortingRules: action.payload
         }) };

    case "UPDATE_CLAIM_STATUS":
      return {
        ...state,
        allItems: [
          ...state.allItems.map((claim) =>
            claim.id === action.payload.id
              ? { ...claim, status: action.payload.status }
              : { ...claim },
          ),
        ],
        showedClaims: showAllVisibleItems({
          ...state,
          updatedItem: action.payload
        })
      };
    case "CLEAR_ALL_FILTERS":
      return {
        ...state,
        appliedFilters: [],
        showedClaims: showAllVisibleItems({
          ...state,
          appliedFilters: []
        })
      };
    case "SEARCH":
      return {
        ...state,
        searchValue: action.payload,
        showedClaims: showAllVisibleItems({
          ...state,
          searchValue: action.payload
        })
      };

    default:
            return state
  }
}