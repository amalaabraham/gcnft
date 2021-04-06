import CommitToken from 0xf8d6e0586b0a20c7

transaction {
	prepare(acct: AuthAccount) {
		let vaultA <- CommitToken.createEmptyVault()
			
		acct.save<@CommitToken.Vault>(<-vaultA, to: /storage/MainVault)

    log("Empty Vault stored")

		let ReceiverRef = acct.link<&CommitToken.Vault{CommitToken.Receiver, CommitToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

    log("References created")
	}

    post {
        getAccount(0xf8d6e0586b0a20c7).getCapability<&CommitToken.Vault{CommitToken.Receiver}>(/public/MainReceiver)
                        .check():  
                        "Vault Receiver Reference was not created correctly"
    }
}