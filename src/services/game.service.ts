import { GameDTO } from "../dto/game.dto";
import { notFound } from "../error/NotFoundError";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }

  public async getGameById(id : number): Promise<GameDTO | null> {
    const game: Game | null = await Game.findByPk(id, {
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
    if(!game){
      notFound("Game")
    }
    return game
  }

  public async createGame(
    console_id: number | undefined,
    title: string
  ): Promise<GameDTO | null> {
    if(console_id){
      return Game.create({console_id: console_id, title: title});
    }
    return notFound("Console")
  }
}

export const gameService = new GameService();
