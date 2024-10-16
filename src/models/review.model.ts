import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { Game } from "./game.model";
import { allow } from "joi";

export interface ReviewAttributes {
  id? : number;
  game ?: Game
  game_id ?: number;
  rating ?: number;
  review_text ?: string;
}

export class Review extends Model<ReviewAttributes> implements ReviewAttributes
{
  public id !: number;
  public game !: Game;
  game_id !: number;
  public rating !: number;
  public review_text !: string;
}

Review.init(
  {
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    game_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review_text : {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "reviews",
  }
);

Review.belongsTo(Game, {foreignKey: "game_id", as: "game"});