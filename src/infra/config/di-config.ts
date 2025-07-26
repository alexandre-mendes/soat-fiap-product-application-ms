import { ProductRepository } from "../../application/repository/ProductRepository";
import { AddProductUseCase } from "../../application/usecase/AddProductUseCase";
import { FindProductByIdUseCase } from "../../application/usecase/FindProductByIdUseCase";
import { FindProductsByCategoryUseCase } from "../../application/usecase/FindProductsByCategoryUseCase";
import { DefaultAddProductUseCase } from "../../application/usecase/implementations/command/DefaultAddProductUseCase";
import { DefaultRemoveProductUseCase } from "../../application/usecase/implementations/command/DefaultRemoveProductUseCase";
import { DefaultUpdateProductUseCase } from "../../application/usecase/implementations/command/DefaultUpdateProductUseCase";
import { DefaultFindProductByIdUseCase } from "../../application/usecase/implementations/query/DefaultFindProductByIdUseCase";
import { DefaultFindProductsByCategoryUseCase } from "../../application/usecase/implementations/query/DefaultFindProductsByCategoryUseCase";
import { RemoveProductUseCase } from "../../application/usecase/RemoveProductUseCase";
import { UpdateProductUseCase } from "../../application/usecase/UpdateProductUseCase";
import { ProductController } from "../api/controller/ProductController";
import { DefaultProductRepository } from "../database/DefaultProoductRepository";
import { IDatabase } from "../database/dynamo/IDatabase";
import { IProduct, ProductDynamoDatabase } from "../database/dynamo/ProductDynamoDatabase";
import { ProductPostgreDatabase } from "../database/postgre/ProductPostgreDatabase";

/*
    Dynamo
*/
// const dynamo = new DynamoDb();

/*
    IDatabase - Dynamo
*/
const productDatabase: IDatabase<IProduct> = new ProductPostgreDatabase()

/*
    Repositories
*/
const productRepository: ProductRepository = new DefaultProductRepository(productDatabase);

/*
    Use Cases
*/
const addProductUseCase: AddProductUseCase                          = new DefaultAddProductUseCase(productRepository);
const findProductsByCategoryUseCase: FindProductsByCategoryUseCase  = new DefaultFindProductsByCategoryUseCase(productRepository);
const findProductByIdUseCase: FindProductByIdUseCase                = new DefaultFindProductByIdUseCase(productRepository);
const removeProductUseCase: RemoveProductUseCase                    = new DefaultRemoveProductUseCase(productRepository);
const updateProductUseCase: UpdateProductUseCase                    = new DefaultUpdateProductUseCase(productRepository);

/*
    Controllers
*/
export const productController: ProductController = new ProductController(addProductUseCase, updateProductUseCase, removeProductUseCase, findProductByIdUseCase, findProductsByCategoryUseCase);
