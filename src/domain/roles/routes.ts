import { Router } from 'express';
import { rolesController } from './controller';
import { authController } from '../auth/controller';
import { Permissions } from './permission/enum';

const router = Router({ strict: true, caseSensitive: true })
  .post('/', authController.checkPermission([Permissions.CAN_ROLE_CREATE]), rolesController.create)
  .patch(
    '/',
    authController.checkPermission([Permissions.CAN_ROLE_UPDATE]),
    rolesController.updateById,
  )
  .get('/', authController.checkPermission([Permissions.CAN_ROLE_GET_LIST]), rolesController.getAll)
  .get(
    '/:id',
    authController.checkPermission([Permissions.CAN_ROLE_GET_LIST]),
    rolesController.getById,
  )
  .delete(
    '/:id',
    authController.checkPermission([Permissions.CAN_ROLE_DELETE]),
    rolesController.deletedById,
  );

export default router;
