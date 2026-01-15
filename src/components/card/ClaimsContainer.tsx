import { ClaimCard } from './ClaimCard';
import { useClaimContext } from '../../hooks/useClaimContext';

export default function ClaimsContainer() {
     const ctx = useClaimContext();
     const { state } = ctx; 
  
  return (
    <div className='mt-2 px-10 flex flex-wrap justify-center gap-2'>
      {state.filteredItems.map((c, idx) => (
        <ClaimCard key={idx} claim={c} />
      ))}
    </div>
  );
}
