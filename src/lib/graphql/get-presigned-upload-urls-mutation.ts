import { gql } from "@apollo/client";

export const GET_PRESIGNED_UPLOAD_URLS_MUTATION = gql`
  mutation GenerateUploadUrls(
    $filenames: [String!]
  ) {
    generateUploadUrls(
      fileNamesInput: {
        filenames: $filenames
      }
    ) {
      filename
      bucket
      url
    }
  }
`
