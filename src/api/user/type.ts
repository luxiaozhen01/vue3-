export interface loginFormData {
    username:string,
    password:string
}

interface responseData {
    code:string,
    message:string,
    ok:string
}

export interface loginResponseData extends responseData {
    data:string
}

export interface userInfoResponseData extends responseData {
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string
    }
}