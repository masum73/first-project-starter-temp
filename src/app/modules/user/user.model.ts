import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: { type: Date },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// pre save middleware / hook : will work on create() and save()
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');

  // hashing password and saving to db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const student = this; //doc
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook - set ' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<IUser, UserModel>('User', userSchema);
