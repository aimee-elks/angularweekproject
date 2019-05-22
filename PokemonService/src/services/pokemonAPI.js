"use strict";
exports.__esModule = true;
var Pokedex = require("pokedex-promise-v2");
var statistiques_1 = require("../models/statistiques");
var base_pokemon_1 = require("../models/base_pokemon");
var attack_1 = require("../models/attack");
var pokedex = new Pokedex();
// pokedex, pokemon, egg, type, description, move, abilities, sprite, game
function getPokemonData(name, done) {
    pokedex.getPokemonByName(name) // with Promise
        .then(function (response) {
        var base_stat = getPokemonBaseStat(response.stats);
        var ev_stat = getPokemonEVStat(response.stats);
        var types = getPokemonTypes(response.types);
        var abilities = getPokemonAbilities(response.moves);
        var color = response.color;
        var base = new base_pokemon_1.BasePokemon(response.id, response.name, types, color, abilities, base_stat, ev_stat);
        done(base);
    })["catch"](function (error) {
        console.log('There was an ERROR: ', error);
        done(null, error);
    });
}
exports.getPokemonData = getPokemonData;
function getPokemonList() {
    var list = [];
    return list;
}
exports.getPokemonList = getPokemonList;
function getPokemonBaseStat(stats) {
    var HP = 0;
    var A = 0;
    var D = 0;
    var SA = 0;
    var SD = 0;
    var S = 0;
    for (var i = 0; i < stats.length; i++) {
        HP = stats[i].stat.name == 'hp' ? stats[i].base_stat : HP;
        A = stats[i].stat.name == 'attack' ? stats[i].base_stat : A;
        D = stats[i].stat.name == 'defense' ? stats[i].base_stat : D;
        SA = stats[i].stat.name == 'special-attack' ? stats[i].base_stat : SA;
        SD = stats[i].stat.name == 'special-defense' ? stats[i].base_stat : SD;
        S = stats[i].stat.name == 'speed' ? stats[i].base_stat : S;
    }
    return new statistiques_1.Statistiques(HP, A, D, SA, SD, S);
}
function getPokemonEVStat(stats) {
    var HP = 0;
    var A = 0;
    var D = 0;
    var SA = 0;
    var SD = 0;
    var S = 0;
    for (var i = 0; i < stats.length; i++) {
        HP = stats[i].stat.name == 'hp' ? stats[i].effort : HP;
        A = stats[i].stat.name == 'attack' ? stats[i].effort : A;
        D = stats[i].stat.name == 'defense' ? stats[i].effort : D;
        SA = stats[i].stat.name == 'special-attack' ? stats[i].effort : SA;
        SD = stats[i].stat.name == 'special-defense' ? stats[i].effort : SD;
        S = stats[i].stat.name == 'speed' ? stats[i].effort : S;
    }
    return new statistiques_1.Statistiques(HP, A, D, SA, SD, S);
}
function getPokemonTypes(types) {
    var data = [];
    for (var i = 0; i < types.length; i++) {
        data.push(types[i].type.name);
    }
    return data;
}
function getPokemonAbilities(moves) {
    var data = [];
    var _loop_1 = function (i) {
        var id = 0;
        var name_1 = moves[i].move.name;
        var type = '';
        var pp = 0;
        var power = 0;
        var accuracy = 0;
        pokedex.getMoveByName(name_1)
            .then(function (response) {
            id = response.id;
            type = response.type.name;
            pp = response.pp;
            power = response.power;
            accuracy = response.accuracy;
        })["catch"](function (error) {
            console.log('There was an ERROR: ', error);
        });
        var ability = new attack_1.Attack(id, name_1, type, pp, power, accuracy);
        data.push(ability);
    };
    for (var i = 0; i < moves.length; i++) {
        _loop_1(i);
    }
    return data;
}
