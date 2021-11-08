import React, {useState, useEffect, createContext} from "react";
import "./Pokemon.scss"
import { Link, Route, useLocation} from "react-router-dom";
import Ability from "../abilities/Ability";
import Form from "../form/Form";
import pk from "../../contexts/pk";
import Move from "../move/Move";

export const PokemonContext  =  createContext(pk);

let Pokemon = () => {
    let props = useLocation();
    // @ts-ignore
    let url = props.state.item.url;
    let [pokemon, setPokemon] = useState([]);
    useEffect(()=> {fetchItems().then(r =>
        console.log("got pokemon details"))
    ;},[url])
    let fetchItems = async () => {
        let data = await fetch(url);
        let items = await data.json();
        pk.pokeFormUrl = items.forms[0].url
        for(let i = 0 ; i< items.moves.length; i++)
        {
            let m = items.moves[i];
            // @ts-ignore
            let items1 = { name: m.move.name, url:m.move.url, level_at :m.version_group_details[0].level_learned_at};
            pk.pokeMoveUrls.push(items1);
        }
        setPokemon(items);
    }

    // @ts-ignore
    let p = <>{props.state.item.name}</>;
    // @ts-ignore
    pk.pokeName = props.state.item.name;
    function getForm() {
        // @ts-ignore
        return <Form/>;
    }

    let getMove = () =>{
        let moves : any [] = [];
        for(let i:number = 0; i< pk.pokeMoveUrls.length; i++){
            // @ts-ignore
            moves.push(<Move index= {i}></Move>)
        }
        return moves;
    }

// @ts-ignore
    let div = <PokemonContext.Provider value={pk}>
        <div className="pokeItem ">
            <div id="list">
                <p>
                    <ul>
                        <div className="pokeBase">
                            <p>{p}</p>
                        </div>
                        <Ability/>
                        {getForm()}
                        {getMove()}
                    </ul>
                </p>
            </div>
        </div>
    </PokemonContext.Provider>;
    return div
};
export default Pokemon;