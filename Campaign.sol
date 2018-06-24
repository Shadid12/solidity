pragma solidity ^0.4.17;

contract Campaign {
    
    struct Request {
        string      description;
        uint        value;
        address     recipient;
        bool        complete;
        uint        approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[]   public requests;
    address     public manager;
    uint        public minimumContribution;
    // address[]   public approvers; 
    mapping(address => bool) public approvers;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor (uint minimum) public payable {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    // members approve requests
    function approveRequest(uint index) public payable{
        Request storage request = requests[index];
        // Person has already donated
        require(approvers[msg.sender]);
        // Person has not already voted
        require(!request.approvals[msg.sender]);
        // Now add this person's vote
        request.approvalCount++; // increment approval count
        request.approvals[msg.sender] = true;
    }
    
}