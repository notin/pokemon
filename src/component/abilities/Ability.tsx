import React, { useState, useEffect } from "react";

import { Link, useLocation} from "react-router-dom";



let Ability = () => {
    useEffect(()=> {fetchAbilities().then(r =>
        console.log("got getting ability"))
    ;},[])
    let props = useLocation();
    // @ts-ignore
    let url = props.state.item.url;
    let [abilities, setAbilities] = useState([]);


    let fetchAbilities= async () => {
        let data = await fetch(url);
        let items = await data.json();
        let abilities1 = items.abilities;
        let denormalized = {
            "abilities": []
        }
        for(let i = 0; i< abilities1.length; i++){
            let abilityUrl = abilities1[i].ability.url
            let response = await fetch(abilityUrl);
            let promise = await response.json();
            // @ts-ignore
            denormalized.abilities.push(promise)
        }
        // @ts-ignore
        setAbilities(denormalized);
    }
    // @ts-ignore
    let getAbilities =(ability)=> {
        let a =<div>
            <div>
                {ability.name}
            </div>
        </div>
        return a;
    }
    // @ts-ignore
    let getAbiltiesFromPokeom = (poke) => {
        let abilities = poke.pokemon.abilities;
        console.log(abilities);
        let li =
            <li className="listItems">
                {(abilities|| []).map((a : any)=>getAbilities(a))}

            </li>
        return li;
    };

    // @ts-ignore
    let abilityName = <>{abilities.name}</>;
    // @ts-ignore
    let effectEntries = <>{abilities.effect_entries}</>;
    let getAbilitInfo =(a: any)=> {
        let div = <div>{a.name}</div>
        let div1 = <div>
            <div>
                {(a.abilities|| []).map((a : any)=>getAbilities(a))}
            </div>
        </div>;
        return div1
    }
    return <div>
        {getAbilitInfo(abilities)}
    </div>
}
export default Ability;