import { Product } from "../../../../domain/entity/Product";
import { ProductRepository } from "../../../repository/ProductRepository";
import { FindProductByIdUseCase } from "../../FindProductByIdUseCase";

export class DefaultFindProductByIdUseCase implements FindProductByIdUseCase {

    constructor(private productRepository: ProductRepository) {}

    async execute(id: string): Promise<Product | undefined> {
        return this.productRepository.findById(id);
    }
    
}