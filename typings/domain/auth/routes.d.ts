/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth
 */
declare const router: import("express-serve-static-core").Router;
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
