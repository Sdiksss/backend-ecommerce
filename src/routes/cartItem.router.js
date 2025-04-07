const { getAll, create, getOne, remove, update } = require('../controllers/cartItem.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const cartItemRouter = express.Router();

cartItemRouter.route('/cartItems')
    .get(getAll)
    .post(verifyJWT, create);

cartItemRouter.route('/cartItems/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = cartItemRouter;