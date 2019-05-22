import {BasePokemon} from "./base_pokemon";
import {Statistiques} from "./statistiques";
import {Attack} from "./attack";
import * as PokemonService from "../services/pokemonAPI";

export class Pokemon {

    base: BasePokemon;
    IVStats: Statistiques;
    level: number;
    life: number;
    max_life: number;
    pp: number;
    max_pp: number;

    constructor(name : string) {
        PokemonService.getPokemonData(name, (basePokemon, err) => {
           this.base = basePokemon;
        });

        this.IVStats = this.generate_randomStats();
        this.level = 1;

        this.life = this.getHitPoints();
        this.max_life = this.getHitPoints();
        this.pp = 100;
        this.max_pp = 100;
    }

    private generate_randomStats(min : number = 0, max: number = 31) {
        return new Statistiques(Math.floor(Math.random() * max) + min,
                                Math.floor(Math.random() * max) + min,
                                Math.floor(Math.random() * max) + min,
                                Math.floor(Math.random() * max) + min,
                                Math.floor(Math.random() * max) + min,
                                Math.floor(Math.random() * max) + min);
    }

    levelUp(level:number = 1) {
        this.level += level;
        this.max_life = this.getHitPoints();
        this.max_pp += (10*level);
        this.fullLife();
        this.fullPP();
    }

    fullLife() {
        this.life = this.max_life;
    }

    fullPP() {
        this.pp = this.max_pp;
    }

    getHitPoints():number {

        let B : number = this.base.baseStats.hitPoints;
        let I : number = this.IVStats.hitPoints;
        let E : number = this.base.EVStats.hitPoints;
        let L : number = this.level;

        return Math.floor((2 * B + I + E) * L / 100 + L + 10);
    }

    getAttack(nature: number = 1):number {

        let B : number = this.base.baseStats.attack;
        let I : number = this.IVStats.attack;
        let E : number = this.base.EVStats.attack;
        let L : number = this.level;
        let N : number = nature;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getDefense(nature: number = 1):number {
        let B : number = this.base.baseStats.defense;
        let I : number = this.IVStats.defense;
        let E : number = this.base.EVStats.defense;
        let L : number = this.level;
        let N : number = nature;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getSpecialAttack(nature: number = 1):number {

        let B : number = this.base.baseStats.special_attack;
        let I : number = this.IVStats.special_attack;
        let E : number = this.base.EVStats.special_attack;
        let L : number = this.level;
        let N : number = nature;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getSpecialDefense(nature: number = 1):number {

        let B : number = this.base.baseStats.special_defense;
        let I : number = this.IVStats.special_defense;
        let E : number = this.base.EVStats.special_attack;
        let L : number = this.level;
        let N : number = nature;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getSpeed(nature: number = 1):number {

        let B : number = this.base.baseStats.speed;
        let I : number = this.IVStats.speed;
        let E : number = this.base.EVStats.speed;
        let L : number = this.level;
        let N : number = nature;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    attack(otherPokemon : Pokemon, attack: Attack, isSpecial : boolean = false) {

        this.pp -= attack.pp;

        let L : number = this.level;
        let A : number = isSpecial === false ? this.getAttack() : this.getSpecialAttack();
        let P : number = attack.power;
        let D : number = isSpecial === false ? otherPokemon.getDefense() : this.getSpecialDefense();

        let damage : number = Math.floor(Math.floor(Math.floor(2 * L / 5 + 2) * A * P / D) / 50) + 2;

        otherPokemon.life -= damage;
        if (otherPokemon.life < 0) otherPokemon.life = 0;
    }
}
