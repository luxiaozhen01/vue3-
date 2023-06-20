export interface responseData {
    code: number,
    message: string,
    ok: string
}

export interface categoryItem {
    id: number,
    name: string,
    createTime: string,
    updateTime: string
    category1Id?: number,
    category2Id?: number
}

export interface categoryResponseData extends responseData {
    data: categoryItem[]
}

export interface categoryState {
    c1Id: number | string,
    c1Arr: categoryItem[]
    c2Id: number | string,
    c2Arr: categoryItem[]
    c3Id: number | string,
    c3Arr: categoryItem[]
}

export interface attrValueItem {
    id?: number,
    createTime?: null | string,
    updateTime?: null | string,
    valueName: string,
    attrId?: number,
    flag:boolean
}

export type attrValueList = attrValueItem[]

export interface attrItem {
    id?: number,
    createTime?: null | string,
    updateTime?: null | string,
    attrName: string,
    categoryId: number,
    categoryLevel: number,
    attrValueList:attrValueList
}

export interface attrResponseData extends responseData{
    data:attrItem[]
}