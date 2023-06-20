import request from "@/utils/request"
import type {categoryResponseData,attrResponseData,attrItem} from './type'
import type { REMOVE_TOKEN } from "@/utils/token"
enum API {
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/',
    ADD_OR_UPDATEATTR_URL = '/admin/product/saveAttrInfo',
    REMOVEATTR_URL = '/admin/product/deleteAttr/'
}

export const reqC1 = () => request.get<any,categoryResponseData>(API.C1_URL)
export const reqC2 = (id:number|string) => request.get<any,categoryResponseData>(API.C2_URL + id)
export const reqC3 = (id:number|string) => request.get<any,categoryResponseData>(API.C3_URL + id)
export const getAttr = (c1Id:number|string,c2Id:number|string,c3Id:number|string) => request.get<any,attrResponseData>(API.ATTR_URL+`${c1Id}/${c2Id}/${c3Id}`)
export const addOrUpdateAttr = (data:attrItem)=>request.post<any,any>(API.ADD_OR_UPDATEATTR_URL,data)
export const removeAttr = (id:number) => request.delete<any,any>(API.REMOVEATTR_URL+id)