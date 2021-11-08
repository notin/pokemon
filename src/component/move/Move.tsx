import React, {useState, useEffect, useContext} from "react";

import { useLocation} from "react-router-dom";
import {PokemonContext} from "../pokemon/Pokemon";
import MoveType from "./MoveType";
import "./Move.scss"

interface IndexProp {
    index: number;
}

let Move = ( index: IndexProp ) => {

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
            element = <div>
                <>Move : {move.name}
                </>

                {move?.type}
            </div>;
        }
        return element;
    }

    return <div>
        {getMove()}
    </div>
}
export default Move;