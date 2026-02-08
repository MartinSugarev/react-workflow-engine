import React, { ReactNode } from "react"
interface ControlContainerProps {
  children: ReactNode
}

const ControlContainer: React.FC<ControlContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-start sm:justify-center items-end gap-2 ">
      {children}
    </div>
  )
}

export default ControlContainer
