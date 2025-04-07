const CartItem = require("./CartItem");
const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const PurchaseItem = require("./PurchaseItem");
const User = require("./User");

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasMany(Image)
Image.belongsTo(Product)

// Relaciones para el carrito:

User.hasMany(CartItem)
CartItem.belongsTo(User)

// Cart - CartItem: un carrito tiene muchos items


// Producto - CartItem: un producto puede estar en muchos cartItems
Product.hasMany(CartItem, { foreignKey: 'productId' , onDelete: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'productId',  });


User.hasMany(PurchaseItem)
PurchaseItem.belongsTo(User)



Product.hasMany(PurchaseItem)
PurchaseItem.belongsTo(Product)

