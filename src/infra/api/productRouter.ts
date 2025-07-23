import { Router } from 'express';
import { productController } from '../config/di-config';
import { errorHandler } from './errorHandler';

const productRouter = Router();

productRouter.post('/api/products',                   errorHandler(productController.create.bind(productController)));
productRouter.put('/api/products/:id',                errorHandler(productController.update.bind(productController)));
productRouter.delete('/api/products/:id',             errorHandler(productController.delete.bind(productController)));
productRouter.get('/api/products/category/:category', errorHandler(productController.findAllByCategory.bind(productController)));

export default productRouter;