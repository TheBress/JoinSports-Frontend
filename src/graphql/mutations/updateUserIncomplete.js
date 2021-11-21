import {gql} from "@apollo/client"


export const UPDATEUSERINCOMPLETE=gql`
mutation updateUserIncomplete($id:ID!,$cityResidence:String!,$age:Int,$height:Int,$weigth:Int,$nationality:String!,$favoriteSports:[ID]){
    updateUser(input:{
        where:{id:$id}
        data:{
            cityResidence:$cityResidence,
            age:$age,
            height:$height,
            weigth:$weigth,
            nationality:$nationality,
            favoriteSports:$favoriteSports
        }
      }){
          user{
              age
          }
}
}
`