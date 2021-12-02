import {React} from 'react'
import Header from '../components/Header/index';
import { Authentication } from '../functions/authentication';
import CompleteProfile from '../components/CompleteProfile';
import IsAuth from '../hooks/isAuth';
import {Heading} from "@chakra-ui/react"
import Fade from 'react-reveal/Fade';
import Carousel from '../components/Carousel';


function Home() {

    Authentication();

    const {me}=IsAuth();


    let dataUser=me?.meExtended



    return (
        <>
        <Fade top>
           <Header/>
           </Fade>
           {dataUser?.cityResidence===null || dataUser?.height===null
           || dataUser?.weigth===null || dataUser?.nationality===null 
           || dataUser?.favoriteSports.length===0 ||dataUser?.age===null ? <CompleteProfile dataUser={dataUser}/>:(
            <>
            <Heading textAlign="center" mt="8">Bienvenido de nuevo, {dataUser?.username}</Heading>
            </>
           )}
           </>
    )
}

export default Home
