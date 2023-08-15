import CalcularPedido from "./service/OrderCalculator.js";

class CaixaDaLanchonete {

    static calcularValorDaCompra(metodoDePagamento, itens) {
        try {
            const inst = new CalcularPedido();
            return inst.calcular(metodoDePagamento, itens);
        } catch (error) {
            return error.message;
        }
    }

}

export { CaixaDaLanchonete };
