import { Request, Response } from "express";
import { AddProductUseCase } from "../../../application/usecase/AddProductUseCase";
import { FindProductsByCategoryUseCase } from "../../../application/usecase/FindProductsByCategoryUseCase";
import { RemoveProductUseCase } from "../../../application/usecase/RemoveProductUseCase";
import { UpdateProductUseCase } from "../../../application/usecase/UpdateProductUseCase";
import { Product } from "../../../domain/entity/Product";
import { Output } from "../dto/DTOs";
import { FindProductByIdUseCase } from "../../../application/usecase/FindProductByIdUseCase";


export class ProductController {

    constructor(private addProduct: AddProductUseCase, 
        private updateProduct: UpdateProductUseCase, 
        private removeProduct: RemoveProductUseCase, 
        private findProductById: FindProductByIdUseCase,
        private findProductsByCategory: FindProductsByCategoryUseCase) { }

    async create(req: Request, res: Response<Output|undefined>) {
        const product = await this.addProduct.execute(req.body);
        return res.json(this.parseToOutput(product)).status(201);
    }

    async update(req: Request, res: Response<Output|undefined>) {
        const product = await this.updateProduct.execute(req.params.id, req.body);
        return res.json(this.parseToOutput(product)).status(200);
    }

    async delete(req: Request, res: Response<void>) {
        await this.removeProduct.execute(req.params.id);
        return res.send().status(200);
    }

    async findById(req: Request, res: Response) {
        const product = await this.findProductById.execute(req.params.id);
        return res.json(this.parseToOutput(product)).status(200);
    }

    async findAllByCategory(req: Request, res: Response<(Output|undefined)[]>) {
        const products = await this.findProductsByCategory.execute(req.params.category);
        return res.json(products.map(this.parseToOutput)).status(200);
    }

    private parseToOutput(product: Product | undefined): Output | undefined {
        if (product)
            return { id: product.id, name: product.name, description: product.description, price: product.price, category: product.category }
        return undefined;
    }
}

