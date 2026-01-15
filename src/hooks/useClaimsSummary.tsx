import { StatusType, SingleClaimType } from "../types/dashboard";

export function useClaimsSummary(visibleClaims: SingleClaimType[]) {
    const byStatus: Record<StatusType, number> = {
      "Submitted": 0,
      "Under Review": 0,
      "Approved": 0,
      "Rejected": 0,
      "Pending Documentation": 0,
    };

    let totalAmount = 0;

    visibleClaims?.forEach(claim => {
      byStatus[claim.status as StatusType]++;
      totalAmount += claim.claimAmount;
    });

    return {
      totalCount: visibleClaims?.length,
      totalAmount,
      byStatus,
    };
  
}