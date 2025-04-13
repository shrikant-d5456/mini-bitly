import cookieParser from "cookie-parser";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
import authRoutes from './routes/authRoutes.js';
import urlRoutes from './routes/urlRoutes.js';


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/auth/user', authRoutes);
app.use('/url', urlRoutes);

// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGODB_URL}/short-url`)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default app;
