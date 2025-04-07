const { getAll, create, getOne, remove, update } = require('../controllers/purchaseItem.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const purchaseItemRouter = express.Router();

purchaseItemRouter.route('/purchaseItems')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

purchaseItemRouter.route('/purchaseItems/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = purchaseItemRouter;