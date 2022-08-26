import dotenv from 'dotenv';
import pool from '../config/config';
import format from 'pg-format';
import { logger } from '../utils';


dotenv.config();


const variables = [
  [12000, 'deluxe', 12323, 230000, 'paid', '2020-12-12 12:00:00', '2021-01-01 11:00:00'],
  [12001, 'regular', 12324, 150000, 'paid', '2020-12-12 12:00:00', '2021-01-01 11:00:00' ],
  [12002, 'palatial', 12100, 560000, 'paid', '2020-12-12 12:00:00', '2021-01-01 11:00:00'],
  [12003, 'regular', 12323, 200000, 'paid', '2020-12-25 12:00:00', '2021-01-04 11:00:00']
];
const sql = format('INSERT INTO users (reservation_id, room_type, customer_id, amount_paid, status, checking_time, checkout_time) VALUES %L returning id', variables);

/**
    * Function representing usersSeeder
    * @returns {object} representing success or failure
*/
export async function seedUsers():Promise<any> {
  try {
    const result = await pool.query(sql);
    logger.info(`Users ${result.command}ED`);
  } catch (error) {
    logger.error(`seedUsers ${error}`);
  }
}