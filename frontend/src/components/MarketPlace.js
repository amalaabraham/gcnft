import React from "react";
import UserDashboard from "./Dashboard/UserDashboard";
import TokenData from "./TokenData";

export default function MarketPlace() {
  
  return (
      <div className="flex">
          <UserDashboard />
          <TokenData />
      </div>
  );
}
