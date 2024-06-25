// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MiContrato {
    // Evento para registrar el envío de ETH
    event ETHEnviado(address indexed receptor, uint cantidadETH);
    // Evento para registrar la recepción de ETH
    event EtherReceived(address indexed sender, uint amount);

    // Constructor para inicializar el contrato
    constructor() {
        // Inicialización de variables o lógica necesaria
    }

    // Función para recibir ETH y emitir un evento
    receive() external payable {
        emit EtherReceived(msg.sender, msg.value);
        // Lógica adicional al recibir ETH
    }

    // Función que simula una lógica de rechazo basada en condiciones específicas
    function myRestrictedFunction() public view {
        require(msg.sender == address(0), "Llamada no autorizada");
    }

    // Puedes añadir más funciones y lógica según sea necesario
}
// SPDX-License-Identifier: MIT
