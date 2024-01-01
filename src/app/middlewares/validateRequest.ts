// middleware - route theke middleware a jabe then controller a jabe

import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

// higher order function
const validateRequest = (schema: AnyZodObject) => {
  // return async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     // validation
  //     // if everything all alright then it will go to controller
  //     await schema.parseAsync({
  //       body: req.body,
  //     });
  //     next();
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;
