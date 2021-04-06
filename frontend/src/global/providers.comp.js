import React from "react"
import {RecoilRoot} from "recoil"


export function Providers({children}) {
  return (
    <React.StrictMode>
      <RecoilRoot>
        
          {children}
        
      </RecoilRoot>
    </React.StrictMode>
  )
}