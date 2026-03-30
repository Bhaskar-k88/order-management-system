import express from 'express'
import { createOrder, deleteOrder, getOrder, updateOrder } from '../controllers/orderController.js'
import protectRoute from '../middleware/authMiddleware.js'

const orderRouter = express.Router()

orderRouter.post("/", protectRoute,createOrder)
orderRouter.get("/", protectRoute,getOrder)
orderRouter.put("/:id",protectRoute,updateOrder)
orderRouter.delete("/:id",protectRoute,deleteOrder)

export default orderRouter