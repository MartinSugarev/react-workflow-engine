import React, { ReactNode } from "react"
interface ControlContainerProps {
    children: ReactNode
}

const ControlContainer: React.FC<ControlContainerProps> = ({children}) => {
  return (
    <div className="flex flex-wrap justify-end gap-2">
       {children}
    </div>
  )
}

export default ControlContainer
