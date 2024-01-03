import express from "express";
import connectedDB from "./config/dbconnection.js";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoute from "./routes/auth.Route.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/',authRoute)
connectedDB();
app.use(morgan('dev'));


app.listen(port, () => console.log(`Server is running on port ${port}`));
