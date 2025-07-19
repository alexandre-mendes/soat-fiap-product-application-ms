import { CategoryType, Product } from "../../domain/entity/Product";

export interface ProductRepository {
    findAllByCategory(category: CategoryType): Promise<Product[]>;
    findById(id: string): Promise<Product|undefined>;
    deleteById(id: string): Promise<void>;
    save(product: Product): Promise<Product>;
    findByNameAndCategory(name: string, category: string): Promise<Product | undefined>;
}