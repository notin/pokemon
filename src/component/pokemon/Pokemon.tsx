import React, {Component, useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
// import "./LeftHandNav.scss"

let Pokemon = () => {

    console.log("Pokemon was clicked")
    useEffect(()=> {fetchProfile();},[])
    let [items, setPokemon] = useState([])
    let props = useLocation();

    let fetchProfile = async ()=> {

        let pokeProfile = await fetch("https://pokeapi.co/api/v2/pokemon/1");
        let info = await pokeProfile.json();
        setPokemon(info);
    }

    // @ts-ignore
    let div = <div>{props.state.item.name}</div>;
    return div;
};
export default Pokemon;