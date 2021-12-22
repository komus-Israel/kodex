pragma solidity 0.8.10;


//  Deposit and Withdraw Funds
//  Manage Orders - Make or Cancel
//  Handle Trades -- charge fees


//  TODO:

//  []  set the fee account

contract Exchange {

    address public transactionFeeAccount; // account receives the exchange fee
    uint256 public transactionFeePercent;

    constructor (address _transactionFeeAccount, uint256 _transactionFeePercent) {

        transactionFeeAccount = _transactionFeeAccount;
        transactionFeePercent = _transactionFeePercent;

    }
}

