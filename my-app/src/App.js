import React, { useState, useEffect } from 'react'; // Importing necessary modules and hooks from React

import './App.css'; // Importing CSS file for styling

import Web3 from 'web3'; // Importing Web3 library for interacting with Ethereum blockchain
import ElectionContract from './contracts/Election.json'; // Importing JSON file containing the ABI and contract address

function App() { // Declaring the main component
  const [accounts, setAccounts] = useState([]); // Initializing state for Ethereum accounts
  const [contract, setContract] = useState(null); // Initializing state for Ethereum contract
  const [candidateVotes, setCandidateVotes] = useState({ // Initializing state for vote counts of candidates
    candi1: 0, // Candidate 1 vote at the begining of the deployment
    candi2: 0, // Candidate 2 vote at the begining of the deployment
    candi3: 0  // Candidate 3 vote at the begining of the deployment
  });

  useEffect(() => { // Using useEffect hook for initialization when component mounts
    const init = async () => { // Defining an asynchronous function for initialization
      try { // Start of a try block to handle potential errors
        if (window.ethereum) { // Checking if MetaMask is installed
          
          // Enable MetaMask provider
          await window.ethereum.request({ method: 'eth_requestAccounts' }); // Requesting access to Ethereum accounts
          const web3Instance = new Web3(window.ethereum); // Creating a Web3 instance
          const accounts = await web3Instance.eth.getAccounts(); // Getting Ethereum accounts
          setAccounts(accounts); // Setting accounts state

          const networkId = await web3Instance.eth.net.getId(); // Getting the network ID
          const deployedNetwork = ElectionContract.networks[networkId]; // Getting contract network configuration
          const instance = new web3Instance.eth.Contract( // Creating contract instance
            ElectionContract.abi, // Passing the ABI (Application Binary Interface) of the Election contract
            deployedNetwork && deployedNetwork.address, // Passing the address of the deployed contract on the network if available, otherwise passing null
          );
          setContract(instance); // Setting contract state
        } else { // Executed if MetaMask is not installed
          alert('Please install MetaMask extension to use this application.'); // Alerting the user to install MetaMask if not installed
        }
      } catch (error) { // Catching any errors that occur within the try block
        console.error('Error initializing app:', error); // Logging errors during initialization
      }
    };

    init(); // Calling the initialization function
  }, []); // Empty dependency array to run the effect only once on mount

  const handleVote = (candidate) => { // Function to handle voting
    // Update local vote count
    setCandidateVotes(prevVotes => ({ // Updating vote counts while preserving previous state
      ...prevVotes, // Spread operator to retain previous vote counts
      [candidate]: prevVotes[candidate] + 1 // Incrementing the vote count for the selected candidate
    }));
  };

  const handleConfirmVote = async (candidate) => { // Function to handle confirming votes
    try { // Beginning of a try block to encapsulate code that may potentially throw an error
      if (!contract) { // Checking if the contract instance is not initialized
        console.error('Contract not initialized.'); // Logging error if contract is not initialized
        return;// Exiting the function early if contract is not initialized
      }

      const web3Instance = new Web3(window.ethereum); // Creating Web3 instance
      const gasLimit = 3000000; // Setting gas limit
      const accounts = await web3Instance.eth.getAccounts(); // Getting Ethereum accounts

      // Trigger MetaMask transaction
      await contract.methods[candidate]().send({ from: accounts[0], gas: gasLimit }); // Triggering transaction to vote

    } catch (error) { // Catching any errors that occur within the try block
      console.error('Error in handleConfirmVote:', error); // Logging errors during vote confirmation
    }
  };

  const handleShowResults = () => { // Function to handle displaying voting results
    
    alert(`Candidate 1 Votes: ${candidateVotes.candi1}\nCandidate 2 Votes: ${candidateVotes.candi2}\nCandidate 3 Votes: ${candidateVotes.candi3}`);
  }; // Display the current voting results for each candidate

  return ( // Returning JSX elements to be rendered by the component
    <div className="App"> {/* Main div with class name for styling */}
      <header className="App-header"> {/* Header section */}
        <h1>Election Voting System</h1> {/* Main heading */}
        <div id="candidates"> {/* Division for candidate section */}
          <h2>Candidates</h2> {/* Heading for candidates */}
          <div> {/* Opening div for the candidate buttons */}
            <button className="vote-btn" onClick={() => handleVote('candi1')} data-party="1"> {/* Button to vote for Candidate 1 */}
              Vote for Candidate 1
            </button> {/* End of Button for Candidate 1 */}
            <button className="confirm-btn" onClick={() => handleConfirmVote('voteCandi1')}> {/* Button to confirm vote for Candidate 1 */}
              Confirm
            </button>{/* End of Button to confirm vote for Candidate 1 */}
          </div>{/* End of Division for Candidate 1 buttons */}
          <div>{/* Division for candidate buttons */}
            <button className="vote-btn" onClick={() => handleVote('candi2')} data-party="2"> {/* Button to vote for Candidate 2 */}
              Vote for Candidate 2
            </button>{/* End of Button for Candidate 2 */}
            <button className="confirm-btn" onClick={() => handleConfirmVote('voteCandi2')}> {/* Button to confirm vote for Candidate 2 */}
              Confirm
            </button>{/* End of Button to confirm vote for Candidate 2 */}
          </div>{/* End of Division for Candidate 2 buttons */}
          <div>{/* Division for candidate buttons */}
            <button className="vote-btn" onClick={() => handleVote('candi3')} data-party="3"> {/* Button to vote for Candidate 3 */}
              Vote for Candidate 3
            </button>{/* End of Button for Candidate 3 */}
            <button className="confirm-btn" onClick={() => handleConfirmVote('voteCandi3')}> {/* Button to confirm vote for Candidate 3 */}
              Confirm
            </button>{/* End of Button to confirm vote for Candidate 3 */}
          </div>{/* End of Division for Candidate 3 buttons */}
        </div>{/* End of Division for the candidate buttons */}
        <div id="results"> {/* Division for results section */}{/* Division for results section */}
          <h2>Results</h2> {/* Heading for results */}
          <p>Candidate 1 Votes: {candidateVotes.candi1}</p> {/* Paragraph displaying votes for Candidate 1 */}
          <p>Candidate 2 Votes: {candidateVotes.candi2}</p> {/* Paragraph displaying votes for Candidate 2 */}
          <p>Candidate 3 Votes: {candidateVotes.candi3}</p> {/* Paragraph displaying votes for Candidate 3 */}
        </div>{/* End of Division for results section */}
        <button className="result-btn" onClick={handleShowResults}> {/* Button to show voting results */}
          Show Results
          </button> {/* End of Button to show voting results */}
        </header> {/* End of header */}
      </div> /* End of main div */
  );
}

export default App; // Exporting the main component
