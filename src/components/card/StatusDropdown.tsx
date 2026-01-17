import { SingleClaimType, StatusType } from "../../types/dashboard";
import Select from "../ui/Select";

type StatusDropdownProps = {
  claim: SingleClaimType;
  onStatusChange: (id: string, newStatus: StatusType) => void;
};

const STATUS_OPTIONS: StatusType[] = ["Submitted", "Under Review", "Approved", "Rejected", "Pending Documentation"];

export function StatusDropdown({ claim, onStatusChange }: StatusDropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(claim.id, e.target.value as StatusType);
  };

  return (
    <Select  handleChangeFn={handleChange} multiple={false} size={0} options={STATUS_OPTIONS} value={claim.status}  />
  );
}
