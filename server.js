import app from "./app.js";

//[ Enviroment Variables ]
const PORT = process.env.PORT

//An error will be thrown if there are any missing virables
if(!PORT){
    throw new Error("Missing PORT variable in .env file");
}

app.listen(PORT, ()=>{
    console.log(`Server listening at http://localhost:${PORT}`);
})