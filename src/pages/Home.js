import React from 'react'
import Header from '../components/Header'
import {useQuery} from "@apollo/client"
import { ISAUTH } from '../queries/isAuth';
import {useHistory} from "react-router-dom"
import {getToken} from "../config/auth"



function Home() {
    const history = useHistory();
    const isAuthenticated=getToken();
    const {data} = useQuery(ISAUTH);
    
    if(isAuthenticated===null) history.push("/login")
    
    
    return (
        <div>
            <Header/>
           
        </div>
    )
}

export default Home
