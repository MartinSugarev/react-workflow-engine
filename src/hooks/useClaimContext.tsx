import { useContext } from "react";
import { ClaimContext } from "../context/claimContext/ClaimContext";

export function useClaimContext() {
  const ctx = useContext(ClaimContext);
  if (!ctx){
    throw new Error("No context applied")
  }
  return ctx;
}
