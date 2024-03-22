import { gql } from "@apollo/client";

export const ADD_BUNDLE_MEDIA_TO_PERSON_MUTATION = gql`
  mutation AddBundleMediaToPerson(
    $media: [MediaInput!]!
  ) {
    addBundleMediaToPerson(
      mediaBundleInput: {
        media: $media
      }
    ) {
      status
    }
  }
`
