import {Pokemon} from "./pokemon";

export class Battle {

    firstPokemon : Pokemon;
    secondPokemon : Pokemon;
    tour: number;

    constructor(PokemonA: Pokemon, PokemonB: Pokemon) {
        this.firstPokemon = PokemonA.level >= PokemonB.level ? PokemonA : PokemonB;
        this.secondPokemon = PokemonA.level >= PokemonB.level ? PokemonB : PokemonA;
        this.tour = 1;
    }


    fight() {
        while(this.firstPokemon.life !== 0 && this.secondPokemon.life !== 0) {

            console.log('Tour n°' + this.tour.toString() + ':');

            if (this.tour % 2 === 0) {
                this.secondPokemon.attack(this.firstPokemon);
                console.log(this.secondPokemon.base.name + ' attaque ' + this.firstPokemon.base.name);
            } else {
                this.firstPokemon.attack(this.secondPokemon);
                console.log(this.firstPokemon.base.name + ' attaque ' + this.secondPokemon.base.name);
            }

            console.log(this.firstPokemon.base.name + ' - PV : ' + this.firstPokemon.life.toString());
            console.log(this.secondPokemon.base.name + ' - PV : ' + this.secondPokemon.life.toString());

            this.tour += 1;
        }

        let winner : Pokemon = this.firstPokemon.life > this.secondPokemon.life ? this.firstPokemon : this.secondPokemon;

        console.log('Le gagnant est : ' + winner.base.name);
    }




}