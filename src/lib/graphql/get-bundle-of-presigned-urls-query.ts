import { gql } from "@apollo/client";

export const GET_BUNDLE_OF_PRESIGNED_URLS_QUERY = gql`
  query GenerateBundleOfPresignedUrls(
    $filenames: [String!]
  ) {
    presignedUrls: generateBundleOfPresignedUrls(
      fileNamesInput: {
        filenames: $filenames
      }
    ) {
      filename
      url
    }
  }
`
