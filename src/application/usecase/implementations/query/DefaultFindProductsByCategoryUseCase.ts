import { CategoryType, Product } from "../../../../domain/entity/Product";
import { ProductRepository } from "../../../repository/ProductRepository";
import { FindProductsByCategoryUseCase } from "../../FindProductsByCategoryUseCase";

export class DefaultFindProductsByCategoryUseCase implements FindProductsByCategoryUseCase {

    constructor(private productRepository: ProductRepository) {}

    async execute(category: string): Promise<Product[]> {
        return await this.productRepository.findAllByCategory(category as CategoryType);
    }
    
}