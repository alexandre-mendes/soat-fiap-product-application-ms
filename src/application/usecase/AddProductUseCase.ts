import { Product } from "../../domain/entity/Product";


export interface AddProductUseCase {
    execute(input: Input): Promise<Product>;
}

export interface Input {
    name: string;
    description: string;
    price: number;
    category: string;
}