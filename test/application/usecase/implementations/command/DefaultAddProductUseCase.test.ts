import { ProductRepository } from "../../../../../src/application/repository/ProductRepository";
import { AddProductUseCase } from "../../../../../src/application/usecase/AddProductUseCase";
import { DefaultAddProductUseCase } from "../../../../../src/application/usecase/implementations/command/DefaultAddProductUseCase";
import { Product } from "../../../../../src/domain/entity/Product";


describe('Testa adição de produto', () => {

    let addProductUseCase: AddProductUseCase;
    let mockProductRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        mockProductRepository = {
            findByNameAndCategory: jest.fn(),
            findById: jest.fn(),
            deleteById: jest.fn(),
            save: jest.fn(),
            findAllByCategory: jest.fn()
        } as jest.Mocked<ProductRepository>;
        addProductUseCase = new DefaultAddProductUseCase(mockProductRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve adicionar produto com sucesso', async () => {
        mockProductRepository.findAllByCategory.mockResolvedValue([]);
        mockProductRepository.save.mockImplementation((product: Product) => Promise.resolve(product))

        const input = {name: 'Name Test', description: 'Description Test', price: 10.0, category: 'LANCHE'};
        
        const result = await addProductUseCase.execute(input);

        expect(result).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.description).toEqual(input.description);
        expect(result.price).toEqual(input.price);
        expect(result.category).toEqual(input.category);
    });
})