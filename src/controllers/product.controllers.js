const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { Op } = require('sequelize');
const Image = require('../models/Image');

const getAll = catchError(async (req, res) => {
    //search queries
    const { categoryId, title, description, offset, perPage } = req.query;
    const where = {}
    if (categoryId) where.categoryId = categoryId;
    if (title) where.title = { [Op.iLike]: `%${title}%` };
    if (description) where.description = { [Op.iLike]: `%${description}%` };

    const results = await Product.findAll({
        include: [Category, Image],
        where: where,

        //pagination
        offset: offset,
        limit: perPage,


    });
      // Contamos el total de productos que cumplen con el filtro
      const total = await Product.count({where});

    return res.json({total, results });
});



const create = catchError(async (req, res) => {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id, { include: [Category, Image] });
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Product.update(
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