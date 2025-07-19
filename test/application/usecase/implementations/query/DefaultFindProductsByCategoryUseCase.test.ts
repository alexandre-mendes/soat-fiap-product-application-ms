import { ProductRepository } from "../../../../../src/application/repository/ProductRepository";
import { FindProductsByCategoryUseCase } from "../../../../../src/application/usecase/FindProductsByCategoryUseCase";
import { DefaultFindProductsByCategoryUseCase } from "../../../../../src/application/usecase/implementations/query/DefaultFindProductsByCategoryUseCase";
import { Product } from "../../../../../src/domain/entity/Product";

describe('Testa busca de produtos por categoria', () => {

    let findProductsByCategoryUseCase: FindProductsByCategoryUseCase;
    let mockProductRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        mockProductRepository = {
            findByNameAndCategory: jest.fn(),
            findById: jest.fn(),
            deleteById: jest.fn(),
            save: jest.fn(),
            findAllByCategory: jest.fn()
        } as jest.Mocked<ProductRepository>;
        findProductsByCategoryUseCase = new DefaultFindProductsByCategoryUseCase(mockProductRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve retornar produtos com sucesso', async () => {
        mockProductRepository.findAllByCategory.mockResolvedValueOnce([{} as Product])

        const result = await findProductsByCategoryUseCase.execute('LANCHE');

        expect(result).toBeDefined();
        expect(result.length).toEqual(1);
    })
});