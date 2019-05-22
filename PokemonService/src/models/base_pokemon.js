"use strict";
exports.__esModule = true;
var BasePokemon = /** @class */ (function () {
    function BasePokemon(id, name, type, color, attacks, baseStats, EVStats) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.color = color;
        this.attacks = attacks;
        this.baseStats = baseStats;
        this.EVStats = EVStats;
    }
    return BasePokemon;
}());
exports.BasePokemon = BasePokemon;
