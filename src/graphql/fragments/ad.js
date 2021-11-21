import { gql } from "@apollo/client";
import {SPORTS_FRAGMENT} from "./sport"

export const AD_FRAGMENT=gql `
fragment AdParts on Ads {
    id
    Name
    Description
    sport{
        ...SportsParts
    }
    Date

    Image{
        name
    }
  }

  ${SPORTS_FRAGMENT}

`