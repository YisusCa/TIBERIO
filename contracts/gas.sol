// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GasSponsor {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el propietario puede realizar esta operacion");
        _;
    }

    // Funcion para recibir Ether, el balance de este contrato se usara para pagar el gas
    receive() external payable {}

    // Permite al propietario retirar Ether del contrato
    function withdraw(uint _amount) public onlyOwner {
        payable(owner).transfer(_amount);
    }

    // Ejecuta una transaccion en nombre de otro usuario
    function executeTransaction(address payable _to, uint _value, bytes memory _data) public onlyOwner {
        // Realiza la llamada externa para enviar Ether y/o datos a otra direccion
        (bool success, ) = _to.call{value: _value}(_data);
        require(success, "La transaccion fallo");
    }
}
