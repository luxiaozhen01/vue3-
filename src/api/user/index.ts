import request from "@/utils/request";
import type { loginData,loginResponse,userInfoResponse } from '@/api/user/type'

enum API{
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}

export const reqLogin = (data:loginData) => request.post<any,loginResponse>(API.LOGIN_URL,data)
export const reqUserInfo = () => request.get<any,userInfoResponse>(API.USERINFO_URL)