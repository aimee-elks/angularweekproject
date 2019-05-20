import {Pokemon} from "../models/pokemon";
import {Battle} from "../models/battle";


describe('Battle TESTS', function() {

    it('Should get Raichu as First', function() {
        let pokemon1 : Pokemon = new Pokemon("Pikachu");
        let pokemon2 : Pokemon = new Pokemon("Raichu");
        pokemon2.levelUp(3);

        let battle : Battle = new Battle(pokemon1, pokemon2);

        expect(battle.getFirst().base.name).toBe("Raichu");
    });



});