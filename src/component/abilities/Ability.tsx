import React, { useState, useEffect } from "react";

import { useLocation} from "react-router-dom";
import "./Abilities.scss"


let Ability = () => {

    let props = useLocation();
    // @ts-ignore
    let url = props.state.item.url;
    let [abilities, setAbilities] = useState([]);
    useEffect(()=> {fetchAbilities().then(r =>
        console.log("got getting ability"))
    ;},[url])
    let fetchAbilities= async () => {
        let data = await fetch(url);
        let items = await data.json();
        let abilities1 = items.abilities;
        let denormalized = {
            "name":"",
            "abilities": []
        }
        for(let i = 0; i< abilities1.length; i++){
            let abilityUrl = abilities1[i].ability.url
            let response = await fetch(abilityUrl);
            let promise = await response.json();
            denormalized.name = promise.names;
            // @ts-ignore
            denormalized.abilities.push(promise)
        }
        // @ts-ignore
        setAbilities(denormalized);
    }

    let getAbilitInfo =(a: any)=> {
        let col = [];
        // let ab = 0;
        if(a.abilities != undefined ) {
            if(a.abilities.length>0 ) {
                for (let i = 0; i < a.abilities.length; i++) {
                    try {
                        let effectEntry = a.abilities[i].effect_entries[0].effect;
                        let name = a.abilities[1].name
                        let items =
                            <div key={name + i}>
                                <div>
                                    <p>{name}</p>
                                </div>
                                <div>{effectEntry}</div>
                            </div>
                        col.push(items);
                    }
                    catch (e){

                    }
                }
            }
        }
        let div1 = <div>
            <div>
                {col}
            </div>
        </div>;
        return div1
    }
    return <div className="abilities" key={"key"}>
        {getAbilitInfo(abilities)}
    </div>
}
export default Ability;