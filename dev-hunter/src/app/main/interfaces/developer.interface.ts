import { Hiring } from "./hiring.interface";
import { Location } from "./location.interface";
import { Technology } from "./technology.interface";

export interface Developer {
    name: string,
    email: string,
    phoneNumber: string,
    locationId: number,
    technologyId: number,
    pricePerHour: string,
    experience: string,
    language: string,
    description?: string,
    imgUrl?: string,
    linkedIn?: string,
    id?: number,
    location?: Location,
    technology?: Technology,
    hirings?: Hiring[]
}