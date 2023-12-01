// import { IStudent } from './student.interface';
import { Student } from './student.model';

// const createStudentIntoDB = async (studentData: IStudent) => {
//   if (await Student.isStudentExists(studentData.id)) {
//     throw new Error('Student already Exists');
//   }

//   const result = await Student.create(studentData); // built in static method

//   // const student = new Student(studentData); //create instance
//   // if (await student.isStudentExists(studentData.id)) {
//   //   throw new Error('Student already Exists');
//   // }

//   // const result = await student.save(); // built in instance method
//   return result;
// };

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
