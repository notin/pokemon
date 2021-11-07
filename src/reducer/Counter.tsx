const counter =  ( state : number =0, action: any) => {
        switch (action.type) {
            case "increment" :
                return state+1;
            case "decrement" :
                return state-1;
        }
        console.log("the state is "+state)
}
export default counter

