import { Product } from "../../domain/entity/Product";


export interface UpdateProductUseCase {
    execute(id: string, input: Input): Promise<Product>;
}

export interface Input {
    name: string;
    description: string;
    price: number;
    category: string;
}