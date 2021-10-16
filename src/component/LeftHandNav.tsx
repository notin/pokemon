import React, {Component, useState, useEffect} from "react";
import "./LeftHandNav.scss"
import {BrowserRouter as Router, Route, Link , useHistory} from "react-router-dom";
import Pokemon from "./pokemon/Pokemon";
import Ability from "./abilities/Ability";

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
                  to={{pathname :"/components/pokemon/Pokemon/"+item.name,
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
    let div =
        <div>
            <div className="hbox">
                <Router>
                    <div id="pokemonNav" >
                        <ul className="listItems">
                            <div>
                                <p>Pokemon</p>
                            </div>
                            {items.map(item =>getLi(item, ++id))}
                        </ul>
                    </div>
                    <div>
                        <Route path="/components/pokemon/" component={Pokemon} />
                    </div>


                </Router>;
            </div>;
        </div>

    return div
}
export default LeftHandNav;