const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const contract = require('truffle-contract');
const MyContractJSON = require('./build/contracts/MyContract.json');

const provider = new HDWalletProvider('mnemonic', 'http://localhost:8545');
const web3 = new Web3(provider);

const MyContract = contract(MyContractJSON);
MyContract.setProvider(web3.currentProvider);

web3.eth.getAccounts().then(async function(accounts) {
  const instance = await MyContract.new({ from: accounts[0], gas: 3000000 });
  console.log('Contract deployed at address:', instance.address);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
async function sendEtherToContract(amountInEther) {
    if (window.ethereum) {
        try {
            const provider = window.ethereum;
            const web3 = new Web3(provider);
            await provider.enable(); // Solicita acceso a la cuenta

            const accounts = await web3.eth.getAccounts();
            const myContractAddress = '0xDef1C0ded9bec7F1a1670819833240f027b25EfF';
            const myContract = new web3.eth.Contract(ABI_DEL_CONTRATO, myContractAddress);

            // Ejemplo de cómo enviar Ether a la función receive()
            // Nota: Esto solo envía Ether, sin datos adicionales.
            const transactionParameters = {
                to: myContractAddress, // Dirección del contrato
                from: accounts[0], // Dirección del remitente, obtenida de MetaMask
                value: web3.utils.toHex(web3.utils.toWei(amountInEther, 'ether')), // Convertir el monto a Wei
            };

            // Enviar la transacción
            const txHash = await provider.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });

            console.log("Transacción enviada con hash:", txHash);
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('MetaMask no está instalado!');
    }
}
