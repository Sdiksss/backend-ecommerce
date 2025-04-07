const catchError = require('../utils/catchError');
const PurchaseItem = require('../models/PurchaseItem');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const Image = require('../models/Image')

const getAll = catchError(async (req, res) => {
  const userId = req.user.id;

  const items = await PurchaseItem.findAll({
    where: { userId },
    include: [{
      model: Product,
      include: Image
    }],
    order: [['createdAt', 'DESC']]
  });

  return res.json(items);
});

const create = catchError(async (req, res) => {
  const userId = req.user.id;

  // Obtener todos los cartItems del usuario con su producto
  const cartItems = await CartItem.findAll({
    where: { userId },
    include: Product
  });

  if (!cartItems.length) {
    return res.status(400).json({ message: 'El carrito está vacío' });
  }

  const purchaseItemsData = cartItems.map(item => ({
    quantity: item.quantity,
    totalPrice: item.quantity * item.product.price,
    productId: item.product.id,
    userId, // ahora se guarda directamente el userId
  }));

  // Crear los items de compra
  const purchaseItems = await PurchaseItem.bulkCreate(purchaseItemsData);

  // Vaciar el carrito
  await CartItem.destroy({ where: { userId } });

  return res.status(201).json(purchaseItems);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const item = await PurchaseItem.findOne({
    where: { id, userId },
    include: Product
  });

  if (!item) return res.sendStatus(404);
  return res.json(item);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await PurchaseItem.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await PurchaseItem.update(
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
};
