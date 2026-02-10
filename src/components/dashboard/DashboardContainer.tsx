import React from "react";
import ClaimProvider from "../../context/claimContext/ClaimContext";
import ClaimsContainer from "../card/ClaimsContainer";
import ControlComponent from "../controls/ControlComponent";
import SummaryComponent from "../summary/SummaryComponent";
import Heading from "../ui/Heading";
import Separator from "../ui/Separator";

const Dashboard: React.FC = () => {
  return (
    <ClaimProvider>
      <div className="p-10">
        <div className="h-full">
          <Heading as="h1" className="text-3xl font-semibold">
            Claims Dashboard
          </Heading>
          <Separator className="my-4" />
          <SummaryComponent />
          <Separator className="my-4" />
          <ControlComponent />
          <ClaimsContainer />
        </div>
      </div>
    </ClaimProvider>
  );
};
export default Dashboard;