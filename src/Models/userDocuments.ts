import { DataTypes, Model } from "sequelize";
import { sequelize } from "../DbConnection/dbConnection";

class userDocuments extends Model {
  Id: any;
  UserId: any;
  DocumentId: any;
  Name: any;
}

userDocuments.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.UUID,
    },
    DocumentId: {
      type: DataTypes.STRING,
      defaultValue: "NA",
    },
    Name: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelize,
    modelName: "userDocuments",
  }
);

export default userDocuments;
