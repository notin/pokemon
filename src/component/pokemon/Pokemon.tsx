import React, {Component, useState, useEffect } from "react";

import {BrowserRouter as Router, Link, Route, useLocation} from "react-router-dom";


let Pokemon = () => {
    useEffect(()=> {fetchItems().then(r =>
        console.log("got pokemon details"))
    ;},[])
    let props = useLocation();

    // @ts-ignore
    let url = props.state.item.url;
    let [pokemon, setPokemon] = useState([]);


    let fetchItems = async () => {
        let data = await fetch(url);
        let items = await data.json();
        setPokemon(items);
    }

// @ts-ignore
    let getAbilities =(ability)=> {
        let a =
            <div className="listItems">
                {ability.ability.name}
            </div>
        return a;
    }
    // @ts-ignore
    let getAbiltiesFromPokeom = (poke) => {
        let abilities = poke.pokemon.abilities;
        console.log(abilities);
        let li =<li className="listItems">
            {(abilities|| []).map((a : any)=>getAbilities(a))}

        </li>
        return li;
    };
    // @ts-ignore
    let p = <>{props.state.item.name}</>;
    let div = <div className="displayInblock">

        <nav id="a" className="listTitle">
            <div>
                <p>{p}</p>
            </div>
            <ul className="listItems">
                {getAbiltiesFromPokeom({pokemon})}
            </ul>
        </nav>
    </div>;
    return div
};
export default Pokemon;