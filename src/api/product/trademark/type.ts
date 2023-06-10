export interface responseData {
    code:number,
    meassage:string,
    ok:string
}

export interface Record {
    id?: number,
    tmName: string,
    logoUrl: string
}
export type Records = Record[]

export interface trademarkResponseData extends responseData {
    data:{
        records:Records,
        total: number,
        size: number,
        current: number,
        orders: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number
    }
}