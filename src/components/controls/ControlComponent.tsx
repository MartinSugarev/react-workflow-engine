import React, { useCallback, useEffect, useState } from 'react'
import ControlContainer from './ControlContainer'
import { FILTER_OPTIONS_TUPLE, FilterTypes, SORT_BY_OPTIONS, SORT_ORDER_OPTIONS, SortBy, SortOrder } from '../../types/dashboard.types';
import Button from '../ui/Button';
import useDebouncer from '../../hooks/useDebouncer';
import { useClaimActionContext } from '../../hooks/useClaimActionContext';
import Select from '../ui/Select';

const isFilterType = (value: string): value is FilterTypes => {
   return (FILTER_OPTIONS_TUPLE as readonly string[]).includes(value)
}


const isSortBy = (value: string): value is SortBy => {
  return (SORT_BY_OPTIONS as readonly string[]).includes(value);
};

const isSortOrder = (value: string): value is SortOrder => {
  return (SORT_ORDER_OPTIONS as readonly string[]).includes(value);
};



const ControlComponent: React.FC = () => {
  
  const {searchClaims, applyFilters, addSortingRules, clearAllFilters} = useClaimActionContext()
  const [selectedFilterValue, setSelectedFilterValue] = useState<FilterTypes[]>([]);
  const [searchInput, setSearchInput] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortBy>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("DESC");
  const debouncedSearchValue = useDebouncer(searchInput, 500)  



  useEffect(() => {
    searchClaims(debouncedSearchValue);
}, [debouncedSearchValue]);


  const handleChangeFilter = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions).map(opt => opt.value).filter(isFilterType);
    setSelectedFilterValue(values);
  }, [])

  const handleClickFilter = useCallback(() => {
     applyFilters(selectedFilterValue)
  }, [selectedFilterValue])
  
    const handleClearFilters = useCallback(() => {
    setSelectedFilterValue([])
    clearAllFilters()
    },[])

const applySort = useCallback(
  (field: SortBy, order: SortOrder) => {
    if (!field) return;
    addSortingRules({ field, order });
  },
  [],
);
  

  const handleChangeSortBy = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const next = e.target.value;
      if (!isSortBy(next)) return;

      setSortBy(next);

      applySort(next, sortOrder);
    },
    [sortOrder],
  );

  const handleChangeSortOrder = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const next = e.target.value;
      if (!isSortOrder(next)) return;

      setSortOrder(next);
      applySort(sortBy, next);
    },
    [sortBy],
  );



  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
      setSearchInput(e.target.value)
  } 

  return (
    <ControlContainer>
      <label>
        {'Search: '} 
        <input onChange={handleSearch} value={searchInput} type='search' className='border rounded p-1' /> 
      </label>
        
    <div className="flex gap-2">
        <div>
          <label className="mr-1">
            {"Sort by "}
            <Select
              title={"Sort"}
              handleChangeFn={handleChangeSortBy}
              value={sortBy}
              options={SORT_BY_OPTIONS}
              multiple={false}
              size={0}
            />
          </label>
        </div>

        <div>
          <label className="mr-1">
            {"Order "}
            <Select
              handleChangeFn={handleChangeSortOrder}
              value={sortOrder}
              options={SORT_ORDER_OPTIONS}
              multiple={false}
              size={0}
            />
          </label>
        </div>



             <div>
              <label className='mr-1'>{'Filter'}
                <Select title={'Filter'} handleChangeFn={handleChangeFilter} value={selectedFilterValue} options={FILTER_OPTIONS_TUPLE} multiple={true} size={1}/>
              </label>
               <Button text="Filter" handleClick={handleClickFilter} />
            </div>
        <Button text='Clear filters' handleClick={handleClearFilters} />
      </div>
    </ControlContainer>
  )
}
export default ControlComponent;