import { DataTypes, Model } from "sequelize";
import { sequelize } from "../DbConnection/dbConnection";

class otp extends Model {
  Id: any;
  UserId: any;
  OTP: any;
}

otp.init(
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
    OTP: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelize,
    modelName: "forgotPassReq",
  }
);

export default otp;
