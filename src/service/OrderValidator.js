export default class ValidarPedido {
  constructor(meio, itens) {
    this.itens = itens;
    this.produtos = [];
    this.db = [
      {
        "codigo": "cafe",
        "valor": 3
      },
      {
        "codigo": "chantily",
        "valor": 1.50,
        "extraDe": "cafe"
      },
      {
        "codigo": "suco",
        "valor": 6.2
      },
      {
        "codigo": "sanduiche",
        "valor": 6.5
      },
      {
        "codigo": "queijo",
        "valor": 2,
        "extraDe": "sanduiche"
      },
      {
        "codigo": "salgado",
        "valor": 7.25
      },
      {
        "codigo": "combo1",
        "valor": 9.5
      },
      {
        "codigo": "combo2",
        "valor": 7.5
      }
    ];

    this.meioDePagamento(meio);
    this.checarItens(itens);
    this.checarQuantidade(itens);
    this.checarExtra(itens);
  }

  meioDePagamento(meio) {
    const metodos = ['dinheiro', 'debito', 'credito'];

    if (!metodos.includes(meio)) {
      throw new Error("Forma de pagamento inválida!");
    }
  }

  checarItens() {
    if (this.itens === undefined || this.itens.length < 1) {
      throw new Error("Não há itens no carrinho de compra!");
    }
  }

  checarQuantidade() {

    this.itens.forEach((item) => {
      if (item.split(',').length < 2) {
        throw new Error("Item inválido!");
      }

      const quantidade = +item.split(',')[1];

      if (!quantidade >= 1) {
        throw new Error("Quantidade inválida!");
      }
    });
  }

  checarExtra() {
    const cardapio = JSON.stringify(this.db);
    const cardapioArray = JSON.parse(cardapio);

    this.itens.forEach((item) => {
      const produto = item.split(',')[0];
      this.produtos.push(produto);
    });
    
    this.itens.forEach((item) => {
      const codigo = item.split(',')[0];

      if (!cardapio.match(codigo)) {
        throw new Error("Item inválido!");
      }

      cardapioArray.forEach((linha) => {
        if (linha.codigo === codigo && linha.extraDe) {
          if (!this.produtos.includes(linha.extraDe)) {
            throw new Error("Item extra não pode ser pedido sem o principal");
          }
        }
      });
    });

  }
}