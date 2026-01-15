import ClaimsContainer from "../components/card/ClaimsContainer";
import ControlComponent from "../components/controls/ControlComponent";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import { Heading } from "../components/ui/Heading";
import SummaryComponent from "../components/summary/SummaryComponent";
import Separator from "../components/ui/Separator";
import { ClaimProvider } from "../context/claimContext/ClaimContext";


export default function Dashboard() {
  return (
      <ClaimProvider>
   <div className="p-10">
       <DashboardContainer>
         <Heading as="h1" className="text-3xl font-semibold">
           Claims Dashboard
         </Heading>
         <Separator className="my-4"/>
         <SummaryComponent />
         <Separator className="my-4"/>
            <ControlComponent />
          <ClaimsContainer/>
       </DashboardContainer>
   </div> 
   </ClaimProvider>  
  )
}
