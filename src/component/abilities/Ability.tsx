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

        let denormalized = new AbilityType(items.name, items.effect_entries)
        setAbilities(denormalized);
        setOpen(false);
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
                let items = <div key={a.name }>
                    <div className="hbox">
                        <Collapsible className="abilities-collapse" open={open} trigger={ "Ability : "+a.name}>
                            {effectEntries.effect}
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