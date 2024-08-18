import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import express from 'express';
dotenv.config();
import connectToMongo from './db/connectToMongo.js';
import authRoutes from './routes/auth.routes.js'


const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectToMongo()
})