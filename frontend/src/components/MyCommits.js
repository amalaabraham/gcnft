import React from "react";
import UserDashboard from "./Dashboard/UserDashboard";
import MintNfts from "./MintNfts";
import TokenData from "./TokenData";

export default function MyCommits() {
  
  return (
      <div className="flex">
          <UserDashboard />
          <MintNfts />
      </div>
  );
}
