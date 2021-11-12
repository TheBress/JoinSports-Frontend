import { gql } from '@apollo/client';


export const ISAUTH= gql `
    query isAuth{
        me{
            username
        }
    }
`