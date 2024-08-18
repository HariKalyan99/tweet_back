import dotenv from 'dotenv'
import express from 'express';
dotenv.config();
import connectToMongo from './db/connectToMongo.js';
import authRoutes from './routes/auth.routes.js'


const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectToMongo()
})