import React from 'react';
import SummaryContainer from './SummaryContainer';
import Totals from './Totals';
import { useClaimContext } from '../../hooks/useClaimContext';
import claimsSummary from '../../utils/claimsSummary';

const SummaryComponent: React.FC = () => {
  const { showedClaims, allItems } = useClaimContext()
  const summaryContainerTotalsLabels = claimsSummary(showedClaims, allItems.length);

  return (
    <SummaryContainer>
      {Object.entries(summaryContainerTotalsLabels).map(([status, count]) => (
        <Totals key={status} description={status} counter={count} />
      ))}
    </SummaryContainer>
  );
}
export default SummaryComponent