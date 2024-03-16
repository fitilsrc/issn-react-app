import { gql } from "@apollo/client";

export const GET_PRESIGNED_UPLOAD_URLS_QUERY = gql`
  query GetPresignedUploadURLS(
    $filenames: [String!]
  ) {
    getPresignedPutUrls(
      fileNamesInput: {
        filenames: $filenames
      }
    ) {
      filename
      url
    }
  }
`
