import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;

  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface IStudent {
  id: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female';
  email: string;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'block';
  isDeleted: boolean;
}
// for creating static
export interface StudentModel extends Model<IStudent> {
  isStudentExists(id: string): Promise<IStudent | null>;
}
// for creating instance
// export interface StudentMethods {
//   isStudentExists(id: string): Promise<IStudent | null>;
// }

// export type StudentModel = Model<
//   IStudent,
//   Record<string, never>,
//   StudentMethods
// >;
