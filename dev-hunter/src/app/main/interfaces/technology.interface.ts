import { Developer } from "./developer.interface";

export interface Technology{
    name: string,
    imgUrl: string,
    id?: number,
    developers?: Developer[]
}