import { CategoryType, Product } from "../../../src/domain/entity/Product";


describe('Testa criação de produto', () => {

    test('Deve criar produto com sucesso', () => {
        const name = 'X Tudo';
        const description = 'Pão brioche com tudo';
        const price = 17.85;
        const category = 'LANCHE';

        const product = new Product(name, description, price, category as CategoryType);

        expect(product).toBeDefined();
        expect(product.name).toEqual(name);
        expect(product.description).toEqual(description);
        expect(product.price).toEqual(price);
        expect(product.category).toEqual(category);
    });

    test('Deve informar que o nome é obrigatório', () => {
        expect(() => new Product('', 'Pão brioche com tudo', 17.85, 'LANCHE' as CategoryType)).toThrow('O nome é obrigatório.');
    });

    test('Deve informar que o preço é obrigatório', () => {
        expect(() => new Product('X Tudo', 'Pão brioche com tudo', (null as unknown) as number, 'LANCHE' as CategoryType)).toThrow('O preço é obrigatório.');
    });

    test('Deve informar que a descrição é obrigatória', () => {
        expect(() => new Product('X Tudo', '', 17.85, 'LANCHE' as CategoryType)).toThrow('A descrição é obrigatória.');
    });

    test('Deve informar que o preço é obrigatório', () => {
        expect(() => new Product('X Tudo', 'Pão brioche com tudo', -1, 'LANCHE' as CategoryType)).toThrow('O preço não pode ser menor que zero.');
    });

    test('Deve informar que a categoria é obrigatória', () => {
        expect(() => new Product('X Tudo', 'Pão brioche com tudo', 17.85, '' as CategoryType)).toThrow('A categoria é obrigatória.');
    });

    test('Deve informar que a categoria é inválida', () => {
        expect(() => new Product('X Tudo', 'Pão brioche com tudo', 17.85, 'XPTO' as CategoryType)).toThrow('Informe uma categoria válida.');
    });
});

describe('Testa atualização de produto', () => {

    test('', () => {
        const name = 'Novo nome';
        const description = 'Nova descrição';
        const price = 21.5;
        const category = 'BEBIDA';

        const product = new Product('X Tudo', 'Pão brioche com tudo', 17.85, 'LANCHE' as CategoryType);

        product.update({name, description, price, category})

        expect(product).toBeDefined();
        expect(product.name).toEqual(name);
        expect(product.description).toEqual(description);
        expect(product.price).toEqual(price);
        expect(product.category).toEqual(category);
    });
});