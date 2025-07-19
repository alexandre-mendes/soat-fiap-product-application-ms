import { Router } from 'express';
import { productController } from '../config/di-config';

const productRouter = Router();

productRouter.post('/api/products',                   productController.create.bind(productController));
productRouter.put('/api/products/:id',                productController.update.bind(productController));
productRouter.delete('/api/products/:id',             productController.delete.bind(productController));
productRouter.get('/api/products/category/:category', productController.findAllByCategory.bind(productController));

export default productRouter;