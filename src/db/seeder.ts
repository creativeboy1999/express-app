import { exit } from 'process';
import { seedPermissions, seedRoles, seedUsers } from './mongo/seeds';
import { mongoDataBase } from './mongo/connect.db';

(async () => {
  let err = await mongoDataBase.initialize();
  if (err) {
    console.log(err, 'mongo db connection error');
    return err; // graceFullShutdown(err)
  }
  console.log('success connect: mongodb ');

  await seedPermissions().catch();
  await seedRoles().catch();
  await seedUsers().catch();

  console.log('Success end');

  exit(1);
})();
