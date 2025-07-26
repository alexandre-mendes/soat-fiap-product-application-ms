import { ProductRepository } from "../../../../../src/application/repository/ProductRepository";
import { DefaultRemoveProductUseCase } from "../../../../../src/application/usecase/implementations/command/DefaultRemoveProductUseCase";
import { RemoveProductUseCase } from "../../../../../src/application/usecase/RemoveProductUseCase";

describe('Testa remoção de produto', () => {

    let removeProductUseCase: RemoveProductUseCase;
    let mockProductRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        mockProductRepository = {
            findByNameAndCategory: jest.fn(),
            findById: jest.fn(),
            deleteById: jest.fn(),
            save: jest.fn(),
            findAllByCategory: jest.fn()
        } as jest.Mocked<ProductRepository>;
        removeProductUseCase = new DefaultRemoveProductUseCase(mockProductRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve remover produto com sucesso', async () => {
        let id = 'idTest';

        await removeProductUseCase.execute(id);

        expect(mockProductRepository.deleteById).toHaveBeenCalled();
    });
});