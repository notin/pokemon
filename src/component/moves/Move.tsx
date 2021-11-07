import React, {useState, useEffect, useContext} from "react";

import { useLocation} from "react-router-dom";

import MoveType from "./MoveType";

let Move = (name :string, url:string)=> {

    let [move, setMove] = useState<MoveType>();
    useEffect( ()=>{fetchMove()
        .then(()=>console.log("getting move"))})

    let fetchMove = async () => {
        let movePromise =  await fetch(url);
        let m = await movePromise.json();
        setMove(m.accuracy)
    }

    function getMoves() {
        let element = move.length == undefined ? <div></div>:<>{move[0].accuracy}</>;
        return element;
    }

    return<div>
        <div>Moves</div>
        {getMoves()}
    </div>
}
export default Move