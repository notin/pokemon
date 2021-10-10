import React, {Component, useState, useEffect} from "react";
// import "./LeftHandNav.scss"

let Pokemon = (props:any) => {

    console.log("Pokemon was clicked")
    useEffect(()=> {fetchProfile();},[])
    let [items, setPokemon] = useState([])

    let fetchProfile = async ()=> {

        let pokeProfile = await fetch("https://pokeapi.co/api/v2/pokemon/1");
    }

    let div = <div>I am a Pokemon</div>;
    return div;
};
export default Pokemon;