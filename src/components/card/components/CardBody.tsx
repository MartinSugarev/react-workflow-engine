import React, { memo } from "react";

interface CardBodyType {
  id: string;
  claimNumber: string;
  policyholderName: string;
  claimAmount: number;
  dateSubmitted: string;
  assignedAdjuster: string;
}

const CardBody: React.FC<CardBodyType> = ({ id, assignedAdjuster, claimAmount, dateSubmitted, policyholderName }) => {

  return (
    <div className="flex-1 text-gray-700">
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Policyholder:</strong> {policyholderName}</p>
      <p><strong>Amount:</strong> ${claimAmount.toFixed(2)}</p>
      <p>
        <strong>Date Submitted:</strong>{" "}
        {new Date(dateSubmitted).toLocaleDateString()}
      </p>
      <p><strong>Assigned Adjuster:</strong> {assignedAdjuster}</p>
    </div>
  )
}

export default memo(CardBody);
