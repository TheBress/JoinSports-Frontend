import React from 'react'
import Header from "../components/Header/index"
import Calendar from 'react-awesome-calendar';
import { Authentication } from '../functions/authentication';
import IsAuth from '../hooks/isAuth';
import UserAds from '../hooks/myAds';


function MyCalendar() {
    Authentication();
    const {me}=IsAuth();
    const {myAds}=UserAds(me?.meExtended.id);

    const events=[
        {
            
        }
    ]
    return (
        <>
        <Header/>
        <Calendar classname="calendar" events={events} />
        </>
    )
}

export default MyCalendar
