import React from "react";
import { useRoutes, useRedirect } from "hookrouter";
import UserDashboard from '../components/Dashboard/UserDashboard';
import  UserNavBar from '../Navbar/UserNavBar';
import TokenData from "../components/TokenData";
import MarketPlace from "../components/MarketPlace";
import MyCommits from "../components/MyCommits";

const routes = {
    
    "/marketplace": () => <MarketPlace />,
    "/dashboard": () => <MyCommits />,
   
};
 

const AppRouter = () => {
    useRedirect( "/")
    const pages = useRoutes(routes);

    return (
        <div className="relative bg-gray-200 min-h-screen pb-24">
           <UserNavBar />  
           {/* <div className="flex">
                <UserDashboard />
           </div> */}
            {pages}
            {!pages && (
                <div className="flex justify-center py-16">
                    Error 404: Page not found
                </div>
            )}
           
        </div>
    );
};

export default AppRouter;
