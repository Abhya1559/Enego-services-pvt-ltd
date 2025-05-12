import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";

import cors from "cors"

const app = express()

dotenv.config();
app.use(cors())
app.use(express.json())

import userRouter from "./routes/user.routes.js";
import projectRoutes from './routes/project.routes.js';
import taskRoutes from './routes/task.routes.js';
import { errorHandler } from "./middleware/error.middleware.js";

app.use("/api/users",userRouter)
app.use("/api/projects",projectRoutes)
app.use("/api/tasks",taskRoutes)

//error handler middleware
app.use(errorHandler)

//Mongo db connection

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB connected")).catch(err => console.error('Mongodb connection error',err))

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server