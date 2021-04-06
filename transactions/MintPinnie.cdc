// Mint Tokens

import CommitToken from 0xf8d6e0586b0a20c7

transaction {
    let mintingRef: &CommitToken.VaultMinter

    var receiver: Capability<&CommitToken.Vault{CommitToken.Receiver}>

	prepare(acct: AuthAccount) {
        self.mintingRef = acct.borrow<&CommitToken.VaultMinter>(from: /storage/MainMinter)
            ?? panic("Could not borrow a reference to the minter")
        
        let recipient = getAccount(0xf8d6e0586b0a20c7)
      
        self.receiver = recipient.getCapability<&CommitToken.Vault{CommitToken.Receiver}>
(/public/MainReceiver)

	}

    execute {
        self.mintingRef.mintTokens(amount: 30.0, recipient: self.receiver)

        log("30 tokens minted and deposited to account 0xf8d6e0586b0a20c7")
    }
}