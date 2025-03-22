import "dotenv/config";
import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';
import express from "express";

const app = createExpressServer({
    cors: true,
    controllers: ["src/controllers/*.ts"],
    middlewares: ["src/middlewares/*.ts"],
    routePrefix: "/api",
    defaultErrorHandler: false,
});

app.use(express.json());

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});