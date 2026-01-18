import { ReactNode } from 'react';
import { Options } from '../../types/dashboard';
import Select from '../ui/Select';

interface DropdownMenuProps {
  title: string,
  options: Options,
  handleChangeFn: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  children?: ReactNode,
  multiple: boolean,
  size: number,
  ref?: React.RefObject<HTMLSelectElement | null>
}
export default function DropdownMenu({ title, options, handleChangeFn, multiple, size, children , ref}: DropdownMenuProps) {

  return (
    <div>
      <label className='mr-1'>{`${title} `}
        <Select handleChangeFn={handleChangeFn} ref={ref} options={options} multiple={multiple} size={size} title={title}/>
      </label>
      {children}
    </div>
  );
}