import { type Claim } from '../ClaimCard'
export default function CardBody({claim}: {claim: Claim}) {
  return (
     <div className="flex-1 text-gray-700">
        <p><strong>ID:</strong> {claim.id}</p>
        <p><strong>Policyholder:</strong> {claim.policyholderName}</p>
        <p><strong>Amount:</strong> ${claim.claimAmount.toFixed(2)}</p>
        <p>
          <strong>Date Submitted:</strong>{" "}
          {new Date(claim.dateSubmitted).toLocaleDateString()}
        </p>
        <p><strong>Assigned Adjuster:</strong> {claim.assignedAdjuster}</p>
      </div>
  )
}
