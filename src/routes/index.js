const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const imageRouter = require('./image.router');
const cartItemRouter = require('./cartItem.router');
const router = express.Router();
const purchaseItemRouter = require('./purchaseItem.router')

// colocar las rutas aquí

router.use(userRouter)
router.use(categoryRouter)
router.use(productRouter)
router.use(imageRouter)
router.use(cartItemRouter)
router.use(purchaseItemRouter)


module.exports = router;