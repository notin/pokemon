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
        //a.abilities[0].effect_changes[0].effect_entries[1]
        let col = [];
        let ab = 0;
        if(a.abilities != undefined ) {
            if(a.abilities.length>0 ) {
                for (let i = 0; i < a.abilities.length; i++) {
                    try {
                        let effectEntry = a.abilities[i].effect_entries[0].effect
                        col.push(<div>{effectEntry}</div>)
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
    return <div>
        {getAbilitInfo(abilities)}
    </div>
}
export default Ability;