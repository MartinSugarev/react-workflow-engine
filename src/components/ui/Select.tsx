import React, { ChangeEvent } from 'react'
import { Options } from '../../types/dashboard'
interface SelectProps {
    multiple: boolean;
    handleChangeFn: (e: ChangeEvent<HTMLSelectElement>) => void;
    size: number;
    options: Options;
    value?: string;
    title?: string;
    ref?: React.RefObject<HTMLSelectElement | null>
}
export default function Select({multiple, handleChangeFn, size, options, value, title, ref}: SelectProps) {
  return (
    <select ref={ref}  className="hover:cursor-pointer px-2 py-1 border rounded" value={value} onChange={handleChangeFn} multiple={multiple} size={size}>
        {title === 'Sort' && <option hidden value="">-- Select --</option>}
        {options.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
        ))}
    </select>
  )
}
