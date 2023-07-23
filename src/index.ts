import 'dotenv/config';
import './db/db-init';
import cors from 'cors';
import express, { Express } from 'express';
import userRoutes from './routes/user-routes';
import logger from './utils/logging';

const port = parseInt(process.env.PORT as string) ?? 8000;
const host = (process.env.HOST as string) ?? '0.0.0.0';

const app: Express = express();

app.use(express.json());

app.use(userRoutes);

const allowedOrigins = process.env.ALLOWED_ORIGINS ?? [];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(corsOptions));

app.listen(port, host, () => {
  logger.info(`⚡️[server]: REST Server is running at http://${host}:${port}`);
});
