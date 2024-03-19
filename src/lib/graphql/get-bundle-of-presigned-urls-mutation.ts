import { gql } from "@apollo/client";

export const GET_BUNDLE_OF_PRESIGNED_URLS_MUTATION = gql`
  mutation GenerateBundleOfPresignedUrls(
    $filenames: [String!]
  ) {
    generateBundleOfPresignedUrls(
      fileNamesInput: {
        filenames: $filenames
      }
    ) {
      filename
      url
    }
  }
`
