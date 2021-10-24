import React, {useState, useEffect, useContext} from "react";

import { useLocation} from "react-router-dom";
import "./Abilities.scss";
import {PokemonContext} from "../pokemon/Pokemon";



let Ability = () => {

    let props = useLocation();
    // @ts-ignore
    let url = props.state.item.url;
    let [abilities, setAbilities] = useState([]);
    let context = useContext(PokemonContext);
    useEffect(()=> {fetchAbilities().then(r =>
        console.log("got getting ability"));
        console.log(context)
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
                        let filtered = a.abilities[i].effect_entries.filter((x: { language: { name: string; }; })=> x.language.name ==="en");
                        if( filtered )
                        {
                            let effectEntry = filtered[0].effect;
                            let one = filtered[0].effect;
                            let name = a.abilities[i].name
                            let items =
                                <div key={name + i}>
                                    <div>
                                        <p>Ability : {name}</p>
                                    </div>
                                    <div>{effectEntry}</div>
                                </div>
                            col.push(items);
                        }

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