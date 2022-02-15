const express = require('express');
const item = express();
const { item: ItemController } = require('../controllers');
const itemController = new ItemController();

item.route('/').get(itemController.getList).post(itemController.create);

item.route('/amount').get(itemController.getAmount);

item
  .route('/:name')
  .get(itemController.getOne)
  .patch(itemController.update)
  .delete(itemController.delete);

module.exports = item;

/**
 * @swagger
 * tags:
 *   name: Items
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get list
 *     description: Get list of items with filter.
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   categoty:
 *                     type: string
 *       "404":
 *         description: Items not found
 *   post:
 *     summary: Add new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       "201":
 *         description: OK
 *       "400":
 *         description: Invalid input
 */

/**
 * @swagger
 * /items/amount:
 *   get:
 *     summary: Get amount
 *     description: Get list of categories with amount items.
 *     tags: [Items]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *       "404":
 *         description: Categories not found
 */

/**
 * @swagger
 * /items/{name}:
 *   get:
 *     summary: Get one item
 *     description: Get one item by name.
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - category
 *               properties:
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *       "404":
 *         description: Items not found
 *   patch:
 *     summary: Update item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Invalid input
 *       "404":
 *         description: Items not found
 *   delete:
 *     summary: Delete item
 *     description: Delete item by name.
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Items not found
 */
