import { Request } from "@nestjs/common";

export interface CustomRequest extends Request {
    user: {
        id: number;
    }
}

export interface ParamsObject {
    where?: {
        [name: string]: any
    },
    relations?: {
        [name: string]: boolean
    },
    select?: {
        [name: string]: boolean
    },
    order?: {
        [name: string]: 'ASC' | 'DESC'
    },
    take?: number,
    skip?: number,
    cache?: boolean,
}