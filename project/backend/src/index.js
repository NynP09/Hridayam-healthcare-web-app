import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './user.routes.js';
import doctorRoutes from './doctor.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/projectbolt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('MongoDB connection error:', err));
