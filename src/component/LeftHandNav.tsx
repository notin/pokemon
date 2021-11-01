import React, {useState, useEffect, createContext, Context, useRef} from "react";
import "./LeftHandNav.scss"
import {BrowserRouter as Router, Route, Link , useHistory} from "react-router-dom";
import Pokemon from "./pokemon/Pokemon";

function LeftHandNav() {

    const listInnerRef = useRef();
    let counter = 0;
    // @ts-ignore
    let url = "https://pokeapi.co/api/v2/pokemon/";
    let next = "";
    let [items, setItems] = useState([])
    let [urlState, setUrl] = useState([]);
    let handleScroll = async ( e:any) => {
        let b = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if ( b) {
                console.log("scrolling")
                await fetchItems();
        }
    };

    useEffect(()=> {fetchItems();},[counter] );

    let fetchFromURL= async (input: string) => {
        let data = await fetch(input);
        let items = await data.json();
        setUrl(items.next);
        next = items.next;
        let results = items.results;
        return results
    }

    let fetchItems= async ()=> {
        let urlLocal = urlState.length === 0 ? url : urlState
        // @ts-ignore

        let these : [] = await fetchFromURL(urlLocal);
        let nextResults : []  = await fetchFromURL(next);
        let total: never[] | ((prevState: never[]) => never[]) = [] ;
        // @ts-ignore
        items.forEach(x=> total.push(x))
        // @ts-ignore
        these.forEach(x=> total.push(x))
        // @ts-ignore
        nextResults.forEach(x=> total.push(x))
        setItems(total);
    }

    function getLi(item:any, id:number) {
        let li =
            <Link id={item.name + "-" + id}
                  to={{pathname :"/components/pokemon/Pokemon/"+item.name,
                  state: {item}}}
                  >
                <li className="listItems" key={id}>
                    <div >
                        {item.name}
                    </div>
                </li>
            </Link>
        return li;
    }
    let id = 0;

    function getPokeList() {
        // @ts-ignore
        return <ul onScroll={handleScroll} className="list" ref={listInnerRef}>
            <div className="listItems">
                <p>Pokemon</p>
            </div>
            {items.map(item => getLi(item, ++id))}
        </ul>;
    }

// @ts-ignore
    let div = <div className="dark" ref={listInnerRef}>
        <div className="hbox">
            <Router>
                <div id="pokemonNav">
                    {getPokeList()}
                </div>
                <div>
                    <Route path="/components/pokemon/" component={Pokemon}/>
                </div>
            </Router>
        </div>
    </div>
    return div
}
export default LeftHandNav;