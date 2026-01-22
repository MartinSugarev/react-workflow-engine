import { ReactNode } from "react";

interface SummaryContainerProps {
  children: ReactNode;
}

export default function SummaryContainer({children}: SummaryContainerProps) {
  return (
    <div className="flex flex-wrap gap-4">
       {children}
    </div>
  )
}
