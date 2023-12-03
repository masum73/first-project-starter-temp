import express from 'express';
import { StudentControllers } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// will call controller function
// router.post('/create-student', StudentControllers.createStudent);

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
