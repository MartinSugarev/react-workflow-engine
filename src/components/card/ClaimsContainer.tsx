import React from 'react';
import { useClaimContext } from '../../hooks/useClaimContext';
import ClaimCard from './ClaimCard';


const ClaimsContainer: React.FC = () => {
  const {showedClaims, loading, error}  = useClaimContext();
  if (loading) {
    return (
      <p className="text-center mt-4 text-gray-500 text-lg">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
        <p className="text-center mt-4 text-gray-500 text-lg">
      Something went wrong while loading the claims.
    </p>
    )
  }

  return (
    <div className="mt-2 px-10 flex flex-wrap justify-center gap-2">
      {showedClaims.map((claim) => (
        <ClaimCard key={claim.id} assignedAdjuster={claim.assignedAdjuster} claimAmount={claim.claimAmount} claimNumber={claim.claimNumber} claimType={claim.claimType} dateSubmitted={claim.dateSubmitted} id={claim.id} policyholderName={claim.policyholderName} status={claim.status} />
      ))}
    </div>
  );
}

export default ClaimsContainer;
