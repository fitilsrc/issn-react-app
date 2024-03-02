import { gql } from "@apollo/client";

export const DELETE_ALIAS_MUTATION = gql`
  mutation DeleteAlias(
    $aliasId: Float!
  ) {
    deleteAlias(
      aliasId: $aliasId
    ) {
      status
      message
    }
  }
`
