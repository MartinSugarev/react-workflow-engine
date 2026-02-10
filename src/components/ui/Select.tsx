import React, { ChangeEvent, memo } from 'react'
type SelectPropsType<T extends string> =
  {
    multiple: false;
    options: readonly T[];
    title?: string;
    size: number;
    value: T;
    handleChangeFn: (e: ChangeEvent<HTMLSelectElement>) => void;
  }
  | {
    multiple: true;
    options: readonly T[];
    title?: string;
    size: number;
    value: T[];
    handleChangeFn: (e: ChangeEvent<HTMLSelectElement>) => void;
  };
function Select<T extends string>({ multiple, handleChangeFn, size, options, value }: SelectPropsType<T>) {

  return (
    <select className="hover:cursor-pointer px-2 py-1 border rounded" value={value} onChange={handleChangeFn} multiple={multiple} size={size}>
      {options.map((opt, idx) => (
        <option key={idx} hidden={opt === ""} value={opt}>{opt}</option>
      ))}
    </select>
  )
}

export default memo(Select)