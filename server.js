import app from "./app.js";

//[ Enviroment Variables ]
//in this case, the PORT constant will use a default 3000 if it's not defined
//in the .env file
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, ()=>{
    console.log(`Server listening at http://localhost:${PORT}`);
})