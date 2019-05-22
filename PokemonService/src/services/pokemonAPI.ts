import * as Pokedex from 'pokedex-promise-v2';
import {Statistiques} from "../models/statistiques";
import {BasePokemon} from "../models/base_pokemon";
import {Attack} from "../models/attack";
const pokedex = new Pokedex();

// pokedex, pokemon, egg, type, description, move, abilities, sprite, game


export function getPokemonData(name: string, done) {
        pokedex.getPokemonByName(name) // with Promise
        .then(function (response) {
            let base_stat: Statistiques = getPokemonBaseStat(response.stats);
            let ev_stat: Statistiques = getPokemonEVStat(response.stats);
            let types = getPokemonTypes(response.types);
            let abilities = getPokemonAbilities(response.moves);
            let color = response.color;

            let base = new BasePokemon(response.id, response.name, types, color, abilities, base_stat, ev_stat);
            done(base);

        }).catch(function (error) {
            console.log('There was an ERROR: ', error);
            done(null, error);
        });
}



export function getPokemonList() : BasePokemon[] {

    let list: BasePokemon[] = [];


    return list;
}

function getPokemonBaseStat(stats) : Statistiques {

    let HP = 0;
    let A = 0;
    let D = 0;
    let SA = 0;
    let SD = 0;
    let S = 0;

    for(let i = 0; i < stats.length; i++) {

        HP = stats[i].stat.name == 'hp' ? stats[i].base_stat : HP;
        A = stats[i].stat.name == 'attack' ? stats[i].base_stat : A;
        D = stats[i].stat.name == 'defense' ? stats[i].base_stat : D;
        SA = stats[i].stat.name == 'special-attack' ? stats[i].base_stat : SA;
        SD = stats[i].stat.name == 'special-defense' ? stats[i].base_stat : SD;
        S = stats[i].stat.name == 'speed' ? stats[i].base_stat : S;
    }

    return new Statistiques(HP, A, D, SA, SD, S);

}

function getPokemonEVStat(stats) : Statistiques {

    let HP = 0;
    let A = 0;
    let D = 0;
    let SA = 0;
    let SD = 0;
    let S = 0;

    for(let i = 0; i < stats.length; i++) {

        HP = stats[i].stat.name == 'hp' ? stats[i].effort : HP;
        A = stats[i].stat.name == 'attack' ? stats[i].effort : A;
        D = stats[i].stat.name == 'defense' ? stats[i].effort : D;
        SA = stats[i].stat.name == 'special-attack' ? stats[i].effort : SA;
        SD = stats[i].stat.name == 'special-defense' ? stats[i].effort : SD;
        S = stats[i].stat.name == 'speed' ? stats[i].effort : S;
    }

    return new Statistiques(HP, A, D, SA, SD, S);

}

function getPokemonTypes(types) : string[] {

    let data : string[] = [];

    for(let i = 0; i < types.length; i++) {
        data.push(types[i].type.name);
    }

    return data;
}

function getPokemonAbilities(moves) : Attack[] {

    let data : Attack[] = [];

    for(let i = 0; i < moves.length; i++) {
        let id : number = 0;
        let name : string = moves[i].move.name;
        let type: string = '';
        let pp: number = 0;
        let power: number = 0;
        let accuracy: number = 0;

        pokedex.getMoveByName(name)
            .then(function(response) {
                id = response.id;
                type = response.type.name;
                pp = response.pp;
                power = response.power;
                accuracy = response.accuracy;
            })
            .catch(function(error) {
                console.log('There was an ERROR: ', error);
            });


        let ability = new Attack(id, name, type, pp, power, accuracy);
        data.push(ability);
    }

    return data;
}
