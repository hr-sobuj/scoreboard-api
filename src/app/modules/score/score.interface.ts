import type { Request } from "express"

export interface ScoreTypes {
    name: string,
    b4: number,
    b6: number,
    totalRun: number,
    totalBall: number,
    role: string
}

export interface RequestBody extends Request {
    body: ScoreTypes,
    id: string
}