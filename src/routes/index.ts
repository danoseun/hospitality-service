import { Router } from 'express';
import { UserController } from '../controllers/user';


const { calculateOverStayFees } = UserController;

export const userRouter = Router();


userRouter.post('/calculate-overstay-fees/:reservationId', calculateOverStayFees);
