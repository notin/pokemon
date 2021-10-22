import React, { useState, useEffect } from "react";
import "./Pokemon.scss"
import { Link, Route, useLocation} from "react-router-dom";
import Ability from "../abilities/Ability";


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
        // <Ability ability = {ability}/>
        return a;
    }
    // @ts-ignore
    let getAbiltiesFromPokeom = (poke) => {
        let abilities = poke.pokemon.abilities;
        console.log(abilities);
        let li =
            <li className="listItems" key={poke.name + poke.i}>
            {(abilities|| []).map((a : any)=>getAbilities(a))}

        </li>
        return li;
    };
    // @ts-ignore
    let p = <>{props.state.item.name}</>;
    let div = <div >

        <div id="a" >
            <div>
                <p className="poke">{p}</p>
            </div>
            <p className="poke">
                <ul>
                    {getAbiltiesFromPokeom({pokemon})}
                    <Route path="/components/:repo" component={Ability} />
                </ul>
            </p>

        </div>
    </div>;
    return div
};
export default Pokemon;