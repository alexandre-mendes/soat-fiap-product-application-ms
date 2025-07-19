import { ProductRepository } from "../../application/repository/ProductRepository";
import { CategoryType, Product } from "../../domain/entity/Product";
import { DBCriteria, DBOperation, DBQuery, IDatabase } from "./dynamo/IDatabase";
import { IProduct } from "./dynamo/ProductDynamoDatabase";

export class DefaultProductRepository implements ProductRepository {

    constructor(private database: IDatabase<IProduct>) { }

    async findAllByCategory(category: CategoryType): Promise<Product[]> {
        const query = new DBQuery();
        query.add(new DBCriteria('category', category, DBOperation.EQUALS));
        const products = await this.database.findAllByQuery(query);
        return products.map(this.parseToEntity);
    }

    async findById(id: string): Promise<Product | undefined> {
        const product = await this.database.findById(id);

        if (!product)
            return undefined;

        return this.parseToEntity(product);
    }

    async deleteById(id: string): Promise<void> {
        await this.database.deleteById(id);
    }

    async save(product: Product): Promise<Product> {
        const db = this.parseToDB(product);
        let saved = null;

        if (db.id)
            saved = await this.database.update(db);
        else
            saved = await this.database.save(db);

        return this.parseToEntity(saved as IProduct);
    }

    async findByNameAndCategory(name: string, category: string): Promise<Product | undefined> {
        const query = new DBQuery();
        query.add(new DBCriteria('name', name, DBOperation.EQUALS));
        query.add(new DBCriteria('category', category, DBOperation.EQUALS));
        const finded = await this.database.findByQuery(query);

        if (finded)
            return this.parseToEntity(finded);
        return undefined;
    }

    private parseToDB(entity: Product) {
        return { id: entity.id, name: entity.name, description: entity.description, price: entity.price, category: entity.category as string } as IProduct;
    }

    private parseToEntity(db: IProduct): Product {
        const entity = new Product(db.name, db.description, db.price, db.category as CategoryType);
        entity.id = db.id;
        return entity;
    }
}