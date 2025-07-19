import { AddProductUseCase, Input } from "../../../../src/application/usecase/AddProductUseCase";
import { FindProductsByCategoryUseCase } from "../../../../src/application/usecase/FindProductsByCategoryUseCase";
import { RemoveProductUseCase } from "../../../../src/application/usecase/RemoveProductUseCase";
import { UpdateProductUseCase } from "../../../../src/application/usecase/UpdateProductUseCase";
import { ProductController } from "../../../../src/infra/api/controller/ProductController";
import { Request, Response } from "express";
import { Product } from "../../../../src/domain/entity/Product";

describe('Testa adição de produto', () => {

    let productController: ProductController;
    let mockAddProductUseCase: jest.Mocked<AddProductUseCase>;
    let mockUpdateProductUseCase: jest.Mocked<UpdateProductUseCase>;
    let mockRemoveProductUseCase: jest.Mocked<RemoveProductUseCase>;
    let mockFindProductsByCategoryUseCase: jest.Mocked<FindProductsByCategoryUseCase>;

    let mockResponse: jest.Mocked<Response>;

    beforeEach(() => {
        mockResponse = { json: jest.fn(), send: jest.fn(), status: jest.fn() } as unknown as jest.Mocked<Response>;
        mockResponse.json.mockReturnValue(mockResponse)
        mockResponse.send.mockReturnValue(mockResponse)

        mockAddProductUseCase = { execute: jest.fn() } as jest.Mocked<AddProductUseCase>;
        mockUpdateProductUseCase = { execute: jest.fn() } as jest.Mocked<UpdateProductUseCase>;
        mockRemoveProductUseCase = { execute: jest.fn() } as jest.Mocked<RemoveProductUseCase>;
        mockFindProductsByCategoryUseCase = { execute: jest.fn() } as jest.Mocked<FindProductsByCategoryUseCase>;

        productController = new ProductController(mockAddProductUseCase, mockUpdateProductUseCase, mockRemoveProductUseCase, mockFindProductsByCategoryUseCase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve executar criação de produto com sucesso', () => {
        mockAddProductUseCase.execute.mockResolvedValueOnce(Promise.resolve({} as Product));

        productController.create({ body: {} } as Request, mockResponse);

        expect(mockAddProductUseCase.execute).toHaveBeenCalled();
    });

    test('Deve executar atualização de produto com sucesso', () => {
        mockUpdateProductUseCase.execute.mockResolvedValueOnce(Promise.resolve({} as Product));

        productController.update({ body: {}, params: { id: 'id' } } as unknown as Request, mockResponse);

        expect(mockUpdateProductUseCase.execute).toHaveBeenCalled();
    });

    test('Deve executar exclusão de produto com sucesso', () => {
        mockRemoveProductUseCase.execute.mockResolvedValueOnce(Promise.resolve());

        productController.delete({ params: { id: 'id' } } as unknown as Request, mockResponse);

        expect(mockRemoveProductUseCase.execute).toHaveBeenCalled();
    });

        test('Deve executar consulta de produto com sucesso', () => {
        mockFindProductsByCategoryUseCase.execute.mockResolvedValueOnce(Promise.resolve([]));

        productController.findAllByCategory({ params: { category: 'category' } } as unknown as Request, mockResponse);

        expect(mockFindProductsByCategoryUseCase.execute).toHaveBeenCalled();
    });
})