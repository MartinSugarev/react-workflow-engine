import { useContext } from 'react';

import { ClaimContext } from '../context/claimContext/ClaimContext';

export function useClaimContext() {
  const context = useContext(ClaimContext);
  if (!context) {
    throw new Error('useClaimContext must be used within ClaimProvider');
  }
  return context;
}
