import React, {useState, useEffect} from 'react'
import * as fcl from "@onflow/fcl"
import AppRouter from '../router/AppRouter';
import TokenData from './TokenData';
import { A } from "hookrouter";
import UserDashboard from './Dashboard/UserDashboard';
import UserNavBar from '../Navbar/UserNavBar'

const AuthCluster = () => {
  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  if (user.loggedIn) {
    return (
      <div>
        
        <AppRouter />
       
      </div>
    )
  } else {
    return (
      <div>
        <button className="btn-primary" onClick={fcl.logIn}>Log In</button>
        <button className="btn-secondary" onClick={fcl.signUp}>Sign Up</button>
      </div>
    )
  }
}

export default AuthCluster