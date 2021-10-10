import React, {Component, useState, useEffect} from "react";
import "./LeftHandNav.scss"
import {Simulate} from "react-dom/test-utils";


function LeftHandNav() {
    useEffect(()=> {fetchItems();},[])
    const [items, setItems] = useState([])

    const fetchItems= async ()=> {
        const data = await fetch("https://pokeapi.co/api/v2/pokemon/");
    }

    return (<div id="pokemonNav" style={{width: "25%"}}>Pokemon</div>)
}
export default LeftHandNav;