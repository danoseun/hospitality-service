import express from "express";
import db from "../config/index";

import {
  errorResponse,
  messages,
  sql,
  statusCodes,
  hasOnlyDigits,
  successResponseWithData,
  DaysOfTheWeek,
  calculateFees,
} from "../utils";

export const UserController = {
  /**
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof UserController
   */
  async calculateOverStayFees(req: express.Request, res: express.Response) {
    const { reservationId } = req.params;

    const { day, exitDateTime } = req.body;

    try {
      if (!reservationId || !hasOnlyDigits(reservationId)) {
        return errorResponse(
          res,
          statusCodes.badRequest,
          messages.badRequest("reservationId")
        );
      }

      if (!day || !DaysOfTheWeek.includes(day)) {
        return errorResponse(
          res,
          statusCodes.badRequest,
          messages.badRequest("day")
        );
      }

      if (!exitDateTime) {
        return errorResponse(
          res,
          statusCodes.badRequest,
          messages.badRequest("exitDateTime")
        );
      }

      const result = await db.query(sql.fetchSingleBooking, [
        Number(reservationId),
      ]);

      if (!result?.rows.length) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      }

      const amountPaid = +result?.rows[0]["amount_paid"];
      const roomType = result?.rows[0]["room_type"];
      const checkOutTime = result?.rows[0]["checkout_time"];

      const overStayFees = calculateFees(
        day,
        roomType,
        exitDateTime,
        amountPaid,
        checkOutTime
      );

      return successResponseWithData(
        res,
        statusCodes.success,
        messages.success,
        overStayFees
      );
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
  },
};

/**2021-01-02 12:00
 *
 * check if checkout day is weekday or weekend
 * if weekend, find value of result[0].room_type in roomTypesAndWeekendRates
 * find difference between current time and checkout time
 * multiply difference by value of line 2
 * then result/100 * amount + amount is answer
 */
