import React, {useState,  useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"


export default function MintNfts() {
    const initForm = {
        name: "",
        velocity: "",
        rating: "",
        angle: "",
        uri: "",
      };
    const [form, setForm] = useState(initForm);
   

    const mintToken = async() => {
        console.log(form.name)
        const encoded = await fcl.send([
            // fcl.payer(fcl.authz),
            //  fcl.authorizations([fcl.authz]),
            // fcl.limit(50),
            // fcl.args([
            //     fcl.arg(form.name,t.String),
            //     fcl.arg(form.velocity,t.String),
            //     fcl.arg(form.angle,t.String),
            //     fcl.arg(form.rating,t.String),
            //     fcl.arg(form.uri,t.String)    
            //   ]),
            fcl.transaction`
        import commitContract from 0xf8d6e0586b0a20c7
                
                transaction {
                let receiverRef: &{commitContract.NFTReceiver}
                let minterRef: &commitContract.NFTMinter

                prepare(acct: AuthAccount) {
                    self.receiverRef = acct.getCapability<&{commitContract.NFTReceiver}>(/public/NFTReceiver)
                        .borrow()
                        ?? panic("Could not borrow receiver reference")        
                    
                    self.minterRef = acct.borrow<&commitContract.NFTMinter>(from: /storage/NFTMinter)
                        ?? panic("could not borrow minter reference")
                }

                execute {
                    let metadata : {String : String} = {
                        "name": "amala",
                        "swing_velocity": "50", 
                        "swing_angle": "36", 
                        "rating": "5",
                        "uri": "uri"
                    }
                    let newNFT <- self.minterRef.mintNFT()
                
                    self.receiverRef.deposit(token: <-newNFT, metadata: metadata)

                    log("NFT Minted and deposited to Account 2's Collection")
                }
                }
            
        
                `,
                fcl.proposer(fcl.currentUser().authorization),      
      ]);
      await fcl.decode(encoded);
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...form };
        fieldValue[name] = value
        setForm(fieldValue);
      };

  return (
    <div class="leading-loose">
      <form  class="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
        <p class="text-gray-800 font-medium"> information</p>
        <div class="">
          <label class="block text-sm text-gray-00" for="cus_name">Name</label>
          <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="name" type="text" required="" placeholder="Your Name" value={form.name}  onChange={handleChange} aria-label="Name"/>
        </div>
        <div class="mt-2">
          <label class="block text-sm text-gray-600" for="cus_email">velocity</label>
          <input class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded" id="cus_email" name="velocity" value={form.velocity}  onChange={handleChange} type="text" required="" placeholder="swing velocity" aria-label="Email"/>
        </div>
        <div class="mt-2">
          <label class=" block text-sm text-gray-600" for="cus_email">Rating</label>
          <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="rating" type="text" value={form.rating}  onChange={handleChange}  required="" placeholder="rating" aria-label="Email"/>
        </div>
        <div class="mt-2">
          <label class="hidden text-sm block text-gray-600" for="cus_email">Angle</label>
          <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="angle" type="text" required="" value={form.angle}  onChange={handleChange} placeholder="angle" aria-label="Email"/>
        </div>
        <div class="">
          <label class="block text-sm text-gray-600" for="cus_name">URI</label>
          <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_name" name="uri" type="text" required="" placeholder="uri" value={form.uri}  onChange={handleChange} aria-label="Name"/>
        </div>
        <div class="mt-4">
          <button onClick={mintToken} class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Mint token</button>
        </div>
      </form>
    </div>
    
  );
}
