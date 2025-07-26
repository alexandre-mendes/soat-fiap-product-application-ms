import { Product } from "../../domain/entity/Product";

export interface FindProductByIdUseCase {
    execute(id: string): Promise<Product|undefined>
}