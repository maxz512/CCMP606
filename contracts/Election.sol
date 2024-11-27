// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// Function for creating election - casting vote and retrieving result
contract Election {
    address public admin; // The public address of the contract
    mapping(string => uint256) public votes; // A mapping to store vote counts for all the candidates

    event Voted(address indexed voter, string candidate); // Event emitted when a voter casts a vote
    event Result(string candidate, uint256 votes); // Event emitted to announce the result

    constructor() {
        admin = msg.sender; // Set the contract creator as the admin
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function voteCandi1() public {
        vote("candi1"); // Public function to vote for candidate1
    }

    function voteCandi2() public {
        vote("candi2"); // Public function to vote for candidate2
    }

    function voteCandi3() public {
        vote("candi3"); // Public function to vote for candidate3
    }

    // Function for counting the vote of the user
    function vote(string memory candidate) private {
        require(
            keccak256(bytes(candidate)) == keccak256(bytes("candi1")) ||
                keccak256(bytes(candidate)) == keccak256(bytes("candi2")) ||
                keccak256(bytes(candidate)) == keccak256(bytes("candi3")),
            "Invalid candidate"
        );

        votes[candidate]++; // Increment the vote count for the chosen candidate
        emit Voted(msg.sender, candidate); // Emit the Voted event
    }

    // Function for getting result or total number of votes for each candidate
    function getResult() public view onlyAdmin returns (uint256, uint256, uint256) {
        return (votes["candi1"], votes["candi2"], votes["candi3"]);
    }
}
