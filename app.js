import express from "express";

const app = new express();

//config
app.use(express.json());

//routes
app.get("/",(req, res)=>{
   return res.status(200).json({message:"Server is running"});
});

export default app;