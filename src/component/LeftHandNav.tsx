import React, {Component, useState, useEffect} from "react";
import "./LeftHandNav.scss"
import {BrowserRouter as Router, Route, Link } from "react-router-dom";
import Pokemon from "./pokemon/Pokemon";

function LeftHandNav() {
    useEffect(()=> {fetchItems();},[]);
    // @ts-ignore
    let url = "https://pokeapi.co/api/v2/pokemon/";
    let [items, setItems] = useState([])

    let fetchItems= async ()=> {
        let data = await fetch(url);
        let items = await data.json();
        setItems(items.results);
    }


    function getLi(item:any, id:number) {
        let li =
            <Link id={item.name + "-" + id}
                  to={{pathname :"/components/pokemon/Pokemon",
                  state: {item}}}
                  >
                <li className="listItems" key={id}>
                    <div className="listItems">
                        {item.name}
                    </div>
                </li>
            </Link>
        return li;
    }
    let id = 0;
    let div = <div className="displayInblock">
        <Router>
        <nav id="pokemonNav" className="listTitle">
            <ul className="listItems">
                <div>
                    <p>Pokemon</p>
                </div>
                {items.map(item =>getLi(item, ++id))}
            </ul>
        </nav>
        <Route path="/components/pokemon/Pokemon" component={Pokemon} >
        </Route>
    </Router>;
    </div>;
    return div
}
export default LeftHandNav;