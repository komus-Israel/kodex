pragma solidity 0.8.10;
import "./Token.sol";


//  Deposit and Withdraw Funds
//  Manage Orders - Make or Cancel
//  Handle Trades -- charge fees


//  TODO:

//  [x] set the fee account
//  [x] deposit token
//  [x] deposit ether
//  []  withdraw ether

contract Exchange {

    address public transactionFeeAccount; // account receives the exchange fee
    uint256 public transactionFeePercent;

    address constant ETHER = address(0); // store ether in blank address

    // first address is the address of the token
    // second address is the address of person that has deposited the token
    // unit256 is the amount that has been deposited
    mapping(address => mapping(address => uint256)) public tokens; // mapping of tokens on the platform


    // emit a deposit event
    event Deposit(address _token, address _user, uint256 _amount, uint256 _balance);


    // emit withdraw event
    event Withdraw(address _token, address _user, uint256 _amount, uint256 _balance);

    constructor (address _transactionFeeAccount, uint256 _transactionFeePercent) {

        transactionFeeAccount = _transactionFeeAccount;
        transactionFeePercent = _transactionFeePercent;

    }

    fallback() external {

    }

    function depositToken(address _token, uint _amount) public {

        // disallow ether deposits through this address
        require(_token != ETHER);

        //  which token ?
        //  how much ?
        //  manage deposit
        
        //  send tokens to this contract
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));


        // manage deposit
        tokens[_token][msg.sender] += _amount;

        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
        
    }


    function depositEther() payable public {
        tokens[ETHER][msg.sender] += msg.value; 

        // emit ether deposit
        emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
    }

    function withdrawEther(uint _amount) public {

        // the amount to be withdrawn should be less or equal to the deposited amount
        require(_amount <= tokens[ETHER][msg.sender]);
        // reduce the value to be withdrawn from the ether tokens map
        tokens[ETHER][msg.sender] -= _amount;
        msg.transfer(_amount)
        
    }

    

    
}

