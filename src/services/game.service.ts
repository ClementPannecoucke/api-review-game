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

  public async updateGame(
    id: number,
    title?: string,
  ): Promise<Game | null> {
    const game = await Game.findByPk(id);
    if (game) {
      if (title) game.title = title;
      await game.save();
      return game;
    }
    return notFound(`Game`)
  }

  public async getGamesByConsoleId(id: number): Promise<GameDTO[]> {
    return Game.findAll({
      where: {
        console_id: id,
      },
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }
}

export const gameService = new GameService();
