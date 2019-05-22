"use strict";
exports.__esModule = true;
var statistiques_1 = require("./statistiques");
var PokemonService = require("../services/pokemonAPI");
var Pokemon = /** @class */ (function () {
    function Pokemon(name) {
        var _this = this;
        PokemonService.getPokemonData(name, function (basePokemon, err) {
            _this.base = basePokemon;
        });
        this.delay(1000);
        this.IVStats = this.generate_randomStats();
        this.level = 1;
        this.life = this.getHitPoints();
        this.max_life = this.getHitPoints();
        this.pp = 100;
        this.max_pp = 100;
    }
    Pokemon.prototype.generate_randomStats = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 31; }
        return new statistiques_1.Statistiques(Math.floor(Math.random() * max) + min, Math.floor(Math.random() * max) + min, Math.floor(Math.random() * max) + min, Math.floor(Math.random() * max) + min, Math.floor(Math.random() * max) + min, Math.floor(Math.random() * max) + min);
    };
    Pokemon.prototype.levelUp = function (level) {
        if (level === void 0) { level = 1; }
        this.level += level;
        this.max_life = this.getHitPoints();
        this.max_pp += (10 * level);
        this.fullLife();
        this.fullPP();
    };
    Pokemon.prototype.fullLife = function () {
        this.life = this.max_life;
    };
    Pokemon.prototype.fullPP = function () {
        this.pp = this.max_pp;
    };
    Pokemon.prototype.getHitPoints = function () {
        var B = this.base.baseStats.hitPoints;
        var I = this.IVStats.hitPoints;
        var E = this.base.EVStats.hitPoints;
        var L = this.level;
        return Math.floor((2 * B + I + E) * L / 100 + L + 10);
    };
    Pokemon.prototype.getAttack = function (nature) {
        if (nature === void 0) { nature = 1; }
        var B = this.base.baseStats.attack;
        var I = this.IVStats.attack;
        var E = this.base.EVStats.attack;
        var L = this.level;
        var N = nature;
        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    };
    Pokemon.prototype.getDefense = function (nature) {
        if (nature === void 0) { nature = 1; }
        var B = this.base.baseStats.defense;
        var I = this.IVStats.defense;
        var E = this.base.EVStats.defense;
        var L = this.level;
        var N = nature;
        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    };
    Pokemon.prototype.getSpecialAttack = function (nature) {
        if (nature === void 0) { nature = 1; }
        var B = this.base.baseStats.special_attack;
        var I = this.IVStats.special_attack;
        var E = this.base.EVStats.special_attack;
        var L = this.level;
        var N = nature;
        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    };
    Pokemon.prototype.getSpecialDefense = function (nature) {
        if (nature === void 0) { nature = 1; }
        var B = this.base.baseStats.special_defense;
        var I = this.IVStats.special_defense;
        var E = this.base.EVStats.special_attack;
        var L = this.level;
        var N = nature;
        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    };
    Pokemon.prototype.getSpeed = function (nature) {
        if (nature === void 0) { nature = 1; }
        var B = this.base.baseStats.speed;
        var I = this.IVStats.speed;
        var E = this.base.EVStats.speed;
        var L = this.level;
        var N = nature;
        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    };
    Pokemon.prototype.attack = function (otherPokemon, attack, isSpecial) {
        if (isSpecial === void 0) { isSpecial = false; }
        this.pp -= attack.pp;
        var L = this.level;
        var A = isSpecial === false ? this.getAttack() : this.getSpecialAttack();
        var P = attack.power;
        var D = isSpecial === false ? otherPokemon.getDefense() : this.getSpecialDefense();
        var damage = Math.floor(Math.floor(Math.floor(2 * L / 5 + 2) * A * P / D) / 50) + 2;
        otherPokemon.life -= damage;
        if (otherPokemon.life < 0)
            otherPokemon.life = 0;
    };
    Pokemon.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return Pokemon;
}());
exports.Pokemon = Pokemon;
