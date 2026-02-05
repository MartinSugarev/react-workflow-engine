import React, { memo } from "react"
interface Totals {
    description: string,
    counter: number | undefined
}
const Totals: React.FC<Totals> = ({description, counter}) => {
  return (
    <span>
      {description}: {counter}
    </span>
  )
}

export default memo(Totals)