/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import studentValidationSchema from './student.validation';
// import studentValidationSchema from './student.validation';
// import { z } from 'zod';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     // create a schema validation using zod

//     const { student: studentData } = req.body;
//     // data validation using Joi
//     // const { error, value } = studentValidationSchema.validate(studentData);

//     // data validation using zod
//     const zodParsedData = studentValidationSchema.parse(studentData);

//     // will call service function to send this data

//     const result = await StudentServices.createStudentIntoDB(zodParsedData);

//     // if (error) {
//     //   res.status(500).json({
//     //     success: false,
//     //     message: 'Something went wrong',
//     //     error: error.details,
//     //   });
//     // }

//     // send response
//     res.status(200).json({
//       success: true,
//       message: 'Student is created successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Something went wrong',
//       error: error,
//     });
//   }
// };

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    // res.status(200).json({
    //   success: true,
    //   message: 'Students are retrieved successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved successfully',
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

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // res.status(200).json({
    //   success: true,
    //   message: 'Single Student is retrieved successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Student is retrieved successfully',
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

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    // res.status(200).json({
    //   success: true,
    //   message: 'Student is deleted successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is deleted successfully',
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

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
