import React, { memo } from "react";
import CardHeader from "./components/CardHeader";
import CardBody from "./components/CardBody";
import { ClaimType, STATUS_TYPES_TUPLE, StatusType } from "../../types/dashboard.types";
import { useClaimActionContext } from "../../hooks/useClaimActionContext";
import Select from "../ui/Select";
export interface ClaimCardProps {
    id: string;
    claimNumber: string;
    policyholderName: string;
    claimType: ClaimType;
    status: StatusType;
    claimAmount: number;
    dateSubmitted: string;
    assignedAdjuster: string;
}

const isStatusType = (value: string): value is StatusType => {
     return (STATUS_TYPES_TUPLE as readonly string[]).includes(value)
}

const ClaimCard: React.FC<ClaimCardProps> = ({ id, status, claimType, claimNumber, assignedAdjuster, claimAmount, dateSubmitted, policyholderName }) => {


    const {updateClaimStatus} = useClaimActionContext()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dropdownStatus = e.target.value;
    if (isStatusType(dropdownStatus)) {
       updateClaimStatus({id, status: dropdownStatus});
    }
  };

  return (
    <section className="w-80 h-60 border p-4 flex flex-col justify-between">
       <CardHeader claimNumber={claimNumber} claimType={claimType} status={status} />
       <CardBody id={id} assignedAdjuster={assignedAdjuster} claimAmount={claimAmount} claimNumber={claimNumber} dateSubmitted={dateSubmitted} policyholderName={policyholderName} />
        <Select handleChangeFn={handleChange} options={STATUS_TYPES_TUPLE} value={status} multiple={false} size={0}   />
    </section>
  );
}

export default memo(ClaimCard);