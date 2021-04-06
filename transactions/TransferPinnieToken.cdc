import CommitToken from 0xf8d6e0586b0a20c7

transaction {
  var temporaryVault: @CommitToken.Vault

  prepare(acct: AuthAccount) {
    let vaultRef = acct.borrow<&CommitToken.Vault>(from: /storage/MainVault)
        ?? panic("Could not borrow a reference to the owner's vault")
      
    self.temporaryVault <- vaultRef.withdraw(amount: 10.0)
  }

  execute {
    let recipient = getAccount(0x01cf0e2f2f715450)

    let receiverRef = recipient.getCapability(/public/MainReceiver)
                      .borrow<&CommitToken.Vault{CommitToken.Receiver}>()
                      ?? panic("Could not borrow a reference to the receiver")

    receiverRef.deposit(from: <-self.temporaryVault)

    log("Transfer succeeded!")
  }
}