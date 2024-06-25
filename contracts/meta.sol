// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MetaTransactionProcessor {
    address public sponsor;

    constructor() {
        sponsor = msg.sender; // El creador del contrato es el patrocinador inicial
    }

    // Función para cambiar el patrocinador (solo el patrocinador actual puede hacerlo)
    function changeSponsor(address newSponsor) public {
        require(msg.sender == sponsor, "Solo el patrocinador actual puede cambiar el patrocinador.");
        sponsor = newSponsor;
    }

    // Ejecuta una meta-transacción
    function executeMetaTransaction(bytes memory data, bytes memory signature) public {
        // Verificar que la firma corresponde al patrocinador
        require(verify(data, signature), "Firma no válida");

        // Ejecutar la transacción
        (bool success, ) = address(this).call(data);
        require(success, "La ejecución de la transacción falló");
    }

    // Verifica la firma
    function verify(bytes memory data, bytes memory signature) public view returns (bool) {
        bytes32 dataHash = keccak256(data);
        bytes32 prefixedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", dataHash));
        return recoverSigner(prefixedHash, signature) == sponsor;
    }

    // Recupera el firmante de la firma
    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    // Divide la firma en r, s y v
    function splitSignature(bytes memory sig) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "Longitud de firma inválida");

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (r, s, v);
    }

    // Permite al contrato recibir ETH
    receive() external payable {}
}
