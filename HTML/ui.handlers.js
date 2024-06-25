// uiHandlers.js
document.getElementById('connectButton').addEventListener('click', async () => {
  await connectToBlockchain();
  await setupContract();
  // Aquí puedes agregar más lógica de UI, como mostrar un mensaje de éxito
});
document.getElementById('mintButton').addEventListener('click', async () => {
  await mintToken();
  // Aquí puedes agregar más lógica de UI, como mostrar un mensaje de éxito
});async function sendCrypto() {
  const accounts = await web3.eth.getAccounts();
  web3.eth.sendTransaction({
    from: accounts[0],
    to: '0x8bdE496623157d0527339c7E6c5725F023ade5cf', // Reemplaza con la dirección destino
    value: web3.utils.toWei('0.01', 'ether') // Ajusta el valor según sea necesario
  })
  .then(async function(receipt){
      console.log('Transacción completada:', receipt);
      // Asumiendo que tienes la instancia del contrato ERC20 disponible como `erc20Contract`
      // y que `mint` es la función para crear un nuevo token
      const mintReceipt = await erc20Contract.methods.mint(accounts[0], web3.utils.toWei('100', 'ether')).send({ from: accounts[0] });
      console.log('Token minteado:', mintReceipt);
  })
  .catch(function(error){
      console.error('Error al enviar Ether o mintear token:', error);
  });
}document.getElementById('sendCryptoButton').addEventListener('click', async () => {
  await sendCrypto();
  // Aquí puedes agregar más lógica de UI, como mostrar un mensaje de éxito
});
// Aquí puedes agregar más funciones de interacción con el contrato, como recibir tokens o llamar a otras funciones
// ui.handlers.js ends here
