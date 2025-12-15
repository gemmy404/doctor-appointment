import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDb} from './config/db.config.js';
import {authRouter} from "./routes/auth.route.js";

const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());

await connectDb();

app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});