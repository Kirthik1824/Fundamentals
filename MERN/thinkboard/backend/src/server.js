import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// app.use((req,res,next)=>{
//     console.log(`${req.method} ${req.url}`);
//     next();
// });



connectDB().then(() => { app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); }).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
});
 
