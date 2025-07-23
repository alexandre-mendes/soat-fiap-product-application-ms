import { Router } from 'express';
import { productController } from '../config/di-config';
import { wrapHandler } from './errorHandler';

const productRouter = Router();

productRouter.post('/api/products',                   wrapHandler(productController.create.bind(productController)));
productRouter.put('/api/products/:id',                wrapHandler(productController.update.bind(productController)));
productRouter.delete('/api/products/:id',             wrapHandler(productController.delete.bind(productController)));
productRouter.get('/api/products/category/:category', wrapHandler(productController.findAllByCategory.bind(productController)));

export default productRouter;