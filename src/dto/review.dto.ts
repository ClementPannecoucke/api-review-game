import { Game } from "../models/game.model";
import { GameDTO } from "./game.dto";

export interface ReviewDTO {
    id?: number
    game ?: GameDTO
    game_id: number
    rating : number
    review_text : string
}