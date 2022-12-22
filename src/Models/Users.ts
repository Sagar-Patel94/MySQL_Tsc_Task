import { DataTypes, Model } from "sequelize";
import { sequelize } from "../DbConnection/dbConnection";

class user extends Model {
  Id: any;
  UserId: any;
  Name: any;
  Email: any;
  Password: any;
  Dob: any;
  IsAdmin: any;
}

user.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    IsAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelize,
    modelName: "users",
  }
);

export default user;
