import { FilterState, FilterTypes, SingleClaimType, SortingType, StatusType } from "../types/dashboard";

export type FilterAction =
  | { type: 'NO_FILTER_APPLIED' }
  | { type: 'SET_INITIAL_CLAIMS'; payload: SingleClaimType[] }
  | { type: 'FILTER_APPLIED'; payload: FilterTypes[] }
  | { type: 'UPDATE_CLAIM_STATUS'; payload: {id: string, status: StatusType}}
  | { type: 'ADDED_SORTING_RULE'; payload: SortingType[]}

export function reducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'NO_FILTER_APPLIED':
      return { ...state };

    case 'SET_INITIAL_CLAIMS':
      return { ...state, allItems: [...action.payload] };

    case 'FILTER_APPLIED': 
      return { ...state, appliedFilters: [...action.payload]};

    case 'ADDED_SORTING_RULE':  
    return {...state, sortingRules: [...action.payload]};

    case 'UPDATE_CLAIM_STATUS':       
      return {
        ...state,
        allItems: [...state.allItems.map(claim => claim.id === action.payload.id ? {...claim, status: action.payload.status} : {...claim})]
      };  

    default:
      return state;
  }
}