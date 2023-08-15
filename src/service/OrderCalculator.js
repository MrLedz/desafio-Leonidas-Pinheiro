import ValidarPedido from "./OrderValidator.js";

export default class CalcularPedido {
  calcular(metodo, itens) {
    new ValidarPedido(metodo, itens);

    const db = [
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

    let total = 0;

    itens.forEach((item) => {
      const produto = item.split(',')[0];
      const quantidade = item.split(',')[1];

      db.forEach((linha) => {
        if (produto === linha.codigo) {
          total += (linha.valor * quantidade);
        }
      })
    });
    
    switch(metodo) {
        case 'dinheiro':
        total -= (total * .05);
        break;
      case 'credito':
        total += (total * .03);
        break;
    }

    return `R$ ${total.toFixed(2)}`.replace('.', ',');
  }
}