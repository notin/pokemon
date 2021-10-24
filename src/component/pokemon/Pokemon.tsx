import React, {useState, useEffect, createContext} from "react";
import "./Pokemon.scss"
import { Link, Route, useLocation} from "react-router-dom";
import Ability from "../abilities/Ability";

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
        pk.pokeFormUrl = items.forms.url
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
    // @ts-ignore
    let div = <PokemonContext.Provider value={pk}>
        <div className="pokeItem ">

        <div id="a" >
            <div>
                <p className="poke">{p}</p>
            </div>
            <p >
                <ul>
                    <Ability/>
                </ul>
            </p>

        </div>
    </div>
        </PokemonContext.Provider>;
    return div
};
export default Pokemon;