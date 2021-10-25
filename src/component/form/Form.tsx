import React, {useState, useEffect, useContext} from "react";

import { useLocation} from "react-router-dom";
import "./Form.scss";
import {PokemonContext} from "../pokemon/Pokemon";



let Form = () => {
    let props = useLocation();
    let context = useContext(PokemonContext);
    // @ts-ignore
    let url = props.state.item.url;
    let [form, setForm] = useState([]);

    useEffect(()=> {fetchAbilities().then(r =>
        console.log("got getting form"));
        console.log(context)
    ;},[url])
    let fetchAbilities= async () => {
        let data = await fetch(url);
        let items = await data.json();
        let formUlr = items.forms[0].url;
        let formJson = await fetch(formUlr)
        let f = await formJson.json();
        setForm(f);
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

    function getOrder() {
        // @ts-ignore
        let order = form.order;
        return  "form order is " + order;
    }

    return <div className="base">
        <div>
            <p>Form</p>
        </div>
        <div>{getOrder()}</div>

    </div>
}
export default Form;