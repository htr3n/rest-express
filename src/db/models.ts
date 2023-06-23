import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  address?: string;
  gender?: string;
  phone?: string;
}

const UserSchema = new Schema({
  email: { type: String, unique: true },
  phone: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  address: { type: String }
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export { UserModel };
