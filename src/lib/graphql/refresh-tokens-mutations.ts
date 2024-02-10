import { gql } from "@apollo/client";

export const REFRESH_TOKENS_MUTATION = gql`
  mutation RefreshUserTokens(
    $refresh_token: String!
  ) {
    refreshUserTokens(
      userRefreshTokenInput: {
        refresh_token: $refresh_token
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
