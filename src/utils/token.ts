export const GET_TOKEN = (token:string) =>{
    return localStorage.getItem(token)
}
export const SET_TOKEN = (token:string) =>{
    return localStorage.setItem('TOKEN',token)
}
export const REMOVE_TOKEN = () =>{
    return localStorage.removeItem('TOKEN')
}