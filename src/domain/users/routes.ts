import { Router } from 'express';
import { usersController } from './controller';
import { Permissions } from '../roles/permission/enum';
import { authController } from '../auth/controller';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description:
 */
const router = Router({ strict: true, caseSensitive: true })
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: create users
   *     tags: [Users]
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: The user was created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  .post('/', authController.checkPermission([Permissions.CAN_USER_CREATE]), usersController.create)
  /**
   * @swagger
   * /users:
   *   patch:
   *     summary: update user
   *     tags: [Users]
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: The user was updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  .patch(
    '/',
    authController.checkPermission([Permissions.CAN_USER_UPDATE]),
    usersController.updateById,
  )
  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get the user by id
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user id
   *     responses:
   *       200:
   *         description: The user response by id
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: The user was not found
   */
  .get(
    '/:id',
    authController.checkPermission([Permissions.CAN_USER_GET_LIST]),
    usersController.getById,
  )
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get the users
   *     tags: [Users]
   */
  .get('/', authController.checkPermission([Permissions.CAN_USER_GET_LIST]), usersController.getAll)
  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete the user by id
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user id
   *     responses:
   *       404:
   *         description: The user was not found
   */
  .delete(
    '/:id',
    authController.checkPermission([Permissions.CAN_USER_DELETE]),
    usersController.deletedById,
  );

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - firstName
 *         - password
 *       properties:
 *         email:
 *           type: email
 *           description: Email
 *         password:
 *           type: string
 *           description: Password
 *         firstName:
 *           type: string
 *           description: firstName
 *         lastName:
 *           type: string
 *           description: lastName
 *         birthday:
 *           type: string
 *           description: "birthday. Format: YYYY-MM-DD"
 *         phoneNumber:
 *           type: string
 *           description: "phoneNumber. Format: +998XXYYYYYYY"
 *       example:
 *         firstName: John
 *         email: johndoe@email.com
 *         password: some_password_here
 *         lastName: Doe
 *         birthday: "2000-01-01"
 *         phoneNumber: "+998901234567"
 */
