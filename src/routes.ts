import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello World from Node.js with TypeScript' });
});

export default routes;
