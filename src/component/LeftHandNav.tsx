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
        const li = <li className="listItems">
                        <div className="listItems">
                            {item.name}
                        </div>
                    </li>;
        return li;
    }

    let div = <>
        <div id="pokemonNav" className="listTitle"  style={{width: "25%"}}>
            <ul className="listItems">
                <div>
                    <p>Pokemon</p>
                </div>
                {items.map(item =>getLi(item))}
            </ul>
        </div>

    </>;
    return div
}
export default LeftHandNav;