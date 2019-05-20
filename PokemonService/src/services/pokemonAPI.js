"use strict";
exports.__esModule = true;
var Pokedex = require("pokedex.js");
var pokedex = new Pokedex('en');
function getPokemon(name) {
    return JSON.parse(pokedex.name(name).get())[0];
}
exports.getPokemon = getPokemon;
