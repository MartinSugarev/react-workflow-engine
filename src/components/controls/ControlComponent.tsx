import React, { useState } from 'react'
import ControlContainer from './ControlContainer'
import DropdownMenu from './DropdownMenu'
import { FilterTypes, SortingType } from '../../types/dashboard';
import Button from '../ui/Button';
import { useClaimContext } from '../../hooks/useClaimContext';

const SORT_OPTIONS:SortingType[] = ['OLDEST', 'NEWEST', 'DESCENDING', 'ASCENDING'];
const FILTER_OPTIONS: FilterTypes[] = ["Submitted", "Under Review", "Approved", "Rejected", "Pending Documentation", "Auto", "Home", "Health", "Life"]
export default function ControlComponent() {
  const ctx = useClaimContext();
  const {dispatch} = ctx;
  const [selected, setSelected] = useState<FilterTypes[]>([]);

  function handleChangeFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setSelected(values as FilterTypes[]);
  }

  function handleClickFilter() {
     dispatch({type: 'FILTER_APPLIED', payload: selected})
  }

    function handleChangeSort(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOption = e.target.selectedOptions[0].text.toUpperCase() as SortingType
    dispatch({type: selectedOption})
  }

  return (
    <ControlContainer>
        <DropdownMenu title="Sort" handleChangeFn={handleChangeSort} options={SORT_OPTIONS} multiple={false} size={0} />
        <DropdownMenu title="Filter" handleChangeFn={handleChangeFilter} multiple={true} size={1} options={FILTER_OPTIONS}>
          <Button text="Filter" handleClick={handleClickFilter} />
        </DropdownMenu>
    </ControlContainer>
  )
}
