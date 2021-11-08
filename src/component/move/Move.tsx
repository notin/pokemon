import React, {useState, useEffect, useContext} from "react";

import { useLocation} from "react-router-dom";
import {PokemonContext} from "../pokemon/Pokemon";
import MoveType from "./MoveType";


let Move = ( index : number) => {

    let props = useLocation();
    // @ts-ignore
    let url = props.state.item.url;
    let [move, setMoves] = useState<MoveType>();
    let context = useContext(PokemonContext);
    
    useEffect(()=> {fetchMove().then(() =>
        console.log("got getting ability"));
        console.log(context.pokeName)
    ;},[url])
    let fetchMove = async () => {
        // @ts-ignore
        let data = await fetch(context.pokeMoveUrls[index.index].url);
        let items = await data.json();

        let type = items.type.name
        let name = items.name;
        let moveType = new MoveType(name, type, "");
        setMoves(moveType);
    }


    function getMove() {
        let element = null;
        // @ts-ignore
        if(move != undefined){
            element = <>
                <>Move : {move.name}
                </>

                {move?.type}
            </>;
        }
        return element;
    }

    return <div>
        {getMove()}
    </div>
}
export default Move;