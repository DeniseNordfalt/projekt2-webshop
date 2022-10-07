import express, { Request, Response, Router } from 'express'
import userRoutes from './users'

const router: Router = express.Router()

router.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World!");
  });

router.use("/users", userRoutes);

  export default router