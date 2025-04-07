const catchError = require('../utils/catchError');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const User = require('../models/User');
const Image = require('../models/Image');


const getAll = catchError(async (req, res) => {
    const { productId } = req.query;
    const where = {}
    if (productId) where.productId = productId;

    const results = await CartItem.findAll({
        include: [{
            model: Product,
            include: [{
                model: Image
            }]
        }],
        where: where

    });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    //no use userId on res
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    console.log(userId)
    console.log(productId)

    // Buscar si ya existe un item con ese producto en el carrito
    const existingItem = await CartItem.findOne({
        where: { userId, productId }
    });

    console.log(existingItem)

    if (existingItem) {
        // Reemplazar la cantidad
        existingItem.quantity = quantity;
        await existingItem.save();
        return res.status(200).json(existingItem);
    }

    const result = await CartItem.create(
        {
            productId,
            quantity,
            userId: userId
        }
    );
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await CartItem.findByPk(id, { include: [User] });
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await CartItem.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await CartItem.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}