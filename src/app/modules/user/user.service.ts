import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //   if password is not given , use default password
  userData.password = password || (config.default_password as string);
  //   if (!password) {
  //     user.password = config.default_password as string;
  //   }else{
  //     user.password = password
  //   }

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error('semester not found');
  }
  // two write operations( user and student creation) so one may successful and one may not or both can be unsuccessful that's why we need to user transaction and rollback method
  //mongoose methods

  const session = await mongoose.startSession();

  try {
    // session start
    session.startTransaction();
    // manually set generated id
    // userData.id = '2030100001';
    userData.id = await generateStudentId(admissionSemester);

    //create a user (transaction -1 )
    const newUser = await User.create([userData], { session }); // built in static method
    // console.log(newUser);
    // newUser, newStudent age chilo object ekhn transaction use korar karone hoye gese array
    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference_id
    // create a student (2nd transaction)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    // console.log(error);
    throw new Error('Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
