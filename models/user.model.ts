import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
  username: string;
  email: string;
  hash_password: string;
  created: Date;
}

const saltRounds = 8;

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next: (err?: any) => void) {
  const user = this;

  if (!user.isModified('hash_password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(user.hash_password, saltRounds);
    user.hash_password = hashedPassword;
    return next();
  } catch (err: unknown) {
    return next(err);
  }
});

const userModel = mongoose.model<User>('users', userSchema); 

export default userModel; 