import { SingleClaimType } from "../types/dashboard.types";

function claimsSummary(visibleClaims: SingleClaimType[], totalItemsCount: number) {
  const summaryContainerTotalsLabels = {
    "Total claims": 0,
    "Total claims visible": 0,
    "Total amount (visible claims)": 0,
    "Submitted": 0,
    "Under Review": 0,
    "Approved": 0,
    "Rejected": 0,
    "Pending Documentation": 0,
  };

  let totalAmount = 0;

  visibleClaims?.forEach((claim) => {
    summaryContainerTotalsLabels[claim.status]++;
    totalAmount += claim.claimAmount;
  });

  summaryContainerTotalsLabels["Total amount (visible claims)"] = totalAmount;
  summaryContainerTotalsLabels["Total claims visible"] = visibleClaims.length;
  summaryContainerTotalsLabels["Total claims"] = totalItemsCount

  return summaryContainerTotalsLabels
}

export default claimsSummary;