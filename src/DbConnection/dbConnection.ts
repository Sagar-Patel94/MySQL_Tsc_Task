import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const url: any = process.env.URL

export const sequelize = new Sequelize(url);
