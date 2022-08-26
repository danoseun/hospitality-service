import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import mlogger from 'morgan';

import { userRouter } from './routes';
import { messages } from './utils/message';
import { errorResponse, successResponse } from './utils/response';
import { statusCodes } from './utils/statuscode';
import { logger } from './utils';

dotenv.config();


const app = express();
app.use(cors());
//morgan for logging
app.use(mlogger('dev'));



app.use(express.json());



const port = process.env.PORT || 2023;

app.use('/api/v1', userRouter);


app.get('/api/v1', (_req: express.Request, res: express.Response) => successResponse(res, statusCodes.success, messages.welcome));

app.get('*', (_req: express.Request, res: express.Response) => errorResponse(res, statusCodes.notFound, messages.notFound));

app.all('*', (_req: express.Request, res: express.Response) => errorResponse(res, statusCodes.notFound, messages.notFound));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

export default app;