import { useHistory } from "react-router-dom";
import { getToken } from "../graphql/config/auth";


export const Authentication=()=>{
    const history = useHistory();
    const isAuthenticated=getToken();
    if(isAuthenticated===null) history.push("/login")
}

