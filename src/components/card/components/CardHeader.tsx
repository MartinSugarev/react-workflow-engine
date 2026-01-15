import { type Claim } from '../ClaimCard'
export default function CardHeader({claim}: {claim: Claim}) {
  return (
    <div className="flex justify-between items-center mb-2 gap-2">
        <h3 className="font-bold">
          {claim.claimNumber} - {claim.claimType}
        </h3>
        <span>{claim.status}</span>
    </div>
  )
}
