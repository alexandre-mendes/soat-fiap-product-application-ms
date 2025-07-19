import { ProductRepository } from "../../../../../src/application/repository/ProductRepository";
import { DefaultUpdateProductUseCase } from "../../../../../src/application/usecase/implementations/command/DefaultUpdateProductUseCase";
import { UpdateProductUseCase } from "../../../../../src/application/usecase/UpdateProductUseCase";
import { Product } from "../../../../../src/domain/entity/Product";

describe('Testa atualização de produto', () => {

    let updateProductUseCase: UpdateProductUseCase;
    let mockProductRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        mockProductRepository = {
            findByNameAndCategory: jest.fn(),
            findById: jest.fn(),
            deleteById: jest.fn(),
            save: jest.fn(),
            findAllByCategory: jest.fn()
        } as jest.Mocked<ProductRepository>;
        updateProductUseCase = new DefaultUpdateProductUseCase(mockProductRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve atualizar produto com sucesso', async () => {
        const id = 'testId';
        const input = {name: 'Name Test', description: 'Description Test', price: 10.0, category: 'LANCHE'};

        mockProductRepository.findById.mockResolvedValue(new Product('Name Test 1', 'Description Test 1', 11.0, 'BEBIDA'));
        mockProductRepository.save.mockImplementationOnce((product: Product) => Promise.resolve(product));

        const result = await updateProductUseCase.execute(id, input);

        expect(result).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.description).toEqual(input.description);
        expect(result.price).toEqual(input.price);
        expect(result.category).toEqual(input.category);
    });

});