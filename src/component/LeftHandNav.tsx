import React, {Component, useState, useEffect} from "react";
import "./LeftHandNav.scss"
import {Simulate} from "react-dom/test-utils";


function LeftHandNav() {
    useEffect(()=> {fetchItems();},[])
    let [items, setItems] = useState([])

    const fetchItems= async ()=> {
        const data = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const items = await data.json();
        setItems(items.results);
    }


    function getLi(item:any) {
        const li = <li>
                        <div className="listItems" style={{width: "25%"}}>
                            {item.name}
                        </div>
                    </li>;
        return li;
    }

    let div = <>
        <div id="pokemonNav" style={{width: "25%"}}>Pokemon</div>
        <ul>

            {items.map(item =>getLi(item))}
        </ul>
    </>;
    return div
}
export default LeftHandNav;