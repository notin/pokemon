import React, {useState, useEffect, useContext} from "react";

import { useLocation} from "react-router-dom";
import "./Form.scss";
import {PokemonContext} from "../pokemon/Pokemon";



let Form = () => {
    let url = ""
    let [form, setForm] = useState([]);
    let context = useContext(PokemonContext);
    useEffect(()=> {fetchAbilities().then(r =>
        console.log("got getting form"));
        console.log(context)
    ;},[url])
    let fetchAbilities= async () => {
        let data = await fetch(context.pokeFormUrl);
        let items = await data.json();
        setForm(items);
    }

    // let getAbilitInfo =(a: any)=> {
    //     let col = [];
    //     // let ab = 0;
    //     if(a.abilities != undefined ) {
    //         if(a.abilities.length>0 ) {
    //             for (let i = 0; i < a.abilities.length; i++) {
    //                 try {
    //                     let filtered = a.abilities[i].effect_entries.filter((x: { language: { name: string; }; })=> x.language.name ==="en");
    //                     if( filtered )
    //                     {
    //                         let effectEntry = filtered[0].effect;
    //                         let name = a.abilities[i].name
    //                         let items =
    //                             <div key={name + i}>
    //                                 <div>
    //                                     <p>Ability : {name}</p>
    //                                 </div>
    //                                 <div>{effectEntry}</div>
    //                             </div>
    //                         col.push(items);
    //                     }
    //
    //                 }
    //                 catch (e){
    //
    //                 }
    //             }
    //         }
    //     }
    //     let div1 = <div>
    //         <div>
    //             {col}
    //         </div>
    //     </div>;
    //     return div1
    // }
    let meage = form;
    return <div>
        "Is mega: "+{meage}
    </div>
}
export default Form;