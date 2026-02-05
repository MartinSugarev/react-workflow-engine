import { useContext } from "react";
import { ClaimsActionContext } from "../context/claimContext/ClaimsActionContext";

export function useClaimActionContext() {
  const context = useContext(ClaimsActionContext);
  if (!context) {
    throw new Error("useClaimActionContext must be used within ClaimProvider");
  }
  return context;
}