import "dotenv/config";
import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';
import express from "express";
import { MysqlDataSource } from "./database";
import RegisterController from "./controllers/RegisterController";
import RegisterValidationMiddleware from "./middlewares/RegisterValidationMiddleware";
import bodyParser from "body-parser";


const app = createExpressServer({
    cors: true,
    controllers: [RegisterController],
    //middlewares: [RegisterValidationMiddleware],
    routePrefix: "/api",
    defaultErrorHandler: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const initializeDatabase = async () => {
    try{
        await MysqlDataSource.initialize();

    }catch(err){
        console.log("Error during Data Source initialization: ", err);
        process.exit(1);
    }
}

initializeDatabase();

const PORT = process.env.SERVER_PORT || 3333;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
}); 
