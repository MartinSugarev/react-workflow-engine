import React, { ReactNode } from "react";

interface SummaryContainerProps {
  children: ReactNode;
}

const SummaryContainer: React.FC<SummaryContainerProps> = ({children}) => {
  return (
    <div className="flex flex-wrap gap-4">
       {children}
    </div>
  )
}

export default SummaryContainer
