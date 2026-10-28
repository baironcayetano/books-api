import app from "./app.js";
import { connectToDb } from "./src/db/connect.js";

//[ Enviroment Variables ]
const PORT = process.env.PORT;

//An error will be thrown if there are any missing virables
if(!PORT){
    throw new Error("Missing PORT variable in .env file");
}

//Init Function
const startServer = async () => {
	try{
		await connectToDb();
		app.listen(PORT, () => {
			console.log(`Server listening at https://localhost:${PORT}`);
		});
	}catch(error){
		console.error("Database connection failed:", error.message);
		process.exit(1);
	}
};

startServer();
