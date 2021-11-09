
class MoveType {
    name : string;
    description : string;
    type: string;
    accuracy: number
    constructor(name:string, type:string, description:string, accuracy: number){
        this.name = name;
        this.description = description;
        this.type = type;
        this.accuracy = accuracy;
    }
}
export default MoveType