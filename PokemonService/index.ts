import {Pokemon} from "./src/models/pokemon";
import {Battle} from "./src/models/battle";

let pokemon1 : Pokemon = new Pokemon("Pikachu");
let pokemon2 : Pokemon = new Pokemon("Raichu");
pokemon2.levelUp(3);

let battle : Battle = new Battle(pokemon1, pokemon2);

battle.fight();

