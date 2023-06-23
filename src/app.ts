import express, { Application } from 'express';

import userRoutes from './routes/user-routes';

class App {
  public server: Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(userRoutes);
  }
}

export default new App().server;
