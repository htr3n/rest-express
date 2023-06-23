import 'dotenv/config';
import './db/db-init';
import app from './app';
import logger from './utils/logging';

const PORT = parseInt(process.env.PORT as string) ?? 8000;

app.listen(PORT, () => {
  logger.info(`REST APIs running here 👉 http://127.0.0.1:${PORT}`);
});
