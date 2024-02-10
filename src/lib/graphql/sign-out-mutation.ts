import { gql } from "@apollo/client";

export const SIGNOUT_MUTATION = gql`
  mutation SignOutUser(
    $access_token: String!
    $refresh_token: String!
  ) {
    signOutUser(
      userTokensInput: {
        access_token: $access_token
        refresh_token: $refresh_token
      }
    ) {
      message
      error
    }
  }
`
