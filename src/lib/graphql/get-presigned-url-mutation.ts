import { gql } from "@apollo/client";

export const GET_PRESIGNED_URL_MUTATION = gql`
  mutation GenerateFileUrl(
    $filename: String!
  ) {
    generateFileUrl(
      fileInput: {
        filename: $filename
      }
    ) {
      url
    }
  }
`
