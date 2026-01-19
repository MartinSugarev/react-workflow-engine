import { useState, useEffect } from 'react';
import { ClaimCard } from './ClaimCard';
import { useClaimContext } from '../../hooks/useClaimContext';

export default function ClaimsContainer() {
  const {searchedItems: state, loading}  = useClaimContext();

  if (loading) {
    return (
      <p className="text-center mt-4 text-gray-500 text-lg">
        Loading...
      </p>
    );
  }

  return (
    <div className="mt-2 px-10 flex flex-wrap justify-center gap-2">
      {state.map((claim) => (
        <ClaimCard key={claim.id} claim={claim} />
      ))}
    </div>
  );
}
