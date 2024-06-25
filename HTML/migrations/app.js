const contractAddress = "0xDef1C0ded9bec7F1a1670819833240f027b25EfF";
const abi = [
    // debca309fc704ab5a6cc2443031eb743
];

// Inicializar ethers.js
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const myContract = new ethers.Contract(contractAddress, abi, signer);

document.getElementById('sendEth').addEventListener('click', async () => {
    try {
        const tx = await signer.sendTransaction({
            to: contractAddress,
            value: ethers.utils.parseEther("1.0"), // Ejemplo: enviar 1 ETH
        });
        document.getElementById('status').innerText = `Transacción enviada: ${tx.hash}`;
    } catch (error) {
        console.error(error);
        document.getElementById('status').innerText = `Error al enviar ETH: ${error.message}`;
    }
});

// Aquí puedes añadir más interacciones, como recibir ETH o llamar a funciones específicas del contrato
