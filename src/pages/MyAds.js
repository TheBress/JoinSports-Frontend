import { Grid } from '@chakra-ui/react';
import React from 'react'
import AdCard from '../components/AdCard';
import Header from '../components/Header';
import { Authentication } from '../functions/authentication';
import IsAuth from '../hooks/isAuth';
import UserAds from '../hooks/myAds';


function MyAds() {
    Authentication();
    const {me}=IsAuth();
    const {myAds}=UserAds(me?.meExtended.id);

    console.log(myAds);


    return (
        <>
            <Header/>
            <Grid templateColumns='repeat(3, 1fr)' justifyContent="center" textAlign="center" gap={5}>
            {
                myAds?.ads.length!==0 ?
                (myAds?.ads.map(ad=>{
                    return (
                        <AdCard 
                        name={ad.Name}
                        user={ad.user.username}
                        userImage={ad.user.image}
                        description={ad.Description}
                        fullLocation={`${ad.location.Direction} (${ad.location.Name})`}
                        date={ad.Date}
                        sport={ad.sport.Name}
                        />
                    )
                })):(<p>No tienes anuncios</p>)
            }
            </Grid>
        </>
    )
}

export default MyAds
