async function sendMetaTransaction(transactionData, signature) {
  // Asumiendo que transactionData es la transacción que el usuario quiere realizar
  // y signature es la firma de esa transacción.

  try {
    // Enviar la transacción firmada al contrato que maneja las meta-transacciones
    const response = await fetch('https://optimistic.etherscan.io/address/0x881d40237659c251811cec9c364ef91dc08d300c', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionData,
        signature,
        // Añadir la dirección del contrato que pagará por el gas
        relayerContract: '0x881D40237659C251811CEC9c364ef91dC08D300C',
      }),
    });

    const data = await response.json();
    console.log('Meta-transacción enviada:', data);
  } catch (error) {
    console.error('Error al enviar la meta-transacción:', error);
  }
}

// Ejemplo de cómo se podría llamar a sendMetaTransaction
// sendMetaTransaction(transactionData, signature);
