import React from 'react';
import { ClaimType, StatusType } from '../../../types/dashboard.types'
interface CardHeaderType {
claimNumber: string;
claimType: ClaimType;
status: StatusType;
}
const CardHeader: React.FC<CardHeaderType> = ({claimNumber, claimType, status}) => {

  return (
    <div className="flex justify-between items-center mb-2 gap-2">
        <h3 className="font-bold">
          {claimNumber} - {claimType}
        </h3>
        <span>{status}</span>
    </div>
  )
}
export default CardHeader