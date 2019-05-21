"use strict";
exports.__esModule = true;
var statistiques_1 = require("./statistiques");
var PokemonService = require("../services/pokemonAPI");
var Pokemon = /** @class */ (function () {
    function Pokemon(name, stat) {
        if (stat === void 0) { stat = new statistiques_1.Statistiques(); }
        this.base = PokemonService.getPokemon(name);
        this.IVStats = stat;
        this.life = 50;
        this.max_life = 50;
        this.level = 1;
    }
    Pokemon.prototype.levelUp = function (level) {
        if (level === void 0) { level = 1; }
        this.level += level;
        this.max_life += (10 * level);
        this.life = this.max_life;
    };
    Pokemon.prototype.getHitPoints = function () {
        var B = this.base.baseStats.H;
        var I = this.IVStats.H;
        var E = 1;
        var L = this.level;
        return Math.floor((2 * B + I + E) * L / 100 + L + 10);
    };
    Pokemon.prototype.getAttack = function () {
        var B = this.base.baseStats.A;
        var I = this.IVStats.A;
        var E = 1;
        var L = this.level;
        var N = 1;
        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    };
    Pokemon.prototype.getDefense = function () {
        var B = this.base.baseStats.B;
        var I = this.IVStats.B;
        var E = 1;
        var L = this.level;
        var N = 1;
        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    };
    Pokemon.prototype.getSpecialAttack = function () {
        var B = this.base.baseStats.C;
        var I = this.IVStats.C;
        var E = 1;
        var L = this.level;
        var N = 1;
        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    };
    Pokemon.prototype.getSpecialDefense = function () {
        var B = this.base.baseStats.D;
        var I = this.IVStats.D;
        var E = 1;
        var L = this.level;
        var N = 1;
        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    };
    Pokemon.prototype.getSpeed = function () {
        var B = this.base.baseStats.S;
        var I = this.IVStats.S;
        var E = 1;
        var L = this.level;
        var N = 1;
        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    };
    Pokemon.prototype.attack = function (otherPokemon, bonus_attack, isSpecial) {
        if (bonus_attack === void 0) { bonus_attack = 1; }
        if (isSpecial === void 0) { isSpecial = false; }
        var L = this.level;
        var A = isSpecial === false ? this.getAttack() : this.getSpecialAttack();
        var P = bonus_attack;
        var D = isSpecial === false ? otherPokemon.getDefense() : this.getSpecialDefense();
        var damage = Math.floor(Math.floor(Math.floor(2 * L / 5 + 2) * A * P / D) / 50) + 2;
        otherPokemon.life -= damage;
        if (otherPokemon.life < 0)
            otherPokemon.life = 0;
    };
    return Pokemon;
}());
exports.Pokemon = Pokemon;
