import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { sequelize } from "./src/DbConnection/dbConnection";
import userRoute from "./src/Routes/userRoute";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", userRoute);

const port = process.env.PORT;

app.listen(port, (): void => {
  console.log(`Server is running on port at ${port}`);
  sequelize
    .authenticate()
    .then(async () => {
      console.log("Database connected");
      try {
        await sequelize.sync({ force: false });
      } catch (error: any) {
        console.log(error.message);
      }
    })
    .catch((err: Error) => {
      console.log(err.message);
    });
});
