import { Router, NextFunction, Request, Response } from "express";
import { DomainError } from '../../domain/error/DomainError';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerRouter = Router();

swaggerRouter.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    if (err instanceof DomainError) {
        res.status(400).json({ message: err.message });
        return;
    }

    res.status(500).send({ message: 'Ocorreu um erro inesperado.' });
});

// Carregar o arquivo YAML do Swagger
const swaggerDocument = YAML.load('./swagger.yaml');

// Configurar o Swagger UI para usar o arquivo YAML
swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));


export default swaggerRouter;