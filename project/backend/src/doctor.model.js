import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  specialization: String,
  experience: Number,
  hospital: String,
  profileImage: String
});

export default mongoose.model('Doctor', doctorSchema);