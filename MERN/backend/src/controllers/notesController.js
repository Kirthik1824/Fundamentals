import Note from '../models/Note.js';

export const getAllNotes = async (req,res)=>{
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
        console.log("Notes fetched successfully");
    }
    catch(error){
        console.error("Error fetching notes:", error);
        res.status(500).json({message: "Error fetching notes"});
    }
};

export const getNoteById = async (req,res)=>{
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(note);
    }
    catch(error){
        console.error("Error fetching note:", error);
        res.status(500).json({message: "Error fetching note"});
    }
}

export const createNote = async (req,res)=>{
    try {
        const { title, content } = req.body;
        const newNote = new Note({title, content});
        await newNote.save();
        res.status(201).json({message:"Note created successfully"});
    }
    catch(error){
        console.error("Error creating note:", error);
        res.status(500).json({message: "Error creating note"});
    }
};

export const updateNote = async (req,res)=>{
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        
        const note = await Note.findByIdAndUpdate(id, { title, content });
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message:"Note updated successfully"});
    }
    catch(error){
        console.error("Error updating note:", error);
        res.status(500).json({message: "Error updating note"});
    }
};

export const deleteNote = async (req,res)=>{
    const { id } = req.params;
    try {
        const note = await Note.findByIdAndDelete(id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message:"Note deleted successfully"});
    }
    catch(error){
        console.error("Error deleting note:", error);
        res.status(500).json({message: "Error deleting note"});
    }
};