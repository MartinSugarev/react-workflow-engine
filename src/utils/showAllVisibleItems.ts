import {
  FilterStateType,
  SingleClaimType,
  FilterTypes,
  UpdatedItemProps,
  SortState,
} from "../types/dashboard.types";

function applyUpdateItem(
  items: SingleClaimType[],
  updatedItem: UpdatedItemProps | null,
): SingleClaimType[] {
  if (!updatedItem) return items;

  return items.map((claim) =>
    claim.id === updatedItem.id
      ? { ...claim, status: updatedItem.status }
      : claim,
  );
}

function getFilteredItems(
  allItems: SingleClaimType[],
  appliedFilters: FilterTypes[],
): SingleClaimType[] {
  if (appliedFilters.length === 0) return allItems;

  const result: SingleClaimType[] = [];
  appliedFilters.forEach((filter) => {
    const filtered = allItems.filter(
      (claim) => claim.status === filter || claim.claimType === filter,
    );
    result.push(...filtered);
  });


  return Array.from(new Set(result));
}

function getSortedItems(
  items: SingleClaimType[],
  sort: SortState,
): SingleClaimType[] {
  if (!sort) return items;

  const { field, order } = sort;
  const result = [...items];

  switch (field) {
    case "DATE":
      if (order === "ASC") {
        result.sort(
          (a, b) =>
            new Date(a.dateSubmitted).getTime() -
            new Date(b.dateSubmitted).getTime(),
        );
      } else {
        result.sort(
          (a, b) =>
            new Date(b.dateSubmitted).getTime() -
            new Date(a.dateSubmitted).getTime(),
        );
      }
      break;

    case "AMOUNT":
      if (order === "ASC") {
        result.sort((a, b) => a.claimAmount - b.claimAmount);
      } else {
        result.sort((a, b) => b.claimAmount - a.claimAmount);
      }
      break;
  }

  return result;
}


function getSearchedClaims(
  items: SingleClaimType[],
  searchValue: string,
): SingleClaimType[] {
  if (!searchValue) return items;

  const lowerSearch = searchValue.toLowerCase();
  return items.filter(
    (claim) =>
      claim.claimNumber.toLowerCase().includes(lowerSearch) ||
      claim.policyholderName.toLowerCase().includes(lowerSearch),
  );
}

const showAllVisibleItems = (ctx: FilterStateType) => {
  const { allItems, appliedFilters, sortingRules, searchValue, updatedItem } =
    ctx;

  const updatedItems = applyUpdateItem(allItems, updatedItem);
  const filteredItems = getFilteredItems(updatedItems, appliedFilters);
  const sortedItems = getSortedItems(filteredItems, sortingRules);
  const searchedItems = getSearchedClaims(sortedItems, searchValue);

  return searchedItems ;
};

export default showAllVisibleItems;
