import config from '../../config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: IStudent) => {
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
  // manually set generated id
  userData.id = '2030100001';
  //create a user
  const newUser = await User.create(userData); // built in static method
  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference_id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
  return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};
