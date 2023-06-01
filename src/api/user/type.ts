export interface loginData {
    username:string,
    password:string
}

interface loginResponseData{
    token:string
}
export interface loginResponse {
    code:number,
    data:loginResponseData
}

interface userInfoResponseData{
    userId: number,
    avatar:string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string,
}
interface user{
    checkUser:userInfoResponseData
}
export interface userInfoResponse{
    code:number,
    data:user
}