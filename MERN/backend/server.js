import express from "express";

const app = express();

app.get("/api/notes",(req,res)=>{
    res.status(200).send("You have requested for notes"); 
})

app.post("/api/notes",(req,res)=>{
    res.status(201).json({message:"Note created successfully"}); 
})

app.put("/api/notes/:id",(req,res)=>{
    res.status(200).json({message:"Note updated successfully"}); 
})

app.delete("/api/notes/:id",(req,res)=>{
    res.status(200).json({message:"Note deleted successfully"}); 
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})