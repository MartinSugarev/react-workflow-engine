import React, { useContext, useEffect, useRef, useState } from 'react'
import ControlContainer from './ControlContainer'
import DropdownMenu from './DropdownMenu'
import { FilterTypes, SortingType } from '../../types/dashboard';
import Button from '../ui/Button';
import { ClaimContext } from '../../context/claimContext/ClaimContext';
import useDebouncer from '../../hooks/useDebouncer';

const SORT_OPTIONS:SortingType[] = ['OLDEST', 'NEWEST', 'DESCENDING', 'ASCENDING'];
const FILTER_OPTIONS: FilterTypes[] = ["Submitted", "Under Review", "Approved", "Rejected", "Pending Documentation", "Auto", "Home", "Health", "Life"]
export default function ControlComponent() {
  const ctx = useContext(ClaimContext);
  if (!ctx) return
  const {dispatch} = ctx;
  const [selected, setSelected] = useState<FilterTypes[]>([]);
  const [inputState, setInputState] = useState<string>('')
  const filterRef = useRef<HTMLSelectElement>(null)
  const debouncedSearchValue = useDebouncer(inputState, 500)  

  useEffect(() => {
    dispatch({ type: 'SEARCH', payload: debouncedSearchValue});
}, [debouncedSearchValue]);


  function handleChangeFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setSelected(values as FilterTypes[]);
  }

    function handleClickFilter() {
     dispatch({type: 'FILTER_APPLIED', payload: selected})
  }

    function handleChangeSort(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOption = e.target.selectedOptions[0].text.toUpperCase() as SortingType    
    dispatch({type: 'ADDED_SORTING_RULE', payload: [selectedOption]})
    }  

  function handleClearFilters() {
    const select = filterRef.current;
    if (!select) return;

    Array.from(select.options).forEach(option => {
    option.selected = false;
  });
    dispatch({type: 'CLEAR_ALL_FILTERS'})
    }  

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
      setInputState(e.target.value)
  } 

  return (
    <ControlContainer>
      <label>
        {'Search: '} 
        <input onChange={handleSearch} value={inputState} type='search' className='border rounded p-1' /> 
      </label>
      <div className='flex gap-2'> 
       <DropdownMenu title="Sort" handleChangeFn={handleChangeSort}  options={SORT_OPTIONS} multiple={false} size={0} />
       <DropdownMenu title="Filter" handleChangeFn={handleChangeFilter} ref={filterRef} multiple={true} size={1} options={FILTER_OPTIONS}>
          <Button text="Filter" handleClick={handleClickFilter} />
        </DropdownMenu>
        <Button text='Clear filters' handleClick={handleClearFilters} />
      </div>
    </ControlContainer>
  )
}