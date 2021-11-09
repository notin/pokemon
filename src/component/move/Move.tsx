import React, {useState, useEffect, useContext} from "react";

import { useLocation} from "react-router-dom";
import {PokemonContext} from "../pokemon/Pokemon";
import MoveType from "./MoveType";
import "./Move.scss"
import Collapsible from "react-collapsible";

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
        let moveType = new MoveType(name, type, "", items.accuracy);
        setMoves(moveType);
    }


    function getMove() {
        let element = null;
        // @ts-ignore
        if(move != undefined){
            element = <div>
                <p>
                    <>Move : </>
                    <Collapsible trigger={move.name}>
                        <div>type : {move.type}</div>
                        <div>accuracy : {move.accuracy}</div>
                    </Collapsible>

                </p>
            </div>;
        }
        return element;
    }

    return <div>
        {getMove()}
    </div>
}
export default Move;