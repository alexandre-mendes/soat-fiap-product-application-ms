import { Product } from "../../domain/entity/Product";

export interface FindProductsByCategoryUseCase {
    execute(category: string): Promise<Product[]>;
}