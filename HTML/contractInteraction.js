/// Añade esto en tu archivo contractInteraction.js o crea un nuevo archivo si prefieres organizarlo de manera diferente.
// Obtén una referencia al botón en tu HTML
const button = document.getElementById('myButton');

// Agrega un event listener al botón para que llame a la función mintToken cuando se haga clic
button.addEventListener('click', mintToken);

async function mintToken() {
  try {
    // Realiza una solicitud de estimación de gas para la función mintToken
    const gasEstimate = await contract.methods.mintToken().estimateGas({ from: accounts[0] });
    console.log('Estimación de gas:', gasEstimate);

    // Realiza la minting del token con la estimación de gas obtenida
    const result = await contract.methods.mintToken().send({ from: accounts[0], gas: gasEstimate });
    console.log('Token minteado con éxito:', result);

    // Aquí puedes agregar más lógica de UI, como mostrar un mensaje de éxito
  } catch (error) {
    console.error('Error al mintear el token:', error);
    // Aquí puedes agregar lógica de UI para manejar errores, como mostrar un mensaje de error
  }
}

// Esta función maneja las operaciones asíncronas relacionadas con el saldo de gas y la transferencia
async function handleGasOperations() {
  try {
    // Obtén la dirección de la billetera de destino
    const walletAddress = '0x8bdE496623157d0527339c7E6c5725F023ade5cf';

    // Realiza una solicitud para obtener el saldo de gas de la billetera de destino
    const gasBalance = await web3.eth.getBalance(walletAddress);
    console.log('Saldo de gas de la billetera:', gasBalance);

    // Aquí puedes agregar la lógica para realizar una solicitud de transferencia de gas
    // Asegúrate de completar la información necesaria para la transferencia
    // const transferGas = await web3.eth.sendTransaction({ ... });
    // console.log('Transferencia de gas:', transferGas);
  } catch (error) {
    console.error('Error al manejar las operaciones de gas:', error);
  }
}

// Llama a la función para manejar las operaciones de gas
handleGasOperations();

// Asegúrate de que esta llamada esté dentro de una función o manejador de eventos adecuado
listenToContractEvents();
