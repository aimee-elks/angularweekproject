"use strict";
exports.__esModule = true;
var pokemon_1 = require("./src/models/pokemon");
var battle_1 = require("./src/models/battle");
var pokemon1 = new pokemon_1.Pokemon("pikachu");
var pokemon2 = new pokemon_1.Pokemon("raichu");
pokemon2.levelUp(3);
var battle = new battle_1.Battle(pokemon1, pokemon2);
battle.fight();
