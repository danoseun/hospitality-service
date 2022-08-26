import createUsersTable from './user';
import { seedUsers } from './seedUser';
import { logger } from '../utils'


(async () => {
  try {
    await createUsersTable();
    await seedUsers();
  } catch (error) {
    logger.error(`ERROR IN MIGRATION ${error}`);
  }
})();