import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import swaggerRouter from './api/swagger';
import productRouter from './api/productRouter';
import { DomainError } from '../domain/error/DomainError';

const app = express();
app.use(cors({
    origin: 'http://localhost:3010'
}));
app.use(express.json());

app.use(productRouter)
app.use(swaggerRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    if (err instanceof DomainError) {
        res.status(400).json({ message: err.message });
        return;
    }

    res.status(500).send({ message: 'Ocorreu um erro inesperado.' });
});

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
    console.log(`Swagger disponível em http://localhost:3000/api-docs`);
});