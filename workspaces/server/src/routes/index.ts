
import express, { Request, Response, Router } from "express";
import userRoutes from "./users";
import authRoutes from "./auth";
import productRoutes from "./products";
import cartRoutes from "./cart"
import orderRoutes from "./orders"


const router: Router = express.Router();

router.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/shoppingcart", cartRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

export default router;

