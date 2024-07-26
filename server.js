import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url";


//resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//console.log(__dirname);

//config env
dotenv.config();

//database config
connectDB();

//Rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './frontend/build')))

//routes
app.use('/api', taskRoutes);


//Rest api
app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
})

//PORT SETUP
const PORT = process.env.PORT || 5000;

//PORT LISTEN

app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
