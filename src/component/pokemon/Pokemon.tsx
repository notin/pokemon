import React, {Component, useState, useEffect } from "react";
import {BrowserRouter as Router, Link, Route, useLocation} from "react-router-dom";
// import "./LeftHandNav.scss"

let Pokemon = () => {

    console.log("Pokemon was clicked")
    useEffect(()=> {fetchProfile();},[])
    let [pokemon, setPokemon] = useState([])
    let props = useLocation();
    // @ts-ignore
    let url = props.state.item.url;

    let fetchProfile = async () => {
        let pokeProfile = await fetch(url);
        let info = await pokeProfile.json();
        setPokemon(info);
    }

    function getAbility(ability: any ) {
        let li =
                <li className="listItems">
                    <div className="listItems">
                        {ability.name}
                    </div>
                </li>

        return li;
    }

// @ts-ignore

    let div = <div className="displayInblock">

            <nav id="a" className="listTitle">
                <ul className="listItems">
                    <div>
                        <p>Pokemon</p>
                    </div>
                    {/*<div>{pokemon}</div>*/}

                </ul>
            </nav>
    </div>;
    return div;
};
export default Pokemon;