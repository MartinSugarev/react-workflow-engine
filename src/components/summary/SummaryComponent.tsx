import SummaryContainer from './SummaryContainer';
import Totals from './Totals';
import { useClaimsSummary } from '../../hooks/useClaimsSummary';
import { useClaimContext } from '../../hooks/useClaimContext';

export default function SummaryComponent() {
  const ctx = useClaimContext()

  const { state } = ctx; 
  const { totalAmount, totalCount, byStatus } = useClaimsSummary(state.filteredItems);

  return (
    <SummaryContainer>
      <Totals description="Total amount (visible claims)" counter={totalAmount} />
      <Totals description="Total claims" counter={state.allItems.length} />
      <Totals description="Total claims (visible)" counter={totalCount} />
      {Object.entries(byStatus).map(([status, count]) => (
        <Totals key={status} description={status} counter={count} />
      ))}
    </SummaryContainer>
  );
}