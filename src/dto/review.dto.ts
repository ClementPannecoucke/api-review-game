import { Game } from "../models/game.model";
import { GameDTO } from "./game.dto";

export interface ReviewDTO {
    id : number
    game ?: Game
    game_id: number
    rating ?: number
    review_text ?: string
}