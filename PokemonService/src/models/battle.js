"use strict";
exports.__esModule = true;
var Battle = /** @class */ (function () {
    function Battle(PokemonA, PokemonB) {
        this.firstPokemon = PokemonA.level <= PokemonB.level ? PokemonA : PokemonB;
        this.secondPokemon = PokemonA.level <= PokemonB.level ? PokemonB : PokemonA;
        this.tour = 1;
    }
    Battle.prototype.fight = function () {
        while (this.firstPokemon.life !== 0 && this.secondPokemon.life !== 0) {
            console.log('Tour n°' + this.tour.toString() + ':');
            if (this.tour % 2 === 0) {
                var min = 0;
                var max = this.secondPokemon.base.ability.length - 1;
                console.log(max);
                var random_num = Math.floor(Math.random() * (+max - +min)) + +min;
                console.log(random_num);
                var ability = this.secondPokemon.base.ability[random_num];
                console.log(ability);
                var isSpecial = Boolean(Math.round(Math.random()));
                this.secondPokemon.attack(this.firstPokemon, ability.name.length, isSpecial);
                console.log(this.secondPokemon.base.name + ' lance une attaque "' + ability.name + '" sur ' + this.firstPokemon.base.name);
            }
            else {
                var min = 0;
                var max = this.firstPokemon.base.ability.length - 1;
                console.log(max);
                var random_num = Math.floor(Math.random() * (+max - +min)) + +min;
                console.log(random_num);
                var ability = this.firstPokemon.base.ability[random_num];
                console.log(ability);
                var isSpecial = Boolean(Math.round(Math.random()));
                this.firstPokemon.attack(this.secondPokemon, ability.name.length, isSpecial);
                console.log(this.firstPokemon.base.name + ' lance une attaque "' + ability.name + '" sur ' + this.secondPokemon.base.name);
            }
            console.log(this.firstPokemon.base.name + ' - PV : ' + this.firstPokemon.life.toString());
            console.log(this.secondPokemon.base.name + ' - PV : ' + this.secondPokemon.life.toString());
            this.tour += 1;
        }
        if (this.firstPokemon.life > this.secondPokemon.life) {
            console.log('Le gagnant est : ' + this.firstPokemon.base.name);
            return this.firstPokemon;
        }
        else {
            console.log('Le gagnant est : ' + this.secondPokemon.base.name);
            return this.secondPokemon;
        }
    };
    return Battle;
}());
exports.Battle = Battle;
