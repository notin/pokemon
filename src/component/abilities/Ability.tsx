import React, {useState, useEffect, useContext} from "react";

import { useLocation} from "react-router-dom";
import "./Abilities.scss";
import {PokemonContext} from "../pokemon/Pokemon";
import AbilityType from "./AbilityType";
import AbilityDetails from "./AbilityDetails";

interface IndexProp {
    index: number;
}

let Ability = (index: IndexProp ) => {

    let props = useLocation();
    // @ts-ignore
    let url = props.state.item.url;
    let [abilities, setAbilities] = useState<AbilityType>();
    let context = useContext(PokemonContext);
    useEffect(()=> {fetchAbilities().then(() =>
        console.log("got getting ability"));
        console.log(context.pokeName)
    ;},[url])
    let fetchAbilities= async () => {
        let data = await fetch(context.pokeAbilityUrls[index.index].url);
        let items = await data.json();

        let denormalized = new AbilityType(items.name, items.effect_entries)
        setAbilities(denormalized);
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