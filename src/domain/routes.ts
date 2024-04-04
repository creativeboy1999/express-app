import { Request, Router, Response } from 'express';
import swagger from './swagger';
import usersRouter from './users/routes';
import authRouter from './auth/routes';
import rolesRouter from './roles/routes';
import { authController } from './auth/controller';

const v1 = Router({ strict: true, caseSensitive: true })
  .use('/auth', authRouter)
  .use('/api-docs', swagger)
  .use(authController.authorizeUser)
  .use('/users', usersRouter)
  .use('/roles', rolesRouter);

const router = Router()
  .use('/v1', v1)
  /**
   * @swagger
   * /error:
   *   get:
   *     description: Test error!
   *     responses:
   *       500:
   *         description: Returns a mysterious string.
   */
  .get('/error', async () => {
    throw new Error('Custom error)');
  })
  /**
   * @swagger
   * /check-health:
   *   get:
   *     description: Test error!
   *     responses:
   *       200:
   *         description: Ok if returns ok.
   */
  .get('/check-health', async (req: Request, res: Response) => {
    res.success({ message: "I'm OK. THANKS" });
  });

export default router;
