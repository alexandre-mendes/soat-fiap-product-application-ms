import knex, { Knex } from "knex";
import { DBOperation, DBQuery, IDatabase } from "../dynamo/IDatabase";
import knexfile from "../knex/knexfile";

export interface IProduct {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

export class ProductPostgreDatabase implements IDatabase<IProduct> {

    private db: Knex;
    private tableName: string;

    constructor() {
        this.db = knex(knexfile.development);
        this.tableName = 'product';
    }


    async save(entity: IProduct): Promise<IProduct> {
        if (!entity.id)
            entity.id = crypto.randomUUID();

        await this.db(this.tableName).insert(entity).returning('id');
        return entity;
    }

    async update(entity: IProduct): Promise<IProduct> {
        const id = entity.id;
        await this.db(this.tableName).where({ id }).update(entity);
        return entity;
    }

    async deleteById(id: string): Promise<void> {
        await this.db(this.tableName).where({ id }).del();
    }

    async findById(id: string): Promise<IProduct | null> {
        return await this.db(this.tableName).where({ id }).first();
    }

    async findByQuery(query: DBQuery): Promise<IProduct> {
        const queryBuilder = this.db(this.tableName).first();
        const result = await this.applyQuery(queryBuilder, query);
        return result || null;
    }

    async findAllByQuery(query: DBQuery): Promise<IProduct[]> {
        const queryBuilder = this.db(this.tableName);
        const results = await this.applyQuery(queryBuilder, query);
        return results;
    }

    private applyQuery(queryBuilder: Knex.QueryBuilder, dbQuery: DBQuery): Knex.QueryBuilder {
        // Aplica as cláusulas WHERE
        dbQuery.andCriteria.forEach(criteria => {
            switch (criteria.operation) {
                case DBOperation.EQUALS:
                    queryBuilder.where(criteria.key, '=', criteria.value);
                    break;
                case DBOperation.NOT_EQUALS:
                    queryBuilder.whereNot(criteria.key, '=', criteria.value);
                    break;
                // Adicionar outros casos conforme necessário (ex: >,<, >=, <=)
                default:
                    throw new Error('Operação de filtro não suportada');
            }
        });

        // Aplica as cláusulas ORDER BY
        for (const sortKey in dbQuery.sort) {
            queryBuilder.orderBy(sortKey, dbQuery.sort[sortKey]);
        }

        return queryBuilder;
    }
}