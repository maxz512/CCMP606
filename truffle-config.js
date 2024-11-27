const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'vague all rich picnic wool agree behind save tip core benefit voyage';
const Url = 'https://eth-sepolia.g.alchemy.com/v2/xDV-psvfW-Yiyu__WHzp3ZnIIp7WcKYp';

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none),
      network_id: "5777",   // Ganache's network id
      
    },
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, Url),
      network_id: 11155111, // Sepolia's network id
      gas: 5500000 // Gas limit, adjust accordingly
    },
  },

  // Compilers
  compilers: {
    solc: {
      version: "0.8.17",
    },
  },
};
