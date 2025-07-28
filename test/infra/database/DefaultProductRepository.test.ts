import { ProductRepository } from "../../../src/application/repository/ProductRepository";
import { CategoryType, Product } from "../../../src/domain/entity/Product";
import { IDatabase } from '../../../src/infra/database/postgre/IDatabase';
import { DefaultProductRepository } from '../../../src/infra/database/DefaultProoductRepository';
import { IProduct } from '../../../src/infra/database/postgre/ProductPostgreDatabase';

describe('Testa repository de produtos', () => {

    let productRepository: ProductRepository;
    let mockDatabase: jest.Mocked<IDatabase<Product>>;
    let product: any = { name: 'abc', description: 'abc', price: 10, category: 'SOBREMESA' };

    beforeEach(() => {
        mockDatabase = {
            save: jest.fn(),
            update: jest.fn(),
            deleteById: jest.fn(),
            findById: jest.fn(),
            findByQuery: jest.fn(),
            findAllByQuery: jest.fn(),
        } as jest.Mocked<IDatabase<Product>>;

        productRepository = new DefaultProductRepository(mockDatabase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve retornar uma lista de produtos por categoria', async () => {
        const categoryType = CategoryType.DESSERT;

        mockDatabase.findAllByQuery.mockResolvedValue([product]);

        const result = await productRepository.findAllByCategory(categoryType);

        expect(result).toHaveLength(1);
    })

    test('Deve retornar produto por id', async () => {
        mockDatabase.findById.mockResolvedValue(product);

        const result = await productRepository.findById('123');

        expect(result).toBeDefined();
    })

    test('Deve deletar um produto pelo id', async () => {
        mockDatabase.deleteById.mockResolvedValue();

        await productRepository.deleteById('123');

        expect(mockDatabase.deleteById).toHaveBeenCalled();
    });

    test('Deve salvar um produto', async () => {
        mockDatabase.save.mockResolvedValue(product);

        const result = await productRepository.save(product);

        expect(mockDatabase.save).toHaveBeenCalled();
        expect(result).toBeDefined();
    })

    test('Deve retornar produtos por categoria e nome', async () => {
        mockDatabase.findByQuery.mockResolvedValue(product);

        const result = await productRepository.findByNameAndCategory('name', 'category');

        expect(mockDatabase.findByQuery).toHaveBeenCalled();
        expect(result).toBeDefined();
    })
})