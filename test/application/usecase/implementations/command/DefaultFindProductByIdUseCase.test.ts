import { FindProductByIdUseCase } from "../../../../../src/application/usecase/FindProductByIdUseCase";
import { ProductRepository } from "../../../../../src/application/repository/ProductRepository";
import { DefaultFindProductByIdUseCase } from '../../../../../src/application/usecase/implementations/query/DefaultFindProductByIdUseCase';
import { Product } from "../../../../../src/domain/entity/Product";

describe('Testa busca de produto por id', () => {

    let findProductByIdUseCase: FindProductByIdUseCase;
    let mockProductRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        mockProductRepository = {
            findByNameAndCategory: jest.fn(),
            findById: jest.fn(),
            deleteById: jest.fn(),
            save: jest.fn(),
            findAllByCategory: jest.fn()
        } as jest.Mocked<ProductRepository>;
        findProductByIdUseCase = new DefaultFindProductByIdUseCase(mockProductRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve retornar produto com sucesso', async () => {
        const productId = '123';

        mockProductRepository.findById.mockImplementation((id) => Promise.resolve({id} as Product))

        const result = await findProductByIdUseCase.execute(productId);

        expect(result?.id).toEqual(productId);
    });
})