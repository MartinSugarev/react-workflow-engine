import { ReactNode } from "react"

interface ControlContainerProps {
    children: ReactNode
}

export default function ControlContainer({children}: ControlContainerProps) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
       {children}
    </div>
  )
}
