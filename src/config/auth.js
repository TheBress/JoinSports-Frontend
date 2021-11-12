
export const setToken=(token)=> localStorage.setItem("token_JoinSports",token)

export const getToken=()=>{ return localStorage.getItem("token_JoinSports") }

export const removeToken=()=> localStorage.removeItem("token_JoinSports")


