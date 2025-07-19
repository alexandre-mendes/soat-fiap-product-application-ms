import { Product } from "../../../../domain/entity/Product";
import { DomainError } from "../../../../domain/error/DomainError";
import { ProductRepository } from "../../../repository/ProductRepository";
import { Input, UpdateProductUseCase } from "../../UpdateProductUseCase";

export class DefaultUpdateProductUseCase implements UpdateProductUseCase {
    
    constructor(private productRepository: ProductRepository) {}

    async execute(id: string, input: Input): Promise<Product> {
        const product = await this.productRepository.findById(id);

        if (!product)
            throw new DomainError('Não foi localizado nenhum produto para o id informado.');

        product.update(input);
        return await this.productRepository.save(product);
    }

}