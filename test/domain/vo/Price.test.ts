import { Price } from "../../../src/domain/vo/Price";

describe('Testa criação de preço', () => {

    test('Deve criar preço com sucesso', () => {
        let price = new Price(10);

        expect(price).toBeDefined();
        expect(price.value).toEqual(10);
    })

    test('Não criar preço com valor inferior a 0', () => {
        expect(() => new Price(-1)).toThrow('O preço não pode ser menor que zero.');
    })
})