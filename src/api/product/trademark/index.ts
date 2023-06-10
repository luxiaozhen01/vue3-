import request from "@/utils/request";
import type { trademarkResponseData,Record } from './type'
enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark',
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    UPDATETRADEMAR_URL = '/admin/product/baseTrademark/update',
    REMOVETRADEMARY_URL = '/admin/product/baseTrademark/remove'
}

export const reqTrademark = (page: number, limit: number) => request.get<any, trademarkResponseData>(API.TRADEMARK_URL + `/${page}/${limit}`)
export const updateTrademark = (data:Record) =>{
    if(data.id){
        return request.put<any,any>(API.UPDATETRADEMAR_URL,data)
    }else{
        return request.post<any,any>(API.ADDTRADEMARK_URL,data)
    }
}
export const removeTrademark = (id:number) => request.delete(API.REMOVETRADEMARY_URL + `/${id}`)