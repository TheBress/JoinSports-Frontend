import {gql} from "@apollo/client"


export const UPDATEPROFILE=gql`
    mutation updateProfile($id:ID!,$cityResidence:String!,$height:Int,$weigth:Int,$favoriteSports:[ID]){
        updateUser(input:{
            where:{id:$id}
            data:{
                cityResidence:$cityResidence,
                height:$height,
                weigth:$weigth,
                favoriteSports:$favoriteSports
            }
        }){
            user{
                age
            }
        }
    }
`