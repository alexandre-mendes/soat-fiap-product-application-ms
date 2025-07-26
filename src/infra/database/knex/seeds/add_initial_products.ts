import { Knex } from 'knex';

const products = [{
    id: crypto.randomUUID(),
    name: "Big Mac Bacon",
    description: "Dois hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles, bacon e pão com gergelim",
    price: 18.90,
    category: "LANCHE"
  },
  {
    id: crypto.randomUUID(),
    name: "Big Mac Duplo",
    description: "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergelim",
    price: 20.90,
    category: "LANCHE"
  },
  {
    id: crypto.randomUUID(),
    name: "McFritas Grande",
    description: "Deliciosas batatas selecionadas, fritas, crocantes por fora, macias por dentro, douradas, irresistíveis, saborosas, famosas, e todos os outros adjetivos positivos que você quiser dar",
    price: 14.50,
    category: "ACOMPANHAMENTO"
  },
  {
    id: crypto.randomUUID(),
    name: "Chicken McNuggets",
    description: "Crocantes, leves e deliciosos. Os frangos empanados mais irresistíveis do McDonald’s agora na versão Mega, ideal para compartilhar. Composto por 15 unidades de Chicken McNuggets",
    price: 20.00,
    category: "ACOMPANHAMENTO"
  },
  {
    id: crypto.randomUUID(),
    name: "Coca-Cola 300ml",
    description: "Bebida gelada na medida certa para matar sua sede. Refrescante Coca-Cola 300ml",
    price: 10.50,
    category: "BEBIDA"
  },
  {
    id: crypto.randomUUID(),
    name: "Sprite Sem Açúcar 500ml",
    description: "Bebida gelada na medida certa para matar sua sede. Refrescante Sprite Sem Açúcar 500ml",
    price: 15.00,
    category: "BEBIDA"
  },
  {
    id: crypto.randomUUID(),
    name: "McShake Ovomaltine 400ml",
    description: "O novo McShake é feito com leite e batido na hora com o delicioso Ovomaltine",
    price: 15.00,
    category: "SOBREMESA"
  },
  {
    id: crypto.randomUUID(),
    name: "McFlurry KitKat Triple Chocolate",
    description: "Sobremesa composta por bebida láctea sabor chocolate, cobertura sabor chocolate e tablete de KitKat Triple Chocolate",
    price: 15.90,
    category: "SOBREMESA"
  }];

export async function seed(knex: Knex): Promise<void> {
  await knex('product').del();

  for (let product of products) {
    await knex('product').insert(product);
  }
  
}