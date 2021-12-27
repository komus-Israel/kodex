const { default: Web3 } = require("web3")

const Token = artifacts.require('Token')
const Exchange = artifacts.require('Exchange')


module.exports = async function() {

    try {

        // get the accounts
        const accounts = await web3.eth.getAccounts()

        //  fetch the deployed Token Contract
        const token = await Token.deployed()
        console.log('token fetched', token.address)


        //  fetch deployed Exchange Contract
        const exchange = await Exchange.deployed()
        console.log('exchange fetched', exchange.address)


        // check the token balance of the first account
        const tokenBalance = await token.balanceOf(accounts[0])
        console.log('token balance of the first account', tokenBalance)

    } catch (err) {
        console.log(err)
    }
    
}