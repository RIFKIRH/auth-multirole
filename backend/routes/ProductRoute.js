import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/Products.js";

const router = express.Router();

router.get('/users', getProducts);
router.get('/users/:id', getProductById);
router.post('/users', createProduct);
router.patch('/users/:id', updateProduct);
router.delete('/users/:id', deleteProduct);

export default router;
