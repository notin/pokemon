import React, {useState, useEffect, useContext} from "react";

import { useLocation} from "react-router-dom";
import "./Abilities.scss";
import {PokemonContext} from "../pokemon/Pokemon";
import AbilityType from "./AbilityType";
import AbilityDetails from "./AbilityDetails";
import Collapsible from "react-collapsible";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";

interface IndexProp {
    index: number;
}

let Ability = (index: IndexProp ) => {

    let props = useLocation();
    // @ts-ignore
    let url = props.state.item.url;
    let [abilities, setAbilities] = useState<AbilityType>();
    let [open, setOpen] = useState<boolean>(url);
    let context = useContext(PokemonContext);
    useEffect(()=> {fetchAbilities().then(() =>
        console.log("got getting ability"));
        console.log(context.pokeName)
    ;},[url])
    let fetchAbilities= async () => {
        let data = await fetch(context.pokeAbilityUrls[index.index].url);
        let items = await data.json();
        // @ts-ignore
        let find = items.pokemon.find(x=>x.pokemon.name == context.pokeName);
        if(find) {
            let denormalized = new AbilityType(items.name, items.effect_entries)
            setAbilities(denormalized);
            setOpen(false);
        }
        else {
            let message = "ability not associated with pokemon : " + items.name;
            console.log(message);
            let elementById = document.getElementById(items.name);
            if(elementById) {
                message = "ability move not associated with pokemon : " + items.name;
                console.log(message);
                elementById.remove();
            }
        }

    }
    let redirectClick= () =>{
        setOpen(!open);
    }

    let getAbilitInfo =(a: AbilityType)=> {
        let col = [];
        if(a != undefined ) {
            let abilities1 = a.abilities;
            if(abilities1 != undefined ) {
                let effectEntries : AbilityDetails = abilities1 as unknown as AbilityDetails;
                let items = <div id={a.name}>
                    <div className="hbox">
                        <Collapsible className="abilities-collapse" open={open} trigger={ "Ability : "+a.name}>
                            <p>
                            {effectEntries.effect}
                            </p>
                        </Collapsible>
                        <FontAwesomeIcon onClick={redirectClick} className="icon" icon={faArrowDown}></FontAwesomeIcon>
                    </div>
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
    return <div key={"key"}>
        {getAbilitInfo(abilities as AbilityType)}
    </div>
}
export default Ability;