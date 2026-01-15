import { ReactNode } from "react";

interface CardProps {
  children: ReactNode; 
}

export default function DashboardContainer ({ children }: CardProps){
  return (
    <div className="h-full">
      {children}
    </div>
  );
};