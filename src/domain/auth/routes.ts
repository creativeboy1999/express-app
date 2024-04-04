import { Router } from 'express';
import { authController } from './controller';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth
 */
const router = Router()
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Login
   *     tags: [Auth]
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Login'
   *     responses:
   *       200:
   *         description: Login with email and password
   *         content:
   *           application/json:
   *             schema:
   *               type: Object
   *                 $ref: '#/components/schemas/Login'
   */
  .post('/login', authController.login)
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Register
   *     tags: [Auth]
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Register'
   *     responses:
   *       200:
   *         description: Registration
   *         content:
   *           application/json:
   *             schema:
   *               type: Object
   *                 $ref: '#/components/schemas/Register'
   */
  .post('/register', authController.register)
  /**
   * @swagger
   * /auth/me:
   *   get:
   *     summary: For get me
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description:
   *       401:
   *         description: Invalid credentials
   */
  .get('/me', authController.authorizeUser, authController.getMe);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email
 *         password:
 *           type: string
 *           description: Password
 *       example:
 *         email: johndoe@email.com
 *         password: some_password_here
 *     Register:
 *       type: object
 *       required:
 *         - firstName
 *         - email
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
