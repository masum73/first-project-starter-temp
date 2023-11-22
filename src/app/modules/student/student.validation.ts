import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).trim(),
  middleName: z.string(),
  lastName: z.string().min(1),
});

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),

  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female']),
  email: z.string().email(),
  dateOfBirth: z.string(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']),
  permanentAddress: z.string(),
  presentAddress: z.string(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string(),
  isActive: z.enum(['active', 'block']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
