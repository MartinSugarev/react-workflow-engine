interface Totals {
    description: string,
    counter: number | undefined
}
export default function Totals({description, counter}: Totals) {
  return (
    <span>
      {description}: {counter}
    </span>
  )
}
