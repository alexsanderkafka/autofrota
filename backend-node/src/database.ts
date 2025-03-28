import { DataSource } from "typeorm";
import 'dotenv/config';
import Login from "./entity/Login";
import ProfileImage from "./entity/ProfileImage";
import Business from "./entity/Business";
import Payment from "./entity/Payment";

export const MysqlDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "test",
    entities: [__dirname + "/entity/*.ts"],
    logging: true
});