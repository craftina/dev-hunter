import { Developer } from "./developer.interface";

export interface Hiring {
    startDate?: Date,
    endDate?: Date,
    developerId: number,
    completed: boolean,
    id?: number,
    developer?: Developer,
}