import express from "express";
import router from "./src/router.js";

const app = new express();

//config
app.use(express.json());
app.use(router);

app.get("/",(req, res) => {
   return res.status(200).json({message:"Server is running"});
});

export default app;
