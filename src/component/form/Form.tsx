import React, {useState, useEffect, useContext} from "react";

import { useLocation} from "react-router-dom";
import "./Form.scss";
import {PokemonContext} from "../pokemon/Pokemon";



let Form = () => {
    let props = useLocation();
    let context = useContext(PokemonContext);
    // @ts-ignore
    let url = props.state.item.url;
    const [form, setForm] = useState<any[]>([]);

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

    function getType() {
        // @ts-ignore
        let type: string = form.length == undefined ? form.types[0].type.name as string : "";
        return  "type order is " + type;
    }
    function getOrder() {

        // @ts-ignore
        let order = form.order;
        return  "form order is " + order;
    }

    function getSrc() {
        // @ts-ignore
        let src: string = form.length == undefined ? form['sprites']['front_default'] as string : "";
        let img = <img src={src}></img>;
        return img;
    }

    return <div className="base">
        <div className="hbox">
            <div>
                <div>
                    <p>Form</p>
                </div>
                <div>{getOrder()}</div>
                <p></p>
                <div>{getType()}</div>
            </div>
            <div className="stretch">{getSrc()}</div>
        </div>

    </div>
}
export default Form;