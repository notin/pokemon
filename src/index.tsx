import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux";
import Counter from "./reducer.counter/Counter";



const increment = () => {
    return {type: "increment"}
};
const decrement = () => {
    return {type: "decrement"}
};

let store = createStore(new Counter() as any);

store.subscribe(()=> console.log("this is the count " + store.getState()))

store.dispatch(increment());
store.dispatch(decrement());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
