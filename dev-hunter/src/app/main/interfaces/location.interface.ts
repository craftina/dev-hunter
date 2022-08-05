import { Developer } from "./developer.interface";

export interface Location{
    name: string,
    imgUrl: string,
    mapLink: string,
    id?: number,
    developers?: Developer[]
}
