import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  age: Number,
  gender: String,
  bloodGroup: String,
  address: String,
  emergencyContact: String,
  medicalHistory: [String],
  profileImage: String
});

export default mongoose.model('User', userSchema);