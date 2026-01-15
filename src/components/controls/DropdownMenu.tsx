import { ReactNode } from 'react';
import { Options } from '../../types/dashboard';
import Select from '../ui/Select';

interface DropdownMenuProps {
  title: string,
  options: Options,
  handleChangeFn: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  children?: ReactNode,
  multiple: boolean,
  size: number
}
export default function DropdownMenu({ title, options, handleChangeFn, multiple, size, children }: DropdownMenuProps) {

  return (
    <div>
      <label className='mr-1'>{`${title} `}
        <Select handleChangeFn={handleChangeFn} options={options} multiple={multiple} size={size} title={title}/>
      </label>
      {children}
    </div>
  );
}