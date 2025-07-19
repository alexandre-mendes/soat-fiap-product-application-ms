import { ProductRepository } from "../../../repository/ProductRepository";
import { RemoveProductUseCase } from "../../RemoveProductUseCase";

export class DefaultRemoveProductUseCase implements RemoveProductUseCase {

    constructor(private productRepository: ProductRepository) {}
    
    async execute(id: string): Promise<void> {
        await this.productRepository.deleteById(id);
    }
    
}