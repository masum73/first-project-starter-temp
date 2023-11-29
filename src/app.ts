/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes

// app.use('/api/v1/students/', StudentRoutes);
// app.use('/api/v1/users/', UserRoutes);
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const a = 15;
  res.send(a);
};

app.get('/', test);

// global error
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
