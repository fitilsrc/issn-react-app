import { gql } from "@apollo/client";

export const SIGNIN_MUTATION = gql`
  mutation SignInUser(
    $username: String!
    $password: String!
  ) {
    signInUser(
      userCredentialInput: {
        username: $username
        password: $password
      }
    ) {
      access_token
      expires_in
      refresh_expires_in
      refresh_token
      error
    }
  }
`
