import {Statistiques} from "./statistiques";
import {Attack} from "./attack";

export class BasePokemon {

    id: number;
    name : string;
    type: string[];
    color: string;
    attacks: Attack[];
    baseStats: Statistiques;
    EVStats: Statistiques;


    constructor(id: number, name: string, type: string[], color: string, attacks: Attack[], baseStats: Statistiques, EVStats: Statistiques) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.color = color;
        this.attacks = attacks;
        this.baseStats = baseStats;
        this.EVStats = EVStats;
    }
}