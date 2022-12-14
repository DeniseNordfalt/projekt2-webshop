import express, { Router } from 'express';
import { requireLogin } from '../controllers/auth';
import { getUserOrders, handleNewOrder, editOrder, handleOrderStatusChange, getAllOrders } from '../controllers/orders';


const router: Router = express.Router();

router.get("/", requireLogin, getUserOrders)
router.post("/", requireLogin, handleNewOrder)
router.patch("/:id", requireLogin, editOrder)
router.get("/admin", requireLogin, getAllOrders)
router.patch("/:id/admin", handleOrderStatusChange)




export default router