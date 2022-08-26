import pool from '../config/config';
import { logger } from '../utils';

const usersTable = `DROP TABLE IF EXISTS users CASCADE;
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            reservation_id INTEGER NOT NULL,
            room_type CHARACTER VARYING(255) NOT NULL,
            customer_id INTEGER NOT NULL,
            amount_paid NUMERIC NOT NULL,
            status CHARACTER VARYING(50) NOT NULL,
            checking_time TIMESTAMP,
            checkout_time TIMESTAMP
        )`;

/**
         * Function representing usertableHandler
         * @returns {object} representing success or failure
*/
export default async function createUserTable() {
  try {
    const create = await pool.query(usersTable);
    logger.info(`userTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    logger.error(`userTable ${error}`);
  }
}