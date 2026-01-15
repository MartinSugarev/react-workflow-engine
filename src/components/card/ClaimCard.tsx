import { StatusDropdown } from "./StatusDropdown";
import { useClaimContext } from "../../hooks/useClaimContext";
import CardHeader from "./components/CardHeader";
import CardBody from "./components/CardBody";

export interface Claim {
  id: string;
  claimNumber: string;
  policyholderName: string;
  claimType: string;
  status: string;
  claimAmount: number;
  dateSubmitted: string;
  assignedAdjuster: string;
}

export interface ClaimCardProps {
  claim: Claim;
}

export function ClaimCard({ claim }: ClaimCardProps) {
     const ctx = useClaimContext();
     const { dispatch } = ctx; 

function onStatusChangeFn(
  id: string,
  newStatus: string,
) {
  dispatch({
    type: "UPDATE_CLAIM_STATUS",
    payload: { id, status: newStatus },
  });
}

  return (
    <section className="w-80 h-60 border p-4 flex flex-col justify-between">
       <CardHeader claim={claim} />
       <CardBody claim={claim} />
       <StatusDropdown claim={claim} onStatusChange={onStatusChangeFn}  />
    </section>
  );
}