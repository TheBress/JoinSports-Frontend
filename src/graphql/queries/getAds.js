import { gql } from '@apollo/client';
import { AD_FRAGMENT } from '../fragments/ad';

export const GETADS= gql `
    query getAds{
        ads{
            ...AdParts
        }
    }
    ${AD_FRAGMENT}
`

export const GETYOURADS=gql `
    query getYourAds($id:ID!){
        ads(where:{user:$id}){
            ...AdParts
        }
    }
    ${AD_FRAGMENT}
`