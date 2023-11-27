import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // create a schema validation using zod

    const { password, student: studentData } = req.body;
    // data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // data validation using zod
    // const zodParsedData = studentValidationSchema.parse(studentData);

    // will call service function to send this data

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message || 'Something went wrong',
    //   error: error,
    // });
    next(error);
  }
};

export const UserControllers = { createStudent };
