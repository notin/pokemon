import React, {useState, useEffect, useContext} from "react";

import { useLocation} from "react-router-dom";
import "./Abilities.scss";
import {PokemonContext} from "../pokemon/Pokemon";
import AbilityType from "./AbilityType";
import AbilityDetails from "./AbilityDetails";

let Ability = () => {

    let props = useLocation();
    // @ts-ignore
    let url = props.state.item.url;
    let [abilities, setAbilities] = useState<AbilityType>();
    let context = useContext(PokemonContext);
    useEffect(()=> {fetchAbilities().then(r =>
        console.log("got getting ability"));
        console.log(context.pokeName)
    ;},[url])
    let fetchAbilities= async () => {
        let data = await fetch(url);
        let items = await data.json();
        let abilities1 = items.abilities;

        for(let i = 0; i< abilities1.length; i++){
            let abilityUrl = abilities1[i].ability.url
            let response = await fetch(abilityUrl);
            let promise = await response.json();
            let denormalized = new AbilityType(promise.name, promise.effect_entries)
            setAbilities(denormalized);
        }
    }

    let getAbilitInfo =(a: AbilityType)=> {
        let col = [];
        // let ab = 0;

        if(a != undefined ) {
            let abilities1 = a.abilities;
            if(abilities1 != undefined ) {
                let effectEntries : AbilityDetails = abilities1 as unknown as AbilityDetails;
                let items = <div key={a.name }>
                    <div>
                        <p>Ability : {a.name}</p>
                    </div>
                    <div>{effectEntries.effect}</div>
                </div>;

                col.push(items);
            }

        }
        let div1 = <div>
            <div>
                {col}
            </div>
        </div>;
        return div1
    }
    return <div className="abilities base" key={"key"}>
        {getAbilitInfo(abilities as AbilityType)}
    </div>
}
export default Ability;