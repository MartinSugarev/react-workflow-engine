import { FilterState, FilterTypes, SingleClaimType } from "../types/dashboard";

export type FilterAction =
  | { type: 'NO_FILTER_APPLIED' }
  | { type: 'SET_INITIAL_CLAIMS'; payload: SingleClaimType[] }
  | { type: 'FILTER_APPLIED'; payload: FilterTypes[] }
  | { type: 'OLDEST' }
  | { type: 'NEWEST' }
  | { type: 'ASCENDING' }
  | { type: 'DESCENDING' }
  | { type: 'UPDATE_CLAIM_STATUS'; payload: {id: string, status: string}};

export function reducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'NO_FILTER_APPLIED':
      return { ...state, filteredItems: [...state.allItems] };

    case 'SET_INITIAL_CLAIMS':
      return { allItems: [...action.payload], filteredItems: [...action.payload], appliedFilters: [] };

    case 'FILTER_APPLIED': {
      const result: SingleClaimType[] = [];
      action.payload.forEach(f => {
        const filtered = state.allItems.filter(c => c.status === f || c.claimType === f);        
        result.push(...filtered);
      });

      return { ...state, 
             filteredItems: action.payload.length === 0 ? [...state.allItems] : result, 
             appliedFilters: [...action.payload] };
         }

    case 'OLDEST':
      return {
        ...state,
        filteredItems: [...state.filteredItems].sort(
          (a, b) => new Date(a.dateSubmitted).getTime() - new Date(b.dateSubmitted).getTime()
        )
      };

    case 'NEWEST':
      return {
        ...state,
        filteredItems: [...state.filteredItems].sort(
          (a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime()
        )
      };

    case 'ASCENDING':
      return {
        ...state,
        filteredItems: [...state.filteredItems].sort((a, b) => a.claimAmount - b.claimAmount)
      };

    case 'DESCENDING':
      return {
        ...state,
        filteredItems: [...state.filteredItems].sort((a, b) => b.claimAmount - a.claimAmount)
      };

    case 'UPDATE_CLAIM_STATUS': 
       state.filteredItems.forEach(claim => {
        if(claim.id === action.payload.id) {
          claim.status = action.payload.status
        }
       })
      
      return {
        ...state,
        filteredItems: [...state.filteredItems]
      };  

    default:
      return state;
  }
}