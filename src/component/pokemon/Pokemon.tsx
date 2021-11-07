import React, {useState, useEffect, createContext} from "react";
import "./Pokemon.scss"
import { Link, Route, useLocation} from "react-router-dom";
import Ability from "../abilities/Ability";
import Form from "../form/Form";
import Move from "../moves/Move";

let pk = {
    pokeName : "",
    pokeFormUrl : "",
}

export const PokemonContext  =  createContext(pk);

let Pokemon = () => {
    let props = useLocation();
    // @ts-ignore
    let url = props.state.item.url;
    let [pokemon, setPokemon] = useState([]);
    useEffect(()=> {fetchItems().then(r =>
        console.log("got pokemon details"))
    ;},[url])
    let fetchItems = async () => {
        let data = await fetch(url);
        let items = await data.json();
        pk.pokeFormUrl = items.forms[0].url
        setPokemon(items);
    }

// @ts-ignore
    let getAbilities =(ability)=> {
        setPokemon(ability)
        let a =
            <Link id={ability.name + "-"}
                  to={{pathname :"/component/abilities/Ability",
                      state: {ability}}}>
            </Link>
        return a;
    }

    // @ts-ignore
    let p = <>{props.state.item.name}</>;
    // @ts-ignore
    pk.pokeName = props.state.item.name;

    function getForm() {
        // @ts-ignore
        return <Form/>;
    }

    let getMoves =() =>{

        let col : any[] =[];
        if(pokemon.length == undefined) {
            // @ts-ignore
            let moves = pokemon.moves;
            for(let i = 0; i ==0; i++){
                // @ts-ignore
                let move = Move(moves[i].move.name, moves[i].move.url);
                col.push(move)
            }
            return col;
        }

    }

// @ts-ignore
    let div = <PokemonContext.Provider value={pk}>
                <div className="pokeItem ">
                    <div id="list">
                        <p>
                            <ul>
                                <div className="pokeBase">
                                    <p>{p}</p>
                                </div>
                                <Ability/>
                                {getForm()}
                                {getMoves()}
                            </ul>
                        </p>
                    </div>
                </div>
            </PokemonContext.Provider>;
    return div
};
export default Pokemon;