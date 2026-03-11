import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => { app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); }).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
});
 
