import { CategoryType, Product } from "../../../../domain/entity/Product";
import { DomainError } from "../../../../domain/error/DomainError";
import { ProductRepository } from "../../../repository/ProductRepository";
import { AddProductUseCase, Input } from "../../AddProductUseCase";


export class DefaultAddProductUseCase implements AddProductUseCase {

    constructor(private productRepository: ProductRepository) {}

    async execute(input: Input): Promise<Product> {
        const finded = await this.productRepository.findByNameAndCategory(input.name, input.category);

        if (finded)
            throw new DomainError('Já existe um produto com o mesmo nome e categoria.')

        const product = new Product(input.name, input.description, input.price, input.category as CategoryType);
        return await this.productRepository.save(product);
    }
    
}