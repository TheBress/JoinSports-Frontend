import { gql } from "@apollo/client";
import { AD_FRAGMENT } from "./ad";
import { SPORTS_FRAGMENT } from "./sport";

export const ME_FRAGMENT = gql`
  fragment MeParts on UsersPermissionsMe {
    id
    username
    email
    confirmed
    blocked
  }
`;

export const MEEXTENDED_FRAGMENT = gql`
fragment MeExtendedParts on UsersPermissionsUser  {
    id
    username
    email
    confirmed
    blocked
    age
    height
    weigth
    nationality
    isAdmin
    cityResidence
    favoriteSports{
        ...SportsParts
    }
    ad{
      ...AdParts
    }
    image{
      name
    }
  }
  ${SPORTS_FRAGMENT}
  ${AD_FRAGMENT}
`;
