const web3 = new Web3(window.ethereum)
let miContrato;
async function connectToBlockchain() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable(); // Solicitar acceso a la cuenta
      console.log('MetaMask conectado.');
    } catch (error) {
      console.error('Usuario denegó el acceso a la cuenta.');
    }
  } else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
    console.log('Web3 inyectado detectado.');
  } else {
    const infuraUrl = 'https://<network>.infura.io/v3/debca309fc704ab5a6cc2443031eb743';
    web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    console.log('Conectado a Infura.');
  }
}
async function setupContract() {
  const direccionContrato = '';
  const abiContrato = [/* Inserta el ABI de tu contrato aquí */];
  miContrato = new web3.eth.Contract(abiContrato, direccionContrato);
  console.log('Contrato listo para interactuar.');
}
document.addEventListener('DOMContentLoaded', async () => {
  await connectToBlockchain();
  await setupContract();
});
// Your code goes here
async function mintTokens() {
  try {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];
    const amount = 10; // Number of tokens to mint

    // Call the mint function of your contract
    await miContrato.methods.mint(sender, amount).send({ from: sender });

    console.log('Tokens minted successfully.');
  } catch (error) {
    console.error('Failed to mint tokens:', error);
  }
}
mintTokens();
// Crea una instancia de Web3
// Solicita al usuario que conecte su wallet
window.ethereum.request({ method: 'eth_requestAccounts' })
  .catch((error) => console.error(error));
  async function enviarMetatransaccion(data, from, contractAddress, relayerServiceURL) {
    // Paso 1: Firmar la transacción de manera offline
    const signedData = await web3.eth.accounts.sign(data, '0x881D40237659C251811CEC9c364ef91dC08D300C');
  
    // Paso 2: Enviar la transacción firmada al relayer
    fetch(relayerServiceURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signedData: signedData.signature,
        from: from,
        to: contractAddress,
        data: data,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Metatransacción enviada:', data);
    })
    .catch((error) => {
      console.error('Error al enviar la metatransacción:', error);
    });
  }
